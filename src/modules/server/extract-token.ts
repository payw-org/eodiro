import { constants } from '@/constants'
import { getCookies } from '@/pages/api/cookies'
import { NextApiRequest, NextApiResponse } from 'next'

export const extractToken = (
  req: NextApiRequest,
  res: NextApiResponse,
  type: 'access' | 'refresh'
): null | string => {
  const { authorization } = req.headers

  if (!authorization || typeof authorization !== 'string') {
    // res.status(401).end()
    // return null
    const cookies = getCookies(req)
    const token =
      cookies[
        type === 'access'
          ? constants.EDR_ACCESS_TOKEN_NAME
          : constants.EDR_REFRESH_TOKEN_NAME
      ]

    if (!token) {
      res.status(401).end()
      return null
    }
  } else {
    const splittedAuth = authorization.split(' ')

    const bearerPart = splittedAuth[0]
    const token = splittedAuth[1]

    if (bearerPart !== 'Bearer' || !token) {
      res.status(401).end()
      return null
    }

    return token
  }

  return null
}
