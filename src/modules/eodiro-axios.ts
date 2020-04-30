/**
 * eodiro-axios.ts
 * A simple axios async wrapper
 * (c) 2019-2020 Jang Haemin
 * @license MIT
 */

import axios, { AxiosRequestConfig } from 'axios'

import { IncomingMessage } from 'http'
import { Tokens } from '@/api'

const moduleConsoleTag = '[eodiro-axios]'

export default async function eodiroAxios<T = any>(
  config: AxiosRequestConfig,
  eodiroAxiosConfig?: {
    access?: boolean
    refresh?: boolean
    req?: IncomingMessage
    accessIfExist?: boolean
  }
): Promise<[any, T, number]> {
  if (eodiroAxiosConfig && typeof eodiroAxiosConfig !== 'object') {
    console.error(
      `${moduleConsoleTag} Wrong type of parameter eodiroAxiosConfig`
    )

    return [true, null, null]
  }

  if (eodiroAxiosConfig) {
    const {
      access = false,
      refresh = false,
      req,
      accessIfExist = false,
    } = eodiroAxiosConfig

    if (access || refresh || accessIfExist) {
      if (typeof window === 'undefined' && !req) {
        console.error(
          `${moduleConsoleTag} you are trying to send tokens on server side without passing req argument`
        )
        return [true, null, null]
      }

      const cookies = await Tokens.get(req)
      const { accessToken, refreshToken } = cookies

      if (!config.headers) {
        config.headers = {}
      }

      if (access) {
        if (!accessToken) {
          return [true, null, 401]
        } else {
          config.headers.accessToken = accessToken
        }
      }

      if (accessIfExist && accessToken !== undefined) {
        config.headers.accessToken = accessToken
      }

      if (refresh) {
        if (!refreshToken) {
          return [true, null, 401]
        } else {
          config.headers.refreshToken = refreshToken
        }
      }
    }
  }

  try {
    const res = await axios(config)
    return [null, res.data, res.status]
  } catch (err) {
    console.warn(moduleConsoleTag, err)

    // Network error
    // Perhaps our server is closed
    if (!err.response) {
      console.error(`${moduleConsoleTag} network error`)
      if (typeof window !== 'undefined') {
        alert('서버에 연결할 수 없습니다.')
      }
      return [err, null, null]
    } else if (
      Math.floor(err?.response?.status / 100) === 5 &&
      typeof window !== 'undefined'
    ) {
      alert(
        '서버에 문제가 발생했습니다. 문제가 지속될 시 contact@payw.org로 문의바랍니다.'
      )
    }

    return [err, null, err.response.status]
  }
}
