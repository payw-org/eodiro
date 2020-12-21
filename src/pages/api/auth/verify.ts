import { verifyToken } from '@/modules/jwt'
import { extractToken, nextApi } from '@/modules/next-api-routes-helpers'

export default nextApi({
  post: async ({ req, res }) => {
    const accessToken = extractToken(req, res)

    if (!accessToken) return

    const [err, authData] = await verifyToken(accessToken, 'access')

    if (err) {
      res.status(401).json({ error: err })
    } else {
      res.json({ ...authData })
    }
  },
})
