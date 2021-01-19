import { statusCode } from '@/constants/http-status-code'
import { JwtError, verifyToken } from '@/modules/jwt'
import { nextApi } from '@/modules/next-api-routes-helpers'
import { extractToken } from '@/modules/server/extract-token'

export type ApiAuthGeneralErrResData = {
  error: JwtError | null
}

export type ApiAuthVerifyResData = ApiAuthGeneralErrResData

export default nextApi({
  post: async (req, res) => {
    const accessToken = extractToken(req, res, 'access')

    const [error] = await verifyToken(accessToken, 'access')

    // If error, set the status code to 401
    if (error) {
      res.status(statusCode.UNAUTHORIZED)
    }

    res.json({ error })
  },
})
