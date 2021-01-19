import { createHandler, nextApi } from '@/modules/next-api-routes-helpers'
import { prisma } from '@/modules/prisma'
import { requireAuthMiddleware } from '@/modules/server/middlewares/require-auth'
import { validateRequiredReqDataMiddleware } from '@/modules/server/middlewares/validate-required-req-data'
import { dbTime } from '@/modules/time'
import { SafeCommunityBoard } from '@/types/schema'
import dayjs from 'dayjs'
import { getPinnedBoards } from './get-pinned-boards'

export type ApiGetRecentBoardsReqData = {
  excludePins: boolean
  onlyNames: boolean
}

export type ApiGetRecentBoardsResData = SafeCommunityBoard[]

export default nextApi({
  get: createHandler<ApiGetRecentBoardsResData>(async (req, res) => {
    await requireAuthMiddleware(req, res)
    await validateRequiredReqDataMiddleware<ApiGetRecentBoardsReqData>({
      query: {
        excludePins: {
          required: false,
          dataType: 'boolean',
        },
        onlyNames: {
          required: false,
          dataType: 'boolean',
        },
      },
    })(req, res)

    const { user } = req
    const {
      excludePins,
      onlyNames,
    } = (req.query as unknown) as ApiGetRecentBoardsReqData

    const recentBoards = await prisma.communityBoard.findMany({
      where: {
        activeAt: {
          gte: dbTime(dayjs().subtract(7, 'day').toDate()),
        },
        isDeleted: false,
      },
      orderBy: [{ priority: 'desc' }, { activeAt: 'desc' }],
      select: {
        id: true,
        name: true,
        description: !onlyNames,
        createdAt: !onlyNames,
      },
    })

    if (excludePins) {
      const pinnedBoards = await getPinnedBoards({ userId: user.id })

      const filteredRecentBoards = recentBoards.filter(
        (board) =>
          pinnedBoards.findIndex(
            (pinnedBoard) => pinnedBoard.id === board.id
          ) === -1
      )

      return res.json(filteredRecentBoards)
    }

    return res.json(recentBoards)
  }),
})
