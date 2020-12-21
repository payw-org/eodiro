import { AuthData, signAccessToken, verifyToken } from '@/modules/jwt'
import { extractToken, nextApi } from '@/modules/next-api-routes-helpers'

export default nextApi({
  post: async ({ req, res }) => {
    const refreshToken = extractToken(req, res)

    if (!refreshToken) return

    const [err, authData] = await verifyToken(refreshToken, 'refresh')

    if (err) {
      res.status(401).json({ error: err })
    } else {
      // Sign new access token
      const newAccessToken = signAccessToken(authData as AuthData)

      res.json({ accessToken: newAccessToken })
    }
  },
})
