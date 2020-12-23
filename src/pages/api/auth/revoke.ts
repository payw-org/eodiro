import { AuthData, signRefreshToken, verifyToken } from '@/modules/jwt'
import { nextApi } from '@/modules/next-api-routes-helpers'
import { prisma } from '@/modules/prisma'
import { extractToken } from '@/modules/server/extract-token'

export default nextApi({
  post: async ({ req, res }) => {
    const refreshToken = extractToken(req, res, 'refresh')

    if (!refreshToken) return

    const [err, authData] = await verifyToken(refreshToken, 'refresh')

    if (err) {
      res.status(401).json({ error: err })
    } else {
      // Sign new refresh token
      const newRefreshToken = signRefreshToken(authData as AuthData)

      await prisma.user.update({
        data: { refreshToken: newRefreshToken },
        where: { id: authData?.userId },
      })

      res.json({ refreshToken: newRefreshToken })
    }
  },
})
