import { UNAUTHORIZED } from '@/constants/http-status-code'
import { ApiAuthGeneralErrResData } from '@payw/eodiro-server-types/api/auth/verify'
import axios, { AxiosRequestConfig } from 'axios'
import ApiHost from './api-host'
import { logOut } from './api/log-out'
import { isInApp } from './booleans/is-in-app'
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

export async function eodiroRequest<RQD = any, RSD = any>(
  axiosRequestConfig: EodiroRequestConfig<RQD>
): Promise<RSD> {
  try {
    const response = await axios({
      withCredentials: true,
      ...axiosRequestConfig,
    })

    return response.data as RSD
  } catch (firstTryErr) {
    const status = firstTryErr.response?.status as number

    // Unauthorized
    if (status === UNAUTHORIZED) {
      const accessUnauthorized = firstTryErr.response
        ?.data as ApiAuthGeneralErrResData

      if (accessUnauthorized.error?.name === JwtErrorName.TokenExpiredError) {
        try {
          await eodiroRequest({
            method: 'post',
            url: ApiHost.resolve('/auth/refresh'),
          })

          registerPush()

          return await eodiroRequest<RQD, RSD>(axiosRequestConfig)
        } catch (refreshErr) {
          await logOut()
        }
      }

      await logOut()
    }

    throw firstTryErr
  }
}
