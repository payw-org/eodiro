import { verifyToken } from '@/modules/jwt'
import { nextApi } from '@/modules/next-api-routes-helpers'
import { extractToken } from '@/modules/server/extract-token'

export default nextApi({
  post: async (req, res) => {
    const accessToken = extractToken(req, res, 'access')

    if (!accessToken) return

    const [err, authData] = await verifyToken(accessToken, 'access')

    if (err) {
      res.status(401).json({ error: err })
    } else {
      res.json({ ...authData })
    }
  },
})
