import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  OK,
} from '@/constants/http-status-code'
import { createHandler, nextApi } from '@/modules/next-api-routes-helpers'
import { prisma } from '@/modules/prisma'
import { requireAuthMiddleware } from '@/modules/server/middlewares/require-auth'
import { validateRequiredReqDataMiddleware } from '@/modules/server/middlewares/validate-required-req-data'
import { dbNow } from '@/modules/time'

export type ApiCommunityCreateNewBoardReqData = {
  name: string
  description?: string
}

export default nextApi({
  post: createHandler(async (req, res) => {
    await requireAuthMiddleware(req, res)
    await validateRequiredReqDataMiddleware<ApiCommunityCreateNewBoardReqData>({
      body: {
        name: 'string',
        description: {
          required: false,
          dataType: 'string',
        },
      },
    })(req, res)

    const { user } = req
    const { name, description } = req.body as ApiCommunityCreateNewBoardReqData

    if (name.length < 1 || name.length > 50) {
      return res.status(BAD_REQUEST).json({
        message: '게시판 이름은 최소 한 자 이상, 최대 50자입니다.',
      })
    }

    try {
      await prisma.communityBoardCandidate.create({
        data: {
          name,
          description,
          createdAt: dbNow(),
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      })

      res.status(OK).end()
    } catch (createError) {
      res.status(INTERNAL_SERVER_ERROR).end()
    }
  }),
})
