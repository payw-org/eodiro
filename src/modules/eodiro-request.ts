import { eodiroConsts } from '@/constants'
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

export async function registerPush() {
  return new Promise((resolve) => {
    if (!isInApp()) {
      resolve(null)
      return
    }

    async function onMessageHandler(e: MessageEvent) {
      const expoPushToken = e.data

      if (!expoPushToken) {
        resolve(null)
        return
      }

      try {
        await Axios.post('/api/push', {
          expoPushToken,
        })
      } catch (error) {
        console.error(error)
        window.alert(
          '푸시 토큰 등록에 실패했습니다. 오류가 반복될 시 문의 바랍니다.'
        )
      }

      resolve(expoPushToken)
      window.removeEventListener('message', onMessageHandler)
    }

    window.addEventListener('message', onMessageHandler)

    reactNativeWebViewPostMessage({
      requestExpoPushToken: true,
    })
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
    if (status === 401) {
      const accessUnauthorized = firstTryErr.response
        ?.data as ApiAuthGeneralErrResData

      if (accessUnauthorized.error?.name === JwtErrorName.TokenExpiredError) {
        try {
          await Axios.post<ApiAuthRefreshResData>('/api/auth/refresh')
          await registerPush()

          return await eodiroRequest<RQD, RSD>(sanitiedReqeuestConfig)
        } catch (refreshErr) {
          await clearAuthCookie()
          window.alert('로그인이 필요합니다.')
          window.location.reload()
        }
      }

      await clearAuthCookie()
      window.alert('로그인이 필요합니다.')
      window.location.reload()
    }

    console.error(firstTryErr)

    throw firstTryErr
  }
}
