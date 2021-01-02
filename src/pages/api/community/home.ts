import { eodiroConsts } from '@/constants'
import { createHandler, nextApi } from '@/modules/next-api-routes-helpers'
import { prisma } from '@/modules/prisma'
import { requireAuthMiddleware } from '@/modules/server/middlewares/require-auth'
import { CommunityBoard } from '@prisma/client'
import { CommunityPostWithCommentsAndLikesCount } from '../types'

export type ApiCommunityHomeResData = (CommunityBoard & {
  communityPosts: CommunityPostWithCommentsAndLikesCount[]
})[]

export const apiCommunityHomeUrl = '/api/community/home'

export const apiCommunityHome = async (): Promise<ApiCommunityHomeResData> => {
  const boards = await prisma.communityBoard.findMany({
    include: {
      communityPosts: {
        orderBy: { id: 'desc' },
        take: 8,
        where: {
          isDeleted: false,
        },
        include: {
          communityComments: { where: { isDeleted: false } },
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
