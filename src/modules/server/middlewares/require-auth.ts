import { JwtError, verifyToken } from '@/modules/jwt'
import initMiddleware from '@/modules/next-api-routes-helpers'
import { EodiroApiRequest, EodiroApiResponse } from '@/types/next'
import { extractToken } from '../extract-token'

export type MiddlewareRequireAuthResData = {
  error: JwtError | null
}

export const requireAuthMiddleware = initMiddleware(async (req, res, next) => {
  const accessToken = extractToken(req, res, 'access')
  const [err, authData] = await verifyToken(accessToken, 'access')
  const resData: MiddlewareRequireAuthResData = { error: err }

  if (err) {
    ;(res as EodiroApiResponse).status(401).json(resData)
  } else if (authData) {
    // eslint-disable-next-line no-param-reassign
    ;(req as EodiroApiRequest).authData = authData
    next()
  }
})
