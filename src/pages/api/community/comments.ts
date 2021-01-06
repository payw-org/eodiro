import { createHandler, nextApi } from '@/modules/next-api-routes-helpers'
import { prisma } from '@/modules/prisma'
import { requireAuthMiddleware } from '@/modules/server/middlewares/require-auth'
import { validateRequiredReqDataMiddleware } from '@/modules/server/middlewares/validate-required-req-data'
import { SafeCommunityComment, SafeCommunitySubcomment } from '@/types/schema'
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

export type CommunityCommentWithSubcomments = SafeCommunityComment & {
  communitySubcomments: SafeCommunitySubcomment[]
}

export type ApiCommunityCommentsResData = CommunityCommentWithSubcomments[]

export default nextApi({
  get: createHandler<ApiCommunityCommentsResData>(async (req, res) => {
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

    const { user } = req

    const {
      postId,
      cursor,
    } = (req.query as unknown) as ApiCommunityCommentsReqData

    const post = await prisma.communityPost.findUnique({
      where: { id: postId },
    })

    if (!post) {
      res.status(404).end()
      return
    }

    const comments = await prisma.communityComment.findMany({
      where: { postId },
      include: {
        communitySubcomments: {
          where: {
            isDeleted: false,
          },
        },
      },
      orderBy: { id: 'asc' },
      skip: cursor ? 1 : undefined,
      cursor: cursor ? { id: cursor } : undefined,
    })

    const safeComments: ApiCommunityCommentsResData = comments.map(
      (comment) => {
        const { userId: u1, isDeleted: d1, ...commentRest } = comment
        return {
          ...commentRest,
          isMine: comment.userId === user.id,
          communitySubcomments: comment.communitySubcomments.map(
            (subcomment) => {
              const {
                userId: u2,
                isDeleted: d2,
                ...subcommentRest
              } = subcomment
              return {
                ...subcommentRest,
                isMine: subcomment.userId === user.id,
              }
            }
          ),
        }
      }
    )

    res.json(safeComments)
  }),
})
