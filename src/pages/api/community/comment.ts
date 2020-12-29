import { createHandler, nextApi } from '@/modules/next-api-routes-helpers'
import { prisma } from '@/modules/prisma'
import { requireAuthMiddleware } from '@/modules/server/middlewares/require-auth'
import { validateRequiredReqDataMiddleware } from '@/modules/server/middlewares/validate-required-req-data'
import { dbNow } from '@/modules/time'

export const apiCommunityCreateCommentUrl = `/api/community/comment`

export type ApiCommunityCreateCommentReqData = {
  body: string
  postId: number
}

export default nextApi({
  post: createHandler(async (req, res) => {
    await requireAuthMiddleware(req, res)
    await validateRequiredReqDataMiddleware<ApiCommunityCreateCommentReqData>({
      body: {
        body: 'string',
        postId: 'number',
      },
    })(req, res)

    const { authData } = req
    const { body, postId } = req.body as ApiCommunityCreateCommentReqData

    const post = await prisma.communityPost.findUnique({
      where: { id: postId },
    })

    if (!post) {
      res.status(400)

      return
    }

    // Find user information
    const user = await prisma.user.findUnique({
      where: { id: authData.userId },
    })

    // Create a comment
    await prisma.communityComment.create({
      data: {
        user: { connect: { id: user?.id } },
        commentedAt: dbNow(),
        randomNickname: user?.randomNickname,
        body,
        communityPost: { connect: { id: postId } },
      },
    })

    res.status(200).end()
  }),
})
