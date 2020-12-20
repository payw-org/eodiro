import { env } from '@/env'
import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import { prisma } from './prisma'

export type AuthData = {
  userID: number
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
      id: authData.userID,
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
): Promise<[Error | null, DecodedAuthData | undefined]> => {
  return new Promise((resolve) => {
    const secret =
      type === 'access' ? env.ACCESS_TOKEN_SECRET : env.REFRESH_TOKEN_SECRET

    jwt.verify(token ?? '', secret, async (err, decoded) => {
      const authData = decoded as DecodedAuthData | undefined

      // Check DB and compare the refresh token
      if (authData?.userID && type === 'refresh') {
        const user = await prisma.user.findUnique({
          where: {
            id: authData.userID,
          },
        })

        if (user?.refreshToken !== token) {
          const err = new Error('Revoked Refresh Token')

          err.name = 'RevokedRefreshToken'

          resolve([err, undefined])
          return
        }
      }

      resolve([err, decoded as DecodedAuthData | undefined])
    })
  })
}
