import { nextApi } from '@/modules/next-api-routes-helpers'
import nodeCookie from 'cookie'
import { IncomingMessage, ServerResponse } from 'http'
import type { NextApiRequest, NextApiResponse } from 'next'

export type Cookie = {
  expires?: string // Expiry date in UTC time
  name: string
  value: string | number
  /** @default "/" */
  path?: string
  /** @default true */
  httpOnly?: boolean
}

export type Cookies = Cookie[]

function buildCookieString(
  cookie: Cookie,
  req: NextApiRequest | IncomingMessage
) {
  let cookieString = `${cookie.name}=${cookie.value};`

  if (cookie.httpOnly !== false) {
    cookieString += 'HttpOnly;'
  }

  if (cookie.expires) {
    cookieString += `Expires=${cookie.expires};`
  }

  if (req && req.socket.encrypted) {
    cookieString += 'Secure;'
  }

  cookieString += `;Path=${cookie.path ?? '/'};`

  return cookieString
}

export function setCookie(
  req: NextApiRequest | IncomingMessage,
  res: NextApiResponse | ServerResponse,
  cookieData: Cookie | Cookies
) {
  const cookieStrings = [] as string[]

  if (Array.isArray(cookieData)) {
    cookieData.forEach((cookie) => {
      cookieStrings.push(buildCookieString(cookie, req))
    })
  } else {
    cookieStrings.push(buildCookieString(cookieData, req))
  }

  res.setHeader('Set-Cookie', cookieStrings)
}

export function getCookie(
  req: NextApiRequest | IncomingMessage
): Record<string, string>
export function getCookie(
  req: NextApiRequest | IncomingMessage,
  cookieName: string
): string
export function getCookie(
  req: NextApiRequest | IncomingMessage,
  cookieName?: string
) {
  const cookie = req.headers.cookie ? nodeCookie.parse(req.headers.cookie) : {}

  if (cookieName) {
    return cookie[cookieName]
  }

  return cookie
}

export default nextApi({
  get: (req, res) => {
    const cookie = req.headers.cookie
      ? nodeCookie.parse(req.headers.cookie)
      : {}

    res.json(cookie)
  },
  post: (req, res) => {
    const cookieData = req.body as Cookie | Cookies

    setCookie(req, res, cookieData)

    res.end()
  },
})
