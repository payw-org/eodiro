import { eodiroConsts } from '@/constants'
import { AuthData, signAccessToken, signRefreshToken } from '@/modules/jwt'
import { nextApi } from '@/modules/next-api-routes-helpers'
import { prisma } from '@/modules/prisma'
import { sanitizePoralId } from '@/modules/sanitize-portal-id'
import { SignInInfo } from '@/modules/server/auth'
import EodiroEncrypt from '@/modules/server/eodiro-encrypt'
import { setCookie } from '../cookie'

export type ApiAuthLoginReqBody = SignInInfo
export type ApiAuthLoginResData = {
  isSigned: boolean
  userId: number
  refreshToken?: string
  accessToken?: string
}

export default nextApi({
  post: async (req, res) => {
    const { portalId, password } = req.body as SignInInfo
    const resData: ApiAuthLoginResData = { isSigned: false, userId: 0 }

    if (!portalId || !password) {
      res.json(resData)
      return
    }

    const sanitizedPortalId = sanitizePoralId(portalId)
    const user = await prisma.user.findUnique({
      where: { portalId: sanitizedPortalId },
    })

    if (!user) {
      res.json(resData)
      return
    }

    const isPasswordMatched = await EodiroEncrypt.isSame(
      password,
      user.password
    )

    if (isPasswordMatched) {
      resData.userId = user.id

      const authData: AuthData = { userId: user.id }
      let refreshToken = ''

      if (user.refreshToken) {
        refreshToken = user.refreshToken
      } else {
        refreshToken = signRefreshToken(authData)

        await prisma.user.update({
          where: { id: user.id },
          data: { refreshToken },
        })
      }

      const accessToken = signAccessToken(authData)

      resData.refreshToken = refreshToken
      resData.accessToken = accessToken

      const expires = new Date('2038-01-01').toUTCString()
      const refreshTokenPaths = ['/api/auth/refresh', '/api/auth/revoke']

      setCookie(req, res, [
        {
          name: eodiroConsts.EDR_ACCESS_TOKEN_NAME,
          value: accessToken,
          expires,
        },
        ...refreshTokenPaths.map((path) => ({
          name: eodiroConsts.EDR_REFRESH_TOKEN_NAME,
          value: refreshToken,
          expires,
          path,
        })),
      ])
    }

    resData.isSigned = isPasswordMatched

    res.json(resData)
  },
})
