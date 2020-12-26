import { nextApi } from '@/modules/next-api-routes-helpers'
import {
  AuthValidationResult,
  validateNickname,
  validatePassword,
  validatePortalId,
} from '@/modules/server/auth/validation'

export type ApiAuthValidateRequestBody = {
  portalId?: string
  nickname?: string
  password?: string
}

export type ApiAuthValidateResponseData = {
  [K in keyof ApiAuthValidateRequestBody]?: AuthValidationResult
}

export default nextApi({
  post: async (req, res) => {
    const body = req.body as ApiAuthValidateRequestBody
    const responseData: ApiAuthValidateResponseData = {}

    if ('portalId' in body && body.portalId) {
      responseData.portalId = await validatePortalId(body.portalId)
    }

    if ('nickname' in body && body.nickname) {
      responseData.nickname = await validateNickname(body.nickname)
    }

    if ('password' in body && body.password) {
      responseData.password = await validatePassword(body.password)
    }

    res.json(responseData)
  },
})
