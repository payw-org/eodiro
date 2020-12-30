import { ApiAuthRefreshResData } from '@/pages/api/auth/refresh'
import { ApiAuthGeneralErrResData } from '@/pages/api/auth/verify'
import Axios, { AxiosRequestConfig } from 'axios'
import produce from 'immer'
import { eodiroHost } from './eodiro-host'
import { JwtErrorName } from './jwt'

export enum UnauthorizedError {
  Unauthorized = 'Unauthorized',
}

const createUnauthorizedError = () => {
  const error = new Error()
  error.name = UnauthorizedError.Unauthorized

  return error
}

export type EodiroRequestConfig<T = any> = Omit<AxiosRequestConfig, 'data'> & {
  data?: T
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

    console.error(firstTryErr)

    throw firstTryErr
  }
}
