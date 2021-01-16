import { createHandler, nextApi } from '@/modules/next-api-routes-helpers'
import { prisma } from '@/modules/prisma'
import { requireAuthMiddleware } from '@/modules/server/middlewares/require-auth'
import { SafeCommunityBoard } from '@/types/schema'

export type ApiGetPinnedBoardsResData = SafeCommunityBoard[]

export async function getPinnedBoards(data: { userId: number }) {
  const { userId } = data

  const pinnedBoards = await prisma.communityBoard.findMany({
    where: {
      isDeleted: false,
      communityBoardPins: {
        some: { userId },
      },
    },
    orderBy: [{ priority: 'desc' }, { name: 'desc' }],
    select: {
      id: true,
      name: true,
      description: true,
      createdAt: true,
    },
  })

  return pinnedBoards
}

export default nextApi({
  get: createHandler<ApiGetPinnedBoardsResData>(async (req, res) => {
    await requireAuthMiddleware(req, res)

    const { user } = req

    const pinnedBoards = await getPinnedBoards({ userId: user.id })

    return res.json(pinnedBoards)
  }),
})
