import type { Cookie, Cookies } from '@/modules/eodiro-http-cookie'
import { nextApi } from '@/modules/next-api-routes-helpers'
import nodeCookie from 'cookie'
import type { NextApiRequest, NextApiResponse } from 'next'

function buildCookieString(cookie: Cookie, req: NextApiRequest) {
  let cookieString = `${cookie.name}=${cookie.value};`

  cookieString += 'HttpOnly;'

  if (cookie.expires) {
    cookieString += `Expires=${cookie.expires};`
  }

  if (req && req.socket.encrypted) {
    cookieString += 'Secure;'
  }

  cookieString += 'path=/;'

  return cookieString
}

export function setCookies(
  req: NextApiRequest,
  res: NextApiResponse,
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

export default nextApi({
  get: ({ req, res }) => {
    const cookies = req.headers.cookie
      ? nodeCookie.parse(req.headers.cookie)
      : {}

    res.json(cookies)
  },
  post: ({ req, res }) => {
    const cookieData = req.body as Cookie | Cookies

    setCookies(req, res, cookieData)

    res.end()
  },
})
