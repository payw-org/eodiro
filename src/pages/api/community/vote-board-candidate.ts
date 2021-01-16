import { statusCode } from '@/constants/http-status-code'
import { createHandler, nextApi } from '@/modules/next-api-routes-helpers'
import { prisma } from '@/modules/prisma'
import { requireAuthMiddleware } from '@/modules/server/middlewares/require-auth'
import { validateRequiredReqDataMiddleware } from '@/modules/server/middlewares/validate-required-req-data'

export type ApiCommunityVoteBoardCandidateReqData = {
  boardCandidateId: number
}

export type ApiCommunityVoteBoardCandidateResData = {
  votes: number
  alreadyVoted: boolean
}

export default nextApi({
  post: createHandler<ApiCommunityVoteBoardCandidateResData>(
    async (req, res) => {
      await requireAuthMiddleware(req, res)
      await validateRequiredReqDataMiddleware<ApiCommunityVoteBoardCandidateReqData>(
        {
          body: {
            boardCandidateId: 'number',
          },
        }
      )(req, res)

      const { user } = req
      const {
        boardCandidateId,
      } = req.body as ApiCommunityVoteBoardCandidateReqData

      const boardCandidate = await prisma.communityBoardCandidate.findUnique({
        where: { id: boardCandidateId },
        include: {
          communityBoardCandidateVotes: true,
        },
      })

      if (!boardCandidate) {
        return res.status(statusCode.NOT_FOUND).end()
      }

      const myVote = await prisma.communityBoardCandidateVote.findUnique({
        where: {
          boardCandidateId_userId: {
            boardCandidateId,
            userId: user.id,
          },
        },
      })

      if (myVote) {
        return res.json({
          alreadyVoted: true,
          votes: boardCandidate.communityBoardCandidateVotes.length,
        })
      }

      // Add vote
      await prisma.communityBoardCandidateVote.create({
        data: {
          user: { connect: { id: user.id } },
          communityBoardCandidate: { connect: { id: boardCandidateId } },
        },
      })

      // Count votes
      const votes = (
        await prisma.communityBoardCandidateVote.findMany({
          where: {
            boardCandidateId,
          },
        })
      ).length

      res.json({ alreadyVoted: false, votes })
    }
  ),
})
