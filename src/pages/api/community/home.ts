import { eodiroConsts } from '@/constants'
import { createHandler, nextApi } from '@/modules/next-api-routes-helpers'
import { prisma } from '@/modules/prisma'
import { requireAuthMiddleware } from '@/modules/server/middlewares/require-auth'
import { CommunityBoard } from '@prisma/client'
import { CommunityPostWithCounts } from '../types'

export type ApiCommunityHomeResData = (CommunityBoard & {
  communityPosts: CommunityPostWithCounts[]
})[]

export const apiCommunityHomeUrl = '/api/community/home'

export const apiCommunityHome = async (
  userId: number
): Promise<ApiCommunityHomeResData> => {
  const take = 3
  const boards = await prisma.communityBoard.findMany({
    where: { isDeleted: false },
    include: {
      communityPosts: {
        orderBy: { id: 'desc' },
        take,
        where: {
          isDeleted: false,
        },
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

  const boardsWithCommentsCount: ApiCommunityHomeResData = boards.map(
    (board) => {
      return {
        ...board,
        communityPosts: board.communityPosts.map((post) => {
          const {
            userId: u1,
            isDeleted: d1,
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
            body: safePostRest.body.slice(
              0,
              eodiroConsts.POST_LIST_SLICE_LENGTH
            ),
            communityCommentsCount,
            communityPostLikesCount: communityPostLikes.length,
            communityPostBookmarksCount: communityPostBookmarks.length,
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

    const { user } = req
    const boards = await apiCommunityHome(user.id)

    res.json(boards)
  }),
})
