import { eodiroConsts } from '@/constants'
import { UNAUTHORIZED } from '@/constants/http-status-code'
import { ApiAuthRefreshResData } from '@/pages/api/auth/refresh'
import { ApiAuthGeneralErrResData } from '@/pages/api/auth/verify'
import { Cookies } from '@/pages/api/cookie'
import Axios, { AxiosRequestConfig } from 'axios'
import produce from 'immer'
import { isInApp } from './booleans/is-in-app'
import { eodiroHost } from './eodiro-host'
import { JwtErrorName } from './jwt'
import { reactNativeWebViewPostMessage } from './native/react-native-webview'

export enum UnauthorizedError {
  Unauthorized = 'Unauthorized',
}

export type EodiroRequestConfig<T = any> = Omit<AxiosRequestConfig, 'data'> & {
  data?: T
}

export function registerPush() {
  if (!isInApp()) {
    return
  }

  reactNativeWebViewPostMessage({
    requestExpoPushToken: true,
  })
}

async function clearAuthCookie() {
  const cookies: Cookies = [
    {
      name: eodiroConsts.EDR_ACCESS_TOKEN_NAME,
      expires: new Date('1997-01-01').toUTCString(),
      value: '',
    },
    {
      name: eodiroConsts.EDR_REFRESH_TOKEN_NAME,
      expires: new Date('1997-01-01').toUTCString(),
      value: '',
    },
  ]

  await Axios({
    url: '/api/cookie',
    method: 'POST',
    data: cookies,
  })

  window.location.reload()
}

export async function eodiroRequest<RQD = any, RSD = any>(
  axiosReqeustConfig: EodiroRequestConfig<RQD>
): Promise<RSD> {
  const sanitiedReqeuestConfig = produce(axiosReqeustConfig, (draftConfig) => {
    if (draftConfig.url?.startsWith('/')) {
      draftConfig.url = eodiroHost + draftConfig.url
    }
  })

  try {
    const response = await Axios(sanitiedReqeuestConfig)

    return response.data as RSD
  } catch (firstTryErr) {
    const status = firstTryErr.response?.status as number

    // Unauthorized
    if (status === UNAUTHORIZED) {
      const accessUnauthorized = firstTryErr.response
        ?.data as ApiAuthGeneralErrResData

      if (accessUnauthorized.error?.name === JwtErrorName.TokenExpiredError) {
        try {
          await Axios.post<ApiAuthRefreshResData>('/api/auth/refresh')
          await registerPush()

          return await eodiroRequest<RQD, RSD>(sanitiedReqeuestConfig)
        } catch (refreshErr) {
          await clearAuthCookie()
          window.location.href = '/login'
        }
      }

      await clearAuthCookie()
      window.location.href = '/login'
    }

    throw firstTryErr
  }
}
