import {
  nextApi,
  validateRequiredBody,
} from '@/modules/next-api-routes-helpers'
import { prisma } from '@/modules/prisma'
import { sanitizePoralId } from '@/modules/sanitize-portal-id'

export type ApiAuthForgotReqBody = {
  portalId: string
}

export default nextApi({
  post: async (req, res) => {
    const validated = validateRequiredBody(req, res, {
      portalId: 'string',
    })

    if (!validated) return

    const { portalId } = req.body as ApiAuthForgotReqBody
    const user = await prisma.user.findUnique({
      where: { portalId: sanitizePoralId(portalId) },
    })

    if (!user) {
      res.status(404).end()
    }

    res.status(200).end()
  },
})
