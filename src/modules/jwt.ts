import { env } from '@/env'
import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import { prisma } from './prisma'

export type AuthData = {
  userId: number
}

export type DecodedAuthData = AuthData & {
  iat: number
  exp: number
}

export const signAccessToken = (authData: AuthData) =>
  jwt.sign(authData, env.ACCESS_TOKEN_SECRET, {
    expiresIn: env.ACCESS_TOKEN_LIFETIME,
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

export type JWTError = JsonWebTokenError & {
  name: 'TokenExpiredError' | 'JsonWebTokenError' | 'NotBeforeError'
}

/**
 * Validates refresh token itself and also checks DB.
 */
export const verifyToken = (
  token: string | null | undefined,
  type: 'access' | 'refresh'
): Promise<[Error | null, DecodedAuthData | undefined]> =>
  new Promise((resolve) => {
    const secret =
      type === 'access' ? env.ACCESS_TOKEN_SECRET : env.REFRESH_TOKEN_SECRET

    jwt.verify(token ?? '', secret, async (jwtErr, decoded) => {
      const authData = decoded as DecodedAuthData | undefined

      // Check DB and compare the refresh token
      if (authData?.userId && type === 'refresh') {
        const user = await prisma.user.findUnique({
          where: {
            id: authData.userId,
          },
        })

        if (user?.refreshToken !== token) {
          const err = new Error('Revoked Refresh Token')

          err.name = 'RevokedRefreshToken'

          resolve([err, undefined])
          return
        }
      }

      resolve([jwtErr, decoded as DecodedAuthData | undefined])
    })
  })
