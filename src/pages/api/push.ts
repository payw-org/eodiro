import { nextApi } from '@/modules/next-api-routes-helpers'
import { prisma } from '@/modules/prisma'
import { requireAuthMiddleware } from '@/modules/server/middlewares/require-auth'
import { validateRequiredReqDataMiddleware } from '@/modules/server/middlewares/validate-required-req-data'
import { dbNow } from '@/modules/time'

export type ApiPushReqData = {
  expoPushToken: string
}

export default nextApi({
  post: async (req, res) => {
    await requireAuthMiddleware(req, res)
    await validateRequiredReqDataMiddleware<ApiPushReqData>({
      body: {
        expoPushToken: 'string',
      },
    })(req, res)

    const { user } = req
    const { expoPushToken } = req.body as ApiPushReqData
    const now = dbNow()

    await prisma.push.upsert({
      where: {
        expoPushToken,
      },
      create: {
        user: { connect: { id: user.id } },
        expoPushToken,
        registeredAt: now,
        activeAt: now,
      },
      update: {
        activeAt: now,
      },
    })

    res.status(200).end()
  },
})
