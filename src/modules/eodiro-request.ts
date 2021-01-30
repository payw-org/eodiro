import { UNAUTHORIZED } from '@/constants/http-status-code'
import { ApiAuthRefreshResData } from '@/pages/api/auth/refresh'
import { ApiAuthGeneralErrResData } from '@/pages/api/auth/verify'
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

export async function clearAuthCookie() {
  await Axios({
    url: '/api/auth/refresh',
    method: 'delete',
  })
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
          registerPush()

          return await eodiroRequest<RQD, RSD>(sanitiedReqeuestConfig)
        } catch (refreshErr) {
          await clearAuthCookie()
        }
      }

      await clearAuthCookie()
    }

    throw firstTryErr
  }
}
