import { eodiroConst } from '@/constants'
import { prisma } from '@/modules/prisma'
import dayjs from 'dayjs'

async function run() {
  const boardCandidates = await prisma.communityBoardCandidate.findMany({
    include: {
      communityBoardCandidateVotes: true,
    },
  })

  const transactions: Promise<any>[] = []

  boardCandidates.forEach((candidate) => {
    const remainingDays = dayjs(dayjs(candidate.createdAt).add(7, 'day')).diff(
      new Date(),
      'day'
    )

    if (
      remainingDays >= 0 &&
      candidate.communityBoardCandidateVotes.length >=
        eodiroConst.BOARD_CANDIDATE_VOTES_THRESHOLD
    ) {
      // Over threshold votes

      const deleteVotes = prisma.communityBoardCandidateVote.deleteMany({
        where: {
          boardCandidateId: candidate.id,
        },
      })

      const deleteCandidate = prisma.communityBoardCandidate.delete({
        where: { id: candidate.id },
      })

      const createBoard = prisma.communityBoard.create({
        data: {
          name: candidate.name,
          description: candidate.description,
          createdAt: candidate.createdAt,
          user: {
            connect: { id: candidate.createdBy },
          },
        },
      })

      const transaction = prisma.$transaction([
        deleteVotes,
        deleteCandidate,
        createBoard,
      ])

      transactions.push(transaction)

      console.info(
        `Move the board candidate '${candidate.name}' to community boards list.`
      )
    } else if (remainingDays <= 0) {
      // Delete outdated candidate

      const deleteVotes = prisma.communityBoardCandidateVote.deleteMany({
        where: {
          boardCandidateId: candidate.id,
        },
      })

      const deleteCandidate = prisma.communityBoardCandidate.delete({
        where: { id: candidate.id },
      })

      const transaction = prisma.$transaction([deleteVotes, deleteCandidate])

      transactions.push(transaction)

      console.info(`Delete an outdated board candidate '${candidate.name}'.`)
    }
  })

  await Promise.all(transactions)

  process.exit()
}

run()
