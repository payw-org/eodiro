import { JwtError, verifyToken } from '@/modules/jwt'
import initMiddleware from '@/modules/next-api-routes-helpers'
import { NextApiResponse } from 'next'
import { extractToken } from '../extract-token'

export type MiddlewareRequireAuthResData = {
  error: JwtError | null
}

export const requireAuthMiddleware = initMiddleware(async (req, res, next) => {
  const accessToken = extractToken(req, res, 'access')
  const [err] = await verifyToken(accessToken, 'access')
  const resData: MiddlewareRequireAuthResData = { error: err }

  if (err) {
    ;(res as NextApiResponse).status(401).json(resData)
  } else {
    next()
  }
})
