import { nextApi } from '@/modules/next-api-routes-helpers'
import Auth from '@/modules/server/auth'
import { validateRequiredReqDataMiddleware } from '@/modules/server/middlewares/validate-required-req-data'

export const apiAuthForgotUrl = '/api/auth/forgot'

export type ApiAuthForgotReqBody = {
  portalId: string
}

export default nextApi({
  post: async (req, res) => {
    await validateRequiredReqDataMiddleware<ApiAuthForgotReqBody>({
      body: {
        portalId: 'string',
      },
    })(req, res)

    const { portalId } = req.body as ApiAuthForgotReqBody

    const result = await Auth.changePassword(portalId)

    if (!result) {
      res.status(404).end()
      return
    }

    res.status(200).end()
  },
})
