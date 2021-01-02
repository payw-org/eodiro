import { eodiroConsts } from '@/constants'
import { ApiAuthRefreshResData } from '@/pages/api/auth/refresh'
import { ApiAuthGeneralErrResData } from '@/pages/api/auth/verify'
import { Cookies } from '@/pages/api/cookie'
import Axios, { AxiosRequestConfig } from 'axios'
import produce from 'immer'
import { eodiroHost } from './eodiro-host'
import { JwtErrorName } from './jwt'

export enum UnauthorizedError {
  Unauthorized = 'Unauthorized',
}

export type EodiroRequestConfig<T = any> = Omit<AxiosRequestConfig, 'data'> & {
  data?: T
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

          return await eodiroRequest<RQD, RSD>(sanitiedReqeuestConfig)
        } catch (refreshErr) {
          await clearAuthCookie()
        }
      }

      await clearAuthCookie()
    }

    console.error(firstTryErr)

    throw firstTryErr
  }
}
