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
}

export type Cookies = Cookie[]

function buildCookieString(
  cookie: Cookie,
  req: NextApiRequest | IncomingMessage
) {
  let cookieString = `${cookie.name}=${cookie.value};`

  cookieString += 'HttpOnly;'

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

export function getCookie(req: NextApiRequest | IncomingMessage) {
  const cookie = req.headers.cookie ? nodeCookie.parse(req.headers.cookie) : {}

  return cookie
}

export default nextApi({
  get: ({ req, res }) => {
    const cookie = req.headers.cookie
      ? nodeCookie.parse(req.headers.cookie)
      : {}

    res.json(cookie)
  },
  post: ({ req, res }) => {
    const cookieData = req.body as Cookie | Cookies

    setCookie(req, res, cookieData)

    res.end()
  },
})
