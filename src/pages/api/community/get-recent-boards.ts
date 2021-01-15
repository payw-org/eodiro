import { createHandler, nextApi } from '@/modules/next-api-routes-helpers'
import { prisma } from '@/modules/prisma'
import { requireAuthMiddleware } from '@/modules/server/middlewares/require-auth'
import { dbTime } from '@/modules/time'
import { SafeCommunityBoard } from '@/types/schema'
import dayjs from 'dayjs'
import { getPinnedBoards } from './get-pinned-boards'

export type ApiGetRecentBoardsResData = SafeCommunityBoard[]

export default nextApi({
  get: createHandler<ApiGetRecentBoardsResData>(async (req, res) => {
    await requireAuthMiddleware(req, res)

    const { user } = req

    const recentBoards = await prisma.communityBoard.findMany({
      where: {
        activeAt: {
          gte: dbTime(dayjs().subtract(7, 'day').toDate()),
        },
      },
      orderBy: [{ priority: 'desc' }, { activeAt: 'desc' }],
      select: {
        id: true,
        name: true,
      },
    })

    const pinnedBoards = await getPinnedBoards({ userId: user.id })

    const filteredRecentBoards = recentBoards.filter(
      (board) =>
        pinnedBoards.findIndex((pinnedBoard) => pinnedBoard.id === board.id) ===
        -1
    )

    return res.json(filteredRecentBoards)
  }),
})
