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
      communityComments: CommunityComment[]
    })
  | null

export const apiCommunityPostUrl = (data: ApiCommunityPostReqData) =>
  `/api/community/post?${queryString.stringify(data)}`

export const apiCommunityPost = async ({ postId }: ApiCommunityPostReqData) => {
  const data = await prisma.communityPost.findUnique({
    where: { id: postId },
    include: {
      communityComments: {
        orderBy: { id: 'asc' },
      },
    },
  })

  return data
}

export default nextApi({
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

    res.json(data)
  }),
})
