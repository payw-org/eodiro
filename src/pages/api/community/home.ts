import { createHandler, nextApi } from '@/modules/next-api-routes-helpers'
import { prisma } from '@/modules/prisma'
import { requireAuthMiddleware } from '@/modules/server/middlewares/require-auth'
import { CommunityBoard } from '@prisma/client'
import { CommunityPostWithCommentsCount } from '../types'

export type ApiCommunityHomeResData = (CommunityBoard & {
  communityPosts: CommunityPostWithCommentsCount[]
})[]

export const apiCommunityHomeUrl = '/api/community/home'

export const apiCommunityHome = async (): Promise<ApiCommunityHomeResData> => {
  const boards = await prisma.communityBoard.findMany({
    include: {
      communityPosts: {
        orderBy: { id: 'desc' },
        take: 8,
        include: {
          communityComments: true,
        },
      },
    },
  })

  const boardsWithCommentsCount: ApiCommunityHomeResData = boards.map(
    (board) => {
      return {
        ...board,
        communityPosts: board.communityPosts.map((post) => {
          const communityCommentsCount = post.communityComments.length

          delete (post as any)['communityComments']

          return {
            ...post,
            communityCommentsCount,
          }
        }),
      }
    }
  )

  return boardsWithCommentsCount
}

export default nextApi({
  get: createHandler<ApiCommunityHomeResData>(async (req, res) => {
    await requireAuthMiddleware(req, res)

    const boards = await apiCommunityHome()

    res.json(boards)
  }),
})
