import { eodiroConsts } from '@/constants'
import { createHandler, nextApi } from '@/modules/next-api-routes-helpers'
import { prisma } from '@/modules/prisma'
import { requireAuthMiddleware } from '@/modules/server/middlewares/require-auth'
import { validateRequiredReqDataMiddleware } from '@/modules/server/middlewares/validate-required-req-data'
import { SafeCommunityPost } from '@/types/schema'

export type ApiCommunityGetPopularReqPosts = {
  page?: number
}

export type ApiCommunityGetPopularPostsResData = {
  totalPage: number
  page: number
  popularPosts: SafeCommunityPost[]
}

export default nextApi({
  get: createHandler<ApiCommunityGetPopularPostsResData>(async (req, res) => {
    await requireAuthMiddleware(req, res)
    await validateRequiredReqDataMiddleware<ApiCommunityGetPopularReqPosts>({
      query: {
        page: {
          required: false,
          dataType: 'number',
        },
      },
    })(req, res)

    const { page = 1 } = req.query as ApiCommunityGetPopularReqPosts

    const take = eodiroConsts.POSTS_TAKE_IN_ONE_PAGE
    const skip = Math.max(page - 1, 0) * take

    const totalPage = Math.ceil(
      (await prisma.communityPost.count({
        where: {
          likesCount: { gte: eodiroConsts.POPULAR_POST_LIKES_THRESHOLD },
        },
      })) / take
    )

    const popularPosts = await prisma.communityPost.findMany({
      where: {
        likesCount: { gte: eodiroConsts.POPULAR_POST_LIKES_THRESHOLD },
      },
      orderBy: { id: 'desc' },
      skip,
      take,
      select: {
        id: true,
        boardId: true,
        title: true,
        randomNickname: true,
        likesCount: true,
        commentsCount: true,
        bookmarksCount: true,
        postedAt: true,
      },
    })

    res.json({
      totalPage,
      popularPosts,
      page,
    })
  }),
})
