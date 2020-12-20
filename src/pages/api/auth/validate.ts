import { nextApi } from '@/modules/next-api-routes-helpers'
import {
  AuthValidationResult,
  validateNickname,
  validatePassword,
  validatePortalId,
} from '@/modules/server/auth/validation'

export type ApiAuthValidateRequestBody = {
  portalId: string
  nickname: string
  password: string
}

export type ApiAuthValidateResponseData = {
  [K in keyof ApiAuthValidateRequestBody]?: AuthValidationResult
}

export default nextApi({
  post: async ({ req, res }) => {
    const {
      portalId,
      nickname,
      password,
    } = req.body as ApiAuthValidateRequestBody
    const responseData: ApiAuthValidateResponseData = {}

    if (portalId) {
      responseData.portalId = await validatePortalId(portalId)
    }

    if (nickname) {
      responseData.nickname = await validateNickname(nickname)
    }

    if (password) {
      responseData.password = await validatePassword(password)
    }

    res.json(responseData)
  },
})
