import { nextApi } from '@/modules/next-api-routes-helpers'
import Auth, { SignUpInfo, SignUpResult } from '@/modules/server/auth'

export type ApiAuthJoinRequestBody = SignUpInfo
export type ApiAuthJoinResponseData = SignUpResult

export default nextApi({
  post: async (req, res) => {
    const signUpInfo = req.body as ApiAuthJoinRequestBody
    const signUpResult = await Auth.signUp(signUpInfo)

    res.json(signUpResult)
  },
})
