import { createHandler, nextApi } from '@/modules/next-api-routes-helpers'
import { prisma } from '@/modules/prisma'
import { requireAuthMiddleware } from '@/modules/server/middlewares/require-auth'
import { validateRequiredReqDataMiddleware } from '@/modules/server/middlewares/validate-required-req-data'

export const apiCommunityBookmarkPostUrl = '/api/community/bookmark-post'

export type ApiCommunityBookmarkPostReqData = {
  postId: number
}

export type ApiCommunityBookmarkPostResData = {
  count: number
  isBookmarkedByMe: boolean
}

export default nextApi({
  post: createHandler<ApiCommunityBookmarkPostResData>(async (req, res) => {
    await requireAuthMiddleware(req, res)
    await validateRequiredReqDataMiddleware<ApiCommunityBookmarkPostReqData>({
      body: {
        postId: 'number',
      },
    })(req, res)

    const { postId } = req.body as ApiCommunityBookmarkPostReqData
    const { user } = req
    const userId = user.id

    const post = await prisma.communityPost.findUnique({
      where: { id: postId },
    })

    if (!post || post.isDeleted) {
      res.status(404).end()
      return
    }

    const alreadyBookmarked = await prisma.communityPostBookmark.findUnique({
      where: { userId_postId: { userId, postId } },
    })

    if (alreadyBookmarked) {
      await prisma.communityPostBookmark.delete({
        where: { userId_postId: { userId, postId } },
      })

      const count = await prisma.communityPostBookmark.count({
        where: { postId },
      })

      res.json({ isBookmarkedByMe: false, count })
    } else {
      await prisma.communityPostBookmark.create({
        data: {
          user: {
            connect: { id: userId },
          },
          communityPost: {
            connect: { id: postId },
          },
        },
      })

      const count = await prisma.communityPostBookmark.count({
        where: { postId },
      })

      res.json({ isBookmarkedByMe: true, count })
    }
  }),
})
