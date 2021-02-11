import { eodiroConst } from '@/constants'
import { getCookie } from '@/pages/api/cookie'
import { IncomingMessage, ServerResponse } from 'http'
import { NextApiRequest, NextApiResponse } from 'next'

/**
 * Extract a single token(access/refresh) from cookie first,
 * then Authorization Bearer header.
 */
export const extractToken = (
  req: NextApiRequest | IncomingMessage,
  res: NextApiResponse | ServerResponse,
  type: 'access' | 'refresh'
): null | string => {
  const cookie = getCookie(req)
  const tokenFromCookie =
    cookie[
      type === 'access'
        ? eodiroConst.EDR_ACCESS_TOKEN_NAME
        : eodiroConst.EDR_REFRESH_TOKEN_NAME
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
