import { constants } from '@/constants'
import { getCookie } from '@/pages/api/cookie'
import { IncomingMessage, ServerResponse } from 'http'
import { NextApiRequest, NextApiResponse } from 'next'

export const extractToken = (
  req: NextApiRequest | IncomingMessage,
  res: NextApiResponse | ServerResponse,
  type: 'access' | 'refresh'
): null | string => {
  const cookie = getCookie(req)
  const tokenFromCookie =
    cookie[
      type === 'access'
        ? constants.EDR_ACCESS_TOKEN_NAME
        : constants.EDR_REFRESH_TOKEN_NAME
    ]

  if (tokenFromCookie) {
    return tokenFromCookie
  }

  const { authorization } = req.headers

  if (!authorization || typeof authorization !== 'string') {
    return null
  }

  const splittedAuth = authorization.split(' ')

  const bearerPart = splittedAuth[0]
  const tokenFromHeaders = splittedAuth[1]

  if (bearerPart !== 'Bearer' || !tokenFromHeaders) {
    return null
  }

  return tokenFromHeaders
}
