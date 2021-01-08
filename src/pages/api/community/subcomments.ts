import { NOT_FOUND } from '@/constants/http-status-code'
import { createHandler, nextApi } from '@/modules/next-api-routes-helpers'
import { prisma } from '@/modules/prisma'
import { requireAuthMiddleware } from '@/modules/server/middlewares/require-auth'
import { validateRequiredReqDataMiddleware } from '@/modules/server/middlewares/validate-required-req-data'
import { SafeCommunitySubcomment } from '@/types/schema'
import queryString from 'query-string'

export const apiCommunityGetSubcommentsUrl = (data: {
  commentId: number
  cursor?: number
}) => `/api/community/subcomments?${queryString.stringify(data)}`

export type ApiCommunitySubcommentsReqData = {
  commentId: number
  /** Subcomment ID */
  cursor?: number
}

export type ApiCommunitySubcommentsResData = SafeCommunitySubcomment[]

export default nextApi({
  get: createHandler<ApiCommunitySubcommentsResData>(async (req, res) => {
    await requireAuthMiddleware(req, res)
    await validateRequiredReqDataMiddleware<ApiCommunitySubcommentsReqData>({
      query: {
        commentId: 'number',
        cursor: {
          required: false,
          dataType: 'number',
        },
      },
    })(req, res)

    const { user } = req

    const {
      commentId,
      cursor,
    } = (req.query as unknown) as ApiCommunitySubcommentsReqData

    const post = await prisma.communityComment.findFirst({
      where: { id: commentId, isDeleted: false },
    })

    if (!post) {
      res.status(NOT_FOUND).end()
      return
    }

    const subcomments = await prisma.communitySubcomment.findMany({
      where: { commentId, isDeleted: false },
      orderBy: { id: 'asc' },
      skip: cursor ? 1 : undefined,
      cursor: cursor ? { id: cursor } : undefined,
    })

    const safeSubcomments: ApiCommunitySubcommentsResData = subcomments.map(
      (subcomment) => {
        const { userId: u1, isDeleted: d1, ...subcommentRest } = subcomment
        return {
          ...subcommentRest,
          isMine: subcomment.userId === user.id,
        }
      }
    )

    res.json(safeSubcomments)
  }),
})
