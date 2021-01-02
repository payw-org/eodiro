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

// DELETE
export const apiCommunityDeleteCommentUrl = `/api/community/comment`

export type ApiCommunityDeleteCommentReqData = {
  commentId: number
}
// DELETE

export default nextApi({
  post: createHandler(async (req, res) => {
    await requireAuthMiddleware(req, res)
    await validateRequiredReqDataMiddleware<ApiCommunityCreateCommentReqData>({
      body: {
        body: 'string',
        postId: 'number',
      },
    })(req, res)

    const { user } = req
    const { body, postId } = req.body as ApiCommunityCreateCommentReqData

    const post = await prisma.communityPost.findUnique({
      where: { id: postId },
    })

    if (!post) {
      res.status(404).end()

      return
    }

    const trimmedBody = body.trim()

    if (trimmedBody.length === 0) {
      res.status(400).end()
      return
    }

    // Create a comment
    await prisma.communityComment.create({
      data: {
        user: { connect: { id: user?.id } },
        commentedAt: dbNow(),
        randomNickname: user?.randomNickname,
        body: trimmedBody,
        communityPost: { connect: { id: postId } },
      },
    })

    res.status(200).end()
  }),
  delete: async (req, res) => {
    await requireAuthMiddleware(req, res)
    await validateRequiredReqDataMiddleware<ApiCommunityDeleteCommentReqData>({
      body: {
        commentId: 'number',
      },
    })(req, res)

    const { user } = req

    const { commentId } = req.body as ApiCommunityDeleteCommentReqData
    const comment = await prisma.communityComment.findUnique({
      where: { id: commentId },
    })

    if (!comment) {
      res.status(404).end()
      return
    }

    if (comment.userId !== user.id) {
      res.status(403).end()
      return
    }

    // Delete
    await prisma.communityComment.update({
      where: { id: commentId },
      data: {
        isDeleted: true,
      },
    })

    res.status(200).end()
  },
})
