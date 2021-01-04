import { createHandler, nextApi } from '@/modules/next-api-routes-helpers'
import { prisma } from '@/modules/prisma'
import { requireAuthMiddleware } from '@/modules/server/middlewares/require-auth'
import { validateRequiredReqDataMiddleware } from '@/modules/server/middlewares/validate-required-req-data'

export const apiCommunityLikePostUrl = '/api/community/like-post'

export type ApiCommunityLikePostReqData = {
  postId: number
}

export type ApiCommunityLikePostResData = {
  count: number
  isLikedByMe: boolean
}

export default nextApi({
  post: createHandler<ApiCommunityLikePostResData>(async (req, res) => {
    await requireAuthMiddleware(req, res)
    await validateRequiredReqDataMiddleware<ApiCommunityLikePostReqData>({
      body: {
        postId: 'number',
      },
    })(req, res)

    const { postId } = req.body as ApiCommunityLikePostReqData
    const { user } = req
    const userId = user.id

    const post = await prisma.communityPost.findUnique({
      where: { id: postId },
    })

    if (!post || post.isDeleted) {
      res.status(404).end()
      return
    }

    const alreadyLiked = await prisma.communityPostLike.findUnique({
      where: { userId_postId: { userId, postId } },
    })

    if (alreadyLiked) {
      await prisma.communityPostLike.delete({
        where: { userId_postId: { userId, postId } },
      })

      const count = await prisma.communityPostLike.count({
        where: { postId },
      })

      res.json({ isLikedByMe: false, count })
    } else {
      await prisma.communityPostLike.create({
        data: {
          user: {
            connect: { id: userId },
          },
          communityPost: {
            connect: { id: postId },
          },
        },
      })

      const count = await prisma.communityPostLike.count({
        where: { postId },
      })

      res.json({ isLikedByMe: true, count })
    }
  }),
})
