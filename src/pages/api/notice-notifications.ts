import { createHandler, nextApi } from '@/modules/next-api-routes-helpers'
import { prisma } from '@/modules/prisma'
import { availableVendors } from '@/modules/server/cau-notice-watcher/vendors'
import { requireAuthMiddleware } from '@/modules/server/middlewares/require-auth'
import { validateRequiredReqDataMiddleware } from '@/modules/server/middlewares/validate-required-req-data'
import { dbNow } from '@/modules/time'

// Get all subscriptions
export const apiNoticeNotificationsGetUrl = '/api/notice-notifications'

export type ApiNoticeNotificationsGetResData = string[] // key[]
// Get all subscriptions

// Subscribe
export const apiNoticeNotificationsSubscribeUrl = apiNoticeNotificationsGetUrl

export type ApiNoticeNotificationsSubscribeReqData = {
  key: string
}

export type ApiNoticeNotificationsSubscribeResData = {
  subscribed: boolean
}
// Subscribe

export default nextApi({
  get: createHandler<ApiNoticeNotificationsGetResData>(async (req, res) => {
    await requireAuthMiddleware(req, res)

    const { user } = req

    const subscriptions = await prisma.noticeNotificationsSubscription.findMany(
      {
        where: {
          userId: user.id,
        },
      }
    )

    const keys = subscriptions.map((sub) => sub.noticeKey)

    res.json(keys)
  }),
  // Subscribe or unsubscribe
  post: createHandler<ApiNoticeNotificationsSubscribeResData>(
    async (req, res) => {
      await requireAuthMiddleware(req, res)
      await validateRequiredReqDataMiddleware<ApiNoticeNotificationsSubscribeReqData>(
        {
          body: {
            key: 'string',
          },
        }
      )(req, res)

      const { user } = req
      const { key } = req.body as ApiNoticeNotificationsSubscribeReqData

      const keyIndex = availableVendors.findIndex(
        (vendor) => vendor.key === key
      )

      if (keyIndex === -1) {
        res.status(404).end()
        return
      }

      // Find the existing subscription
      const existingSubscription = await prisma.noticeNotificationsSubscription.findFirst(
        {
          where: {
            userId: user.id,
            noticeKey: key,
          },
        }
      )

      if (existingSubscription) {
        await prisma.noticeNotificationsSubscription.delete({
          where: { id: existingSubscription.id },
        })

        res.json({ subscribed: false })
      } else {
        await prisma.noticeNotificationsSubscription.create({
          data: {
            user: {
              connect: {
                id: user.id,
              },
            },
            noticeKey: key,
            subscribedAt: dbNow(),
          },
        })

        res.json({ subscribed: true })
      }
    }
  ),
})
