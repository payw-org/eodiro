import { createHandler, nextApi } from '@/modules/next-api-routes-helpers'
import { prisma } from '@/modules/prisma'
import { requireAuthMiddleware } from '@/modules/server/middlewares/require-auth'
import { validateRequiredReqDataMiddleware } from '@/modules/server/middlewares/validate-required-req-data'
import { CommunityBoard, CommunityComment, CommunityPost } from '@prisma/client'
import queryString from 'query-string'
import { CommunityPostWithCommentsCount } from '../types'

export type ApiCommunityBoardReqData = {
  boardId: number
  page: number
}

export type ApiCommunityBoardResData = {
  totalPage: number
  page: number
  board:
    | (CommunityBoard & {
        communityPosts: CommunityPostWithCommentsCount[]
      })
    | null
}

export const apiCommunityBoardUrl = (data: ApiCommunityBoardReqData) =>
  `/api/community/board?${queryString.stringify(data)}`

export const apiCommunityBoard = async (
  data: ApiCommunityBoardReqData
): Promise<ApiCommunityBoardResData> => {
  const { boardId, page } = data

  const take = 15
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
        include: {
          communityComments: true,
        },
      },
    },
  })

  const commentsCountedBoard: ApiCommunityBoardResData['board'] = board
    ? {
        ...board,
        communityPosts: board.communityPosts.map((post) => {
          const communityCommentsCount = post.communityComments.length

          // Delete comments data
          // eslint-disable-next-line no-param-reassign
          delete (post as CommunityPost & {
            communityComments?: CommunityComment[]
          }).communityComments

          return {
            ...post,
            communityCommentsCount,
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

    res.json(data)
  }),
})
