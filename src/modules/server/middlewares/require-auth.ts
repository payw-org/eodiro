import { JwtError, verifyToken } from '@/modules/jwt'
import initMiddleware from '@/modules/next-api-routes-helpers'
import { prisma } from '@/modules/prisma'
import { User } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { extractToken } from '../extract-token'

export type RefinedUser = Omit<User, 'refreshToken' | 'password'>

export type MiddlewareRequireAuthResData = {
  error: JwtError | null
}

export const requireAuthMiddleware = initMiddleware(async (req, res, next) => {
  const accessToken = extractToken(req, res, 'access')
  const [err, authData] = await verifyToken(accessToken, 'access')
  const resData: MiddlewareRequireAuthResData = { error: err }

  if (err) {
    ;(res as NextApiResponse).status(401).json(resData)
  } else if (authData) {
    // Find user
    const user = await prisma.user.findUnique({
      where: { id: authData.userId },
      select: {
        id: true,
        portalId: true,
        nickname: true,
        randomNickname: true,
        joinedAt: true,
      },
    })

    if (!user) {
      res.statusCode = 401
      res.end()
      return
    }

    // eslint-disable-next-line no-param-reassign
    ;(req as NextApiRequest).user = user
    next()
  }
})
