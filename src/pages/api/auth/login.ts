import { constants } from '@/constants'
import { AuthData, signAccessToken, signRefreshToken } from '@/modules/jwt'
import { nextApi } from '@/modules/next-api-routes-helpers'
import { prisma } from '@/modules/prisma'
import { SignInInfo } from '@/modules/server/auth'
import EodiroEncrypt from '@/modules/server/eodiro-encrypt'
import { setCookies } from '../cookies'

export type ApiAuthLoginReqBody = SignInInfo
export type ApiAuthLoginResData = {
  isSigned: boolean
}

export default nextApi({
  post: async ({ req, res }) => {
    const { portalId, password } = req.body as SignInInfo
    const resData: ApiAuthLoginResData = { isSigned: false }

    if (!portalId || !password) {
      res.json(resData)
      return
    }

    const completePortalId = portalId.endsWith('@cau.ac.kr')
      ? portalId
      : `${portalId}@cau.ac.kr`
    const user = await prisma.user.findUnique({
      where: { portalId: completePortalId },
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
      const authData: AuthData = { userId: user.id }
      const refreshToken = signRefreshToken(authData)
      const accessToken = signAccessToken(authData)
      setCookies(req, res, [
        {
          name: constants.EDR_ACCESS_TOKEN_NAME,
          value: accessToken,
        },
        {
          name: constants.EDR_REFRESH_TOKEN_NAME,
          value: refreshToken,
        },
      ])
    }

    resData.isSigned = isPasswordMatched

    res.json(resData)
  },
})
