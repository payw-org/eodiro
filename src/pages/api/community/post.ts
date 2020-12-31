import {
  createHandler,
  nextApi,
  typeQuery,
} from '@/modules/next-api-routes-helpers'
import { prisma } from '@/modules/prisma'
import { requireAuthMiddleware } from '@/modules/server/middlewares/require-auth'
import { validateRequiredReqDataMiddleware } from '@/modules/server/middlewares/validate-required-req-data'
import { CommunityComment, CommunityPost } from '@prisma/client'
import queryString from 'query-string'

export type ApiCommunityPostReqData = {
  postId: number
}
export type ApiCommunityPostResData =
  | (CommunityPost & {
      communityBoard: {
        id: number
      }
      communityComments: CommunityComment[]
    })
  | null

export const apiCommunityPostUrl = (data: ApiCommunityPostReqData) =>
  `/api/community/post?${queryString.stringify(data)}`

export const apiCommunityPost = async ({ postId }: ApiCommunityPostReqData) => {
  const data = await prisma.communityPost.findUnique({
    where: { id: postId },
    include: {
      communityBoard: {
        select: {
          id: true,
        },
      },
      communityComments: {
        orderBy: { id: 'asc' },
      },
    },
  })

  return data
}

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

    const data = await apiCommunityPost(
      typeQuery<ApiCommunityPostReqData>(req.query)
    )

    if (!data) {
      // Not Found
      res.status(404).end()
      return
    }

    res.json(data)
  }),
  /**
   * Upload a new post
   */
  post: createHandler(async (req, res) => {}),
})
