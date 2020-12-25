import nodeCookie from 'cookie'
import { IncomingMessage, ServerResponse } from 'http'
import eodiroAxios from './eodiro-axios'

export type Cookie = {
  expires?: string // Expiry date in UTC time
  name: string
  value: string | number
  /** @default "/" */
  path?: string
}

export type Cookies = Cookie[]

/**
 * @deprecated
 */
function buildCookieString(cookie: Cookie, req?: IncomingMessage): string {
  let cookieString = `${cookie.name}=${cookie.value};`

  cookieString += 'HttpOnly;'

  if (cookie.expires) {
    cookieString += `Expires=${cookie.expires};`
  }

  if (req && req.socket.encrypted) {
    cookieString += 'Secure;'
  }

  cookieString += 'Path=/;'

  return cookieString
}

/**
 * @deprecated
 */
export default class EodiroHttpCookie {
  static async set(
    cookieData: Cookie | Cookies,
    http?: {
      req: IncomingMessage
      res: ServerResponse
    }
  ): Promise<boolean> {
    if (http) {
      const { req, res } = http

      const cookieStrings: string[] = []

      if (Array.isArray(cookieData)) {
        cookieData.forEach((cookie) => {
          cookieStrings.push(buildCookieString(cookie, req))
        })
      } else {
        cookieStrings.push(buildCookieString(cookieData, req))
      }

      res.setHeader('Set-Cookie', cookieStrings)

      return true
    }

    if (typeof window === 'undefined') {
      throw new Error(
        `Don't use eodiro http cookie on server side without passing http object`
      )
    }

    const [err] = await eodiroAxios({
      url: '/api/cookies',
      method: 'POST',
      data: cookieData,
    })

    return !!err
  }

  static async get(
    req?: IncomingMessage | null
  ): Promise<Record<string, string | number> | undefined> {
    if (req) {
      const cookies =
        req && req.headers?.cookie && nodeCookie.parse(req.headers?.cookie)

      return cookies as Record<string, string | number>
    }

    if (typeof window === 'undefined') {
      throw new Error(
        `Don't use eodiro http cookie on server side without passing request`
      )
    }

    const [err, data] = await eodiroAxios({
      url: '/api/cookies',
      method: 'GET',
    })

    return err ? {} : ((data as unknown) as Record<string, string | number>)
  }
}
