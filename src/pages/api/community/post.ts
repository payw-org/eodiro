import { eodiroConsts } from '@/constants'
import {
  createHandler,
  nextApi,
  typeQuery,
} from '@/modules/next-api-routes-helpers'
import { prisma } from '@/modules/prisma'
import { requireAuthMiddleware } from '@/modules/server/middlewares/require-auth'
import { validateRequiredReqDataMiddleware } from '@/modules/server/middlewares/validate-required-req-data'
import { dbNow } from '@/modules/time'
import {
  SafeCommunityComment,
  SafeCommunityPost,
  SafeCommunitySubcomment,
} from '@/types/schema'
import queryString from 'query-string'

// GET
export type ApiCommunityPostReqData = {
  postId: number
}

export type ApiCommunityPostResData =
  | (SafeCommunityPost & {
      communityBoard: {
        name: string
      }
      communityComments: (SafeCommunityComment & {
        communitySubcomments: SafeCommunitySubcomment[]
      })[]
      communityPostLikesCount: number
      communityPostBookmarksCount: number
      likedByMe: boolean
      bookmarkedByMe: boolean
    })
  | null

export const apiCommunityPost = async ({
  postId,
  userId,
}: {
  postId: number
  userId: number
}) => {
  const post = await prisma.communityPost.findUnique({
    where: { id: postId },
    include: {
      communityComments: {
        orderBy: { id: 'asc' },
        include: {
          communitySubcomments: {
            where: { isDeleted: false },
          },
        },
      },
      communityBoard: {
        select: {
          name: true,
        },
      },
      communityPostLikes: true,
      communityPostBookmarks: true,
    },
  })

  if (post && !post.isDeleted) {
    const {
      userId: u1,
      isDeleted: d1,
      editedAt,
      communityPostLikes,
      communityPostBookmarks,
      ...safePostRest
    } = post
    const countedPost: ApiCommunityPostResData = {
      ...safePostRest,
      hasBeenEdited: !!editedAt,
      isMine: post.userId === userId,
      communityComments: post.communityComments
        .filter(
          (comment) =>
            !(comment.isDeleted && comment.communitySubcomments.length === 0)
        )
        .map((comment) => {
          const { userId: u2, isDeleted: d2, ...commentRest } = comment

          const isDeletedButHasSubcomments =
            d2 && comment.communitySubcomments.length > 0

          return {
            ...commentRest,
            isMine: isDeletedButHasSubcomments
              ? false
              : comment.userId === userId,
            randomNickname: isDeletedButHasSubcomments
              ? '알수없음'
              : comment.randomNickname,
            body: isDeletedButHasSubcomments
              ? '삭제된 댓글입니다.'
              : comment.body,
            communitySubcomments: comment.communitySubcomments.map(
              (subcomment) => ({
                ...subcomment,
                isMine: subcomment.userId === userId,
              })
            ),
          }
        }),
      communityPostLikesCount: communityPostLikes.length,
      communityPostBookmarksCount: communityPostBookmarks.length,
      likedByMe: communityPostLikes.some(
        (postLike) => postLike.userId === userId
      ),
      bookmarkedByMe: communityPostBookmarks.some(
        (bookmark) => bookmark.userId === userId
      ),
    }

    return countedPost
  }

  return null
}
// GET

// UPSERT
export const apiCommunityUpsertPostUrl = '/api/community/post'

export type ApiCommunityUpsertPostReqData = {
  postId?: number
  boardId: number
  title: string
  body: string
}

export type ApiCommunityUpsertPostResData = {
  postId: number
}

export const apiCommunityPostUrl = (data: ApiCommunityPostReqData) =>
  `/api/community/post?${queryString.stringify(data)}`
// UPSERT

// DELETE
export const apiCommunityUpsertDeleteUrl = apiCommunityUpsertPostUrl

export type ApiCommunityDeletePostReqData = {
  postId: number
}
// DELETE

export default nextApi({
  /**
   * Fetch a post data with comments
   */
  get: createHandler<ApiCommunityPostResData>(async (req, res) => {
    await requireAuthMiddleware(req, res)
    await validateRequiredReqDataMiddleware<ApiCommunityPostReqData>({
      query: {
        postId: 'number',
      },
    })(req, res)

    const { user } = req

    const data = await apiCommunityPost({
      postId: typeQuery<ApiCommunityPostReqData>(req.query).postId,
      userId: user.id,
    })

    if (!data) {
      // Not Found
      res.status(404).end()
      return
    }

    res.json(data)
  }),
  /**
   * Upsert a new post
   */
  post: createHandler<ApiCommunityUpsertPostResData | string>(
    async (req, res) => {
      await requireAuthMiddleware(req, res)
      await validateRequiredReqDataMiddleware<ApiCommunityUpsertPostReqData>({
        body: {
          postId: {
            required: false,
            dataType: 'number',
          },
          boardId: 'number',
          title: 'string',
          body: 'string',
        },
      })(req, res)

      const {
        postId,
        boardId,
        title,
        body,
      } = req.body as ApiCommunityUpsertPostReqData

      const trimmedTitle = title.trim()
      const trimmedBody = body.trim()

      if (trimmedTitle.length < eodiroConsts.MIN_POST_TITLE_LENGTH) {
        res
          .status(400)
          .send(
            `Title is too short (min: ${eodiroConsts.MIN_POST_TITLE_LENGTH})`
          )
        return
      }

      if (trimmedTitle.length > eodiroConsts.MAX_POST_TITLE_LENGTH) {
        res
          .status(400)
          .send(
            `Title is too long (max: ${eodiroConsts.MAX_POST_TITLE_LENGTH})`
          )
        return
      }

      if (trimmedBody.length < eodiroConsts.MIN_POST_BODY_LENGTH) {
        res
          .status(400)
          .send(`Body is too short (min: ${eodiroConsts.MIN_POST_BODY_LENGTH})`)
        return
      }

      const { user } = req

      // Upsert post
      const upsertResult = await prisma.communityPost.upsert({
        where: { id: postId ?? 0 },
        create: {
          title,
          body,
          randomNickname: user.randomNickname,
          postedAt: dbNow(),
          user: {
            connect: { id: user.id },
          },
          communityBoard: {
            connect: { id: boardId },
          },
        },
        update: {
          title,
          body,
          editedAt: dbNow(),
        },
      })

      // Update board active at
      await prisma.communityBoard.update({
        where: { id: upsertResult.boardId },
        data: { activeAt: dbNow() },
      })

      res.status(200).json({
        postId: upsertResult.id,
      })
    }
  ),
  /**
   * Delete the post
   */
  delete: createHandler(async (req, res) => {
    await requireAuthMiddleware(req, res)
    await validateRequiredReqDataMiddleware<ApiCommunityDeletePostReqData>({
      body: {
        postId: 'number',
      },
    })(req, res)

    const { postId } = req.body as ApiCommunityDeletePostReqData

    const post = await prisma.communityPost.findUnique({
      where: { id: postId },
    })
    const { user } = req

    // No post
    if (!post) {
      res.status(404).end()
      return
    }

    // Forbidden
    if (post.userId !== user.id) {
      res.status(403).end()
      return
    }

    // Delete
    await prisma.communityPost.update({
      where: { id: postId },
      data: {
        isDeleted: true,
      },
    })

    res.status(200).end()
  }),
})
