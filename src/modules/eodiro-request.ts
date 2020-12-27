import { ApiAuthRefreshResData } from '@/pages/api/auth/refresh'
import { ApiAuthGeneralErrResData } from '@/pages/api/auth/verify'
import Axios, { AxiosRequestConfig } from 'axios'
import produce from 'immer'
import { eodiroHost } from './eodiro-host'
import { JwtErrorName } from './jwt'
import { isClient } from './utils/is-client'

const createUnauthorizedError = () => {
  if (isClient()) {
    alert('로그인 필요한 작업입니다.')
  }

  const error = new Error()
  error.name = 'Unauthorized'

  return error
}

export async function eodiroRequest<T = any>(
  axiosReqeustConfig: AxiosRequestConfig
): Promise<T> {
  const sanitiedReqeuestConfig = produce(axiosReqeustConfig, (draftConfig) => {
    if (draftConfig.url?.startsWith('/')) {
      draftConfig.url = eodiroHost + draftConfig.url
    }
  })

  try {
    const response = await Axios(sanitiedReqeuestConfig)

    return response.data as T
  } catch (firstTryErr) {
    const status = firstTryErr.response?.status as number

    // Unauthorized
    if (status === 401) {
      const accessUnauthorized = firstTryErr.response
        ?.data as ApiAuthGeneralErrResData

      if (accessUnauthorized.error?.name === JwtErrorName.TokenExpiredError) {
        try {
          await Axios.post<ApiAuthRefreshResData>('/api/auth/refresh')

          return await eodiroRequest<T>(sanitiedReqeuestConfig)
        } catch (refreshErr) {
          const refereshUnauthorized = refreshErr.response
            ?.data as ApiAuthGeneralErrResData

          if (refereshUnauthorized.error?.name) {
            throw createUnauthorizedError()
          }

          throw refreshErr
        }
      } else if (accessUnauthorized.error) {
        throw createUnauthorizedError()
      }
    }

    if (isClient()) {
      alert('서버에 연결할 수 없습니다.')
    }

    throw firstTryErr
  }
}
