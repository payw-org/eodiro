import { AuthData, JwtError, verifyToken } from '@/modules/jwt'
import { nextApi } from '@/modules/next-api-routes-helpers'
import { extractToken } from '@/modules/server/extract-token'

export type ApiAuthGeneralErrResData = {
  error: JwtError | null
}

export type ApiAuthVerifyResData = ApiAuthGeneralErrResData & {
  authData?: AuthData
}

export default nextApi({
  post: async (req, res) => {
    const accessToken = extractToken(req, res, 'access')

    const [error, authData] = await verifyToken(accessToken, 'access')

    if (error) {
      res.status(401)
    }

    const resData: ApiAuthVerifyResData = {
      authData,
      error,
    }

    res.json(resData)
  },
})
