import { createHandler, nextApi } from '@/modules/next-api-routes-helpers'
import { prisma } from '@/modules/prisma'
import { requireAuthMiddleware } from '@/modules/server/middlewares/require-auth'
import { validateRequiredReqDataMiddleware } from '@/modules/server/middlewares/validate-required-req-data'
import { CommunityComment, Prisma } from '@prisma/client'
import queryString from 'query-string'

export const apiCommunityCommentsUrl = (data: {
  postId: number
  cursor?: number
}) => `/api/community/comments?${queryString.stringify(data)}`

export type ApiCommunityCommentsReqData = {
  postId: number
  /** Comment ID */
  cursor?: number
}

export type ApiCommunityCommentsResData = CommunityComment[]

export default nextApi({
  get: createHandler(async (req, res) => {
    await requireAuthMiddleware(req, res)
    await validateRequiredReqDataMiddleware<ApiCommunityCommentsReqData>({
      query: {
        postId: 'number',
        cursor: {
          required: false,
          dataType: 'number',
        },
      },
    })(req, res)

    const {
      postId,
      cursor,
    } = (req.query as unknown) as ApiCommunityCommentsReqData

    const args: Prisma.FindManyCommunityCommentArgs = {
      where: { postId, isDeleted: false },
      orderBy: { id: 'asc' },
    }

    if (cursor) {
      args.skip = 1
      args.cursor = { id: cursor }
    }

    const comments = await prisma.communityComment.findMany(args)

    res.json(comments)
  }),
})
