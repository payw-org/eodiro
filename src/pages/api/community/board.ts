import { eodiroConsts } from '@/constants'
import { createHandler, nextApi } from '@/modules/next-api-routes-helpers'
import { prisma } from '@/modules/prisma'
import { requireAuthMiddleware } from '@/modules/server/middlewares/require-auth'
import { validateRequiredReqDataMiddleware } from '@/modules/server/middlewares/validate-required-req-data'
import { CommunityBoard } from '@prisma/client'
import queryString from 'query-string'
import { CommunityPostWithCommentsAndLikesCount } from '../types'

export type ApiCommunityBoardReqData = {
  boardId: number
  page: number
}

export type ApiCommunityBoardResData = {
  totalPage: number
  page: number
  board:
    | (CommunityBoard & {
        communityPosts: CommunityPostWithCommentsAndLikesCount[]
      })
    | null
}

export const apiCommunityBoardUrl = (data: ApiCommunityBoardReqData) =>
  `/api/community/board?${queryString.stringify(data)}`

export const apiCommunityBoard = async (
  data: ApiCommunityBoardReqData
): Promise<ApiCommunityBoardResData> => {
  const { boardId, page } = data

  const take = 30
  const skip = Math.max(page - 1, 0) * take
  const totalPage = Math.ceil(
    (await prisma.communityPost.count({
      where: { communityBoard: { id: boardId } },
    })) / take
  )

  const board = await prisma.communityBoard.findUnique({
    where: { id: boardId },
    include: {
      communityPosts: {
        orderBy: { id: 'desc' },
        skip,
        take,
        where: { isDeleted: false },
        include: {
          communityComments: { where: { isDeleted: false } },
          communityPostLikes: true,
          communityPostBookmarks: true,
        },
      },
    },
  })

  const commentsCountedBoard: ApiCommunityBoardResData['board'] = board
    ? {
        ...board,
        communityPosts: board.communityPosts.map((post) => {
          const {
            communityComments,
            communityPostLikes,
            communityPostBookmarks,
            ...rest
          } = post

          return {
            ...rest,
            title: rest.title.slice(0, eodiroConsts.POST_LIST_SLICE_LENGTH),
            body: rest.body.slice(0, eodiroConsts.POST_LIST_SLICE_LENGTH),
            communityCommentsCount: communityComments.length,
            communityPostLikesCount: communityPostLikes.length,
            communityPostBookmarksCount: communityPostBookmarks.length,
          }
        }),
      }
    : null

  return { totalPage, board: commentsCountedBoard, page }
}

export default nextApi({
  get: createHandler<ApiCommunityBoardResData>(async (req, res) => {
    await requireAuthMiddleware(req, res)
    await validateRequiredReqDataMiddleware<ApiCommunityBoardReqData>({
      query: {
        boardId: 'number',
        page: 'number',
      },
    })(req, res)

    const data = await apiCommunityBoard(
      (req.query as unknown) as ApiCommunityBoardReqData
    )

    if (!data) {
      res.status(404).end()
      return
    }

    res.json(data)
  }),
})
