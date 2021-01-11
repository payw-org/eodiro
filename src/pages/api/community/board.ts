import { eodiroConsts } from '@/constants'
import { createHandler, nextApi } from '@/modules/next-api-routes-helpers'
import { prisma } from '@/modules/prisma'
import { requireAuthMiddleware } from '@/modules/server/middlewares/require-auth'
import { validateRequiredReqDataMiddleware } from '@/modules/server/middlewares/validate-required-req-data'
import { SafeCommunityBoard } from '@/types/schema'
import queryString from 'query-string'
import { CommunityPostWithCounts } from '../types'

export type ApiCommunityBoardReqData = {
  boardId: number
  page: number
}

export type ApiCommunityBoardResData = {
  totalPage: number
  page: number
  board:
    | (SafeCommunityBoard & {
        communityPosts: CommunityPostWithCounts[]
      })
    | null
}

export const apiCommunityBoardUrl = (data: ApiCommunityBoardReqData) =>
  `/api/community/board?${queryString.stringify(data)}`

export const apiCommunityBoard = async (
  data: ApiCommunityBoardReqData & {
    userId: number
  }
): Promise<ApiCommunityBoardResData> => {
  const { boardId, page, userId } = data

  const take = 25
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
          communityComments: {
            where: { isDeleted: false },
            include: { communitySubcomments: true },
          },
          communityPostLikes: true,
          communityPostBookmarks: true,
        },
      },
    },
  })

  let commentsCountedBoard: ApiCommunityBoardResData['board'] = null

  if (board) {
    const { isDeleted: d1, ...boardRest } = board
    commentsCountedBoard = {
      ...boardRest,
      communityPosts: board.communityPosts.map((post) => {
        const {
          userId: u2,
          isDeleted: d2,
          editedAt,
          communityComments,
          communityPostLikes,
          communityPostBookmarks,
          ...safePostRest
        } = post

        const communityCommentsCount =
          communityComments.length +
          communityComments.reduce(
            (accum, comment) => accum + comment.communitySubcomments.length,
            0
          )

        communityComments.forEach((comment) => {
          delete (comment as any).communitySubcomments
        })

        return {
          ...safePostRest,
          isMine: post.userId === userId,
          hasBeenEdited: !!editedAt,
          title: safePostRest.title.slice(
            0,
            eodiroConsts.POST_LIST_SLICE_LENGTH
          ),
          body: safePostRest.body.slice(0, eodiroConsts.POST_LIST_SLICE_LENGTH),
          communityCommentsCount,
          communityPostLikesCount: communityPostLikes.length,
          communityPostBookmarksCount: communityPostBookmarks.length,
        }
      }),
    }
  }

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

    const { user } = req
    const data = await apiCommunityBoard({
      ...((req.query as unknown) as ApiCommunityBoardReqData),
      userId: user.id,
    })

    if (!data) {
      res.status(404).end()
      return
    }

    res.json(data)
  }),
})
