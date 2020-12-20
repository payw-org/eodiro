import { nextApi } from '@/modules/next-api-routes-helpers'
import Auth, { SignUpInfo, SignUpResult } from '@/modules/server/auth'

export type JoinApiRequestBody = SignUpInfo
export type JoinApiResponseData = SignUpResult

export default nextApi({
  post: async ({ req, res }) => {
    const signUpInfo = req.body as JoinApiRequestBody

    const signUpResult = await Auth.signUp(signUpInfo)

    res.json(signUpResult)
  },
})
