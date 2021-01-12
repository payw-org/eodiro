import { NOT_FOUND } from '@/constants/http-status-code'
import { createHandler, nextApi } from '@/modules/next-api-routes-helpers'
import { prisma } from '@/modules/prisma'
import { requireAuthMiddleware } from '@/modules/server/middlewares/require-auth'
import { validateRequiredReqDataMiddleware } from '@/modules/server/middlewares/validate-required-req-data'

export type ApiCommunityPinBoardReqData = {
  boardId: number
}

export type ApiCommunityPinBoardResData = {
  isPinned: boolean
}

export default nextApi({
  post: createHandler<ApiCommunityPinBoardResData>(async (req, res) => {
    await requireAuthMiddleware(req, res)
    await validateRequiredReqDataMiddleware<ApiCommunityPinBoardReqData>({
      body: {
        boardId: 'number',
      },
    })(req, res)

    const { user } = req
    const { boardId } = req.body as ApiCommunityPinBoardReqData

    // Validate board
    const board = await prisma.communityBoard.findFirst({
      where: { id: boardId, isDeleted: false },
    })

    // Board not found
    if (!board) {
      return res.status(NOT_FOUND).end()
    }

    const pin = await prisma.communityBoardPin.findUnique({
      where: {
        userId_boardId: {
          userId: user.id,
          boardId,
        },
      },
    })

    if (pin) {
      await prisma.communityBoardPin.delete({
        where: {
          userId_boardId: {
            userId: user.id,
            boardId,
          },
        },
      })

      return res.json({ isPinned: false })
    }

    await prisma.communityBoardPin.create({
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },
        communityBoard: {
          connect: {
            id: boardId,
          },
        },
      },
    })

    return res.json({ isPinned: true })
  }),
})
