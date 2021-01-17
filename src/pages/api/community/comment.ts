import { createHandler, nextApi } from '@/modules/next-api-routes-helpers'
import { prisma } from '@/modules/prisma'
import { requireAuthMiddleware } from '@/modules/server/middlewares/require-auth'
import { validateRequiredReqDataMiddleware } from '@/modules/server/middlewares/validate-required-req-data'
import Push from '@/modules/server/push'
import { dbNow } from '@/modules/time'

export const apiCommunityCreateCommentUrl = `/api/community/comment`

export type ApiCommunityCreateCommentReqData = {
  body: string
  postId: number
}

// DELETE
export const apiCommunityDeleteCommentUrl = apiCommunityCreateCommentUrl

export type ApiCommunityDeleteCommentReqData = {
  commentId: number
}
// DELETE

export default nextApi({
  // Write a comment
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

    // If the post doesn't exist or is deleted
    // respond with NOT FOUND (404)
    if (!post || post.isDeleted) {
      res.status(404).end()

      return
    }

    const trimmedBody = body.trim()

    if (trimmedBody.length === 0) {
      res.status(400).end()
      return
    }

    // Create a comment
    const createComment = prisma.communityComment.create({
      data: {
        user: { connect: { id: user?.id } },
        commentedAt: dbNow(),
        randomNickname: user?.randomNickname,
        body: trimmedBody,
        communityPost: { connect: { id: postId } },
      },
    })

    // Increment post comments count
    const incrementCount = prisma.communityPost.update({
      where: { id: post.id },
      data: { commentsCount: { increment: 1 } },
    })

    const [comment] = await prisma.$transaction([createComment, incrementCount])

    // Push notification to the post author
    if (post.userId !== user.id) {
      const pushes = await prisma.push.findMany({
        where: {
          userId: post.userId,
        },
      })

      if (pushes.length > 0) {
        Push.notify({
          to: pushes.map((push) => push.expoPushToken),
          title: '회원님의 게시물에 새로운 댓글이 달렸습니다.',
          body: trimmedBody,
          data: {
            type: 'comment',
            boardId: post.boardId,
            postId: post.id,
            commentId: comment.id,
          },
          sound: 'default',
        }).catch((error) => {
          console.error(error)
        })
      }
    }

    res.status(200).end()
  }),
  // Delete a comment
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

    // Delete comment
    const deleteComment = prisma.communityComment.update({
      where: { id: commentId },
      data: {
        isDeleted: true,
      },
    })

    // Decrement post comments count
    const decrementCount = prisma.communityPost.update({
      where: { id: comment.postId },
      data: { commentsCount: { decrement: 1 } },
    })

    await prisma.$transaction([deleteComment, decrementCount])

    res.status(200).end()
  },
})
