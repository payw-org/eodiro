import { env } from '@/env'
import jwt from 'jsonwebtoken'
import { prisma } from './prisma'

export type AuthData = {
  userId: number
}

export const signAccessToken = (authData: AuthData) =>
  jwt.sign(authData, env.ACCESS_TOKEN_SECRET, {
    expiresIn: env.ACCESS_TOKEN_LIFETIME,
    // expiresIn: '10s',
  })

export const signRefreshToken = (authData: AuthData) =>
  jwt.sign(authData, env.REFRESH_TOKEN_SECRET)

export const revokeRefreshToken = async (authData: AuthData) => {
  const refreshToken = signRefreshToken(authData)

  await prisma.user.update({
    data: {
      refreshToken,
    },
    where: {
      id: authData.userId,
    },
  })

  return refreshToken
}

export enum JwtErrorName {
  TokenExpiredError = 'TokenExpiredError',
  JsonWebTokenError = 'JsonWebTokenError',
  NotBeforeError = 'NotBeforeError',
  RefreshTokenRevokedError = 'RefreshTokenRevokedError',
}

export type JwtError = {
  name: JwtErrorName
  message: string
}

/**
 * Validates refresh token itself and also checks DB.
 */
export const verifyToken = (
  token: string | null | undefined,
  type: 'access' | 'refresh'
): Promise<[JwtError | null, AuthData | undefined]> =>
  new Promise((resolve) => {
    const secret =
      type === 'access' ? env.ACCESS_TOKEN_SECRET : env.REFRESH_TOKEN_SECRET

    jwt.verify(token ?? '', secret, async (jwtErr, decoded) => {
      if (decoded) {
        const authData = decoded as AuthData & { iat?: number; exp?: number }

        delete authData.iat
        delete authData.exp

        // Check DB and compare the refresh token
        if (authData?.userId && type === 'refresh') {
          const user = await prisma.user.findUnique({
            where: {
              id: authData.userId,
            },
          })

          if (user?.refreshToken !== token) {
            const err = new Error('Revoked Refresh Token') as JwtError

            err.name = JwtErrorName.RefreshTokenRevokedError

            resolve([err, undefined])
            return
          }
        }

        resolve([jwtErr as JwtError, authData as AuthData])
      } else {
        resolve([jwtErr as JwtError, decoded as undefined])
      }
    })
  })
