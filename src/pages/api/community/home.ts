import { createHandler, nextApi } from '@/modules/next-api-routes-helpers'
import { prisma } from '@/modules/prisma'
import { requireAuthMiddleware } from '@/modules/server/middlewares/require-auth'
import { CommunityBoard, CommunityPost } from '@prisma/client'

export type ApiCommunityHomeResData = (CommunityBoard & {
  communityPosts: CommunityPost[]
})[]

export const apiCommunityHomeUrl = '/api/community/home'

export const apiCommunityHome = async () => {
  const boards = await prisma.communityBoard.findMany({
    include: {
      communityPosts: {
        orderBy: { id: 'desc' },
        take: 8,
      },
    },
  })

  return boards
}

export default nextApi({
  get: createHandler<ApiCommunityHomeResData>(async (req, res) => {
    await requireAuthMiddleware(req, res)

    const boards = await apiCommunityHome()

    res.json(boards)
  }),
})
