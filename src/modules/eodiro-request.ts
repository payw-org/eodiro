import {
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  UNAUTHORIZED,
} from '@/constants/http-status-code'
import { ApiAuthGeneralErrResData } from '@payw/eodiro-server-types/api/auth/verify'
import axios, { AxiosRequestConfig } from 'axios'
import ApiHost from './api-host'
import { logOut } from './api/log-out'
import { isInApp } from './booleans/is-in-app'
import EodiroDialog from './client/eodiro-dialog'
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
  } catch (error) {
    const status = error.response?.status as number

    // Unauthorized
    if (status === UNAUTHORIZED) {
      const accessUnauthorized = error.response
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
    } else if (status === NOT_FOUND) {
      new EodiroDialog().alert('요청 API 주소가 잘못되었습니다.')
    } else if (status === INTERNAL_SERVER_ERROR) {
      new EodiroDialog().alert('어디로 서버에 문제가 발생했습니다.')
    }

    console.error(error)

    throw error
  }
}
