import BoardsList from '@/components/community/BoardsList'
import { LineInput } from '@/components/ui'
import { ArrowBlock } from '@/components/ui/ArrowBlock'
import { FloadingButton } from '@/components/ui/FloatingButton'
import { Icon } from '@/components/ui/Icon'
import { Flex } from '@/components/ui/layouts/Flex'
import { eodiroConsts } from '@/constants'
import { NOT_FOUND } from '@/constants/http-status-code'
import Body from '@/layouts/BaseLayout/Body'
import Grid from '@/layouts/Grid'
import EodiroDialog from '@/modules/client/eodiro-dialog'
import { eodiroRequest } from '@/modules/eodiro-request'
import { prisma } from '@/modules/prisma'
import { nextRequireAuthMiddleware } from '@/modules/server/ssr-middlewares/next-require-auth'
import { SafeCommunityBoard } from '@/types/schema'
import dayjs from 'dayjs'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import {
  ApiCommunityVoteBoardCandidateReqData,
  ApiCommunityVoteBoardCandidateResData,
} from '../api/community/vote-board-candidate'
import $ from './all-boards.module.scss'

type BoardCandidate = SafeCommunityBoard & { votes: number; isMine: boolean }

type BoardCandidateItemProps = {
  boardCandidate: BoardCandidate
}

function BoardCandidateItem({ boardCandidate }: BoardCandidateItemProps) {
  const [votes, setVotes] = useState(boardCandidate.votes)
  const [isProcessing, setIsProcessing] = useState(false)

  async function vote(boardCandidateId: number) {
    if (isProcessing) return

    setIsProcessing(true)

    try {
      const result = await eodiroRequest<
        ApiCommunityVoteBoardCandidateReqData,
        ApiCommunityVoteBoardCandidateResData
      >({
        method: 'post',
        url: '/api/community/vote-board-candidate',
        data: {
          boardCandidateId,
        },
      })

      if (result.alreadyVoted) {
        new EodiroDialog().alert('이미 투표했습니다.')
      }

      setVotes(result.votes)
    } catch (error) {
      if (error.response?.status === NOT_FOUND) {
        new EodiroDialog().alert('게시판이 삭제되었거나 없는 게시판입니다.')
      } else {
        console.error(error)
        new EodiroDialog().alert('문제가 발생했습니다.')
      }
    }

    setIsProcessing(false)
  }

  const remainingDays = dayjs(
    dayjs(boardCandidate.createdAt).add(7, 'day')
  ).diff(new Date(), 'day')

  const gaugePercent =
    (votes / eodiroConsts.BOARD_CANDIDATE_VOTES_THRESHOLD) * 100

  return (
    <ArrowBlock key={boardCandidate.id} flat>
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-xl">{boardCandidate.name}</h2>
          <button
            type="button"
            className="bg-gray-100 dark:bg-black text-eodiro-grass-2 font-medium px-3 py-2 ml-4 rounded-inner whitespace-nowrap"
            onClick={() => vote(boardCandidate.id)}
          >
            <Icon name="plus" className="mr-1" />
            투표하기
          </button>
        </div>

        {/* Board candidate description */}
        {boardCandidate.description && (
          <p className="text-base-gray mt-1">{boardCandidate.description}</p>
        )}

        {/* Votes gauge */}
        <div className="votes-bar relative rounded-full h-1 bg-base-white-blue dark:bg-black mt-5 overflow-hidden">
          <div
            className="gauge w-full h-full absolute right-full top-0 bg-eodiro-grass-2"
            style={{
              transform: `translateX(${gaugePercent}%)`,
            }}
          />
        </div>

        <div className="flex items-center justify-between mt-4">
          <span className="text-base text-eodiro-primary-color">
            {remainingDays}일 뒤 종료
          </span>
          <p className="text-right text-sm text-base-gray">
            {votes} / {eodiroConsts.BOARD_CANDIDATE_VOTES_THRESHOLD}
          </p>
        </div>

        {/* {boardCandidate.isMine && (
          <div className="delete flex justify-center mt-4">
            <button type="button" className="text-eodiro-primary-color">
              삭제
            </button>
          </div>
        )} */}
      </div>
    </ArrowBlock>
  )
}

type AllBoardsPageProps = {
  boards: (SafeCommunityBoard & { isPinned: boolean })[]
  boardCandidates: BoardCandidate[]
}

export default function AllBoardsPage({
  boards,
  boardCandidates,
}: AllBoardsPageProps) {
  const [filteredBoards, setFilteredBoards] = useState(boards)
  const [filteredboardCandidates, setFilteredboardCandidates] = useState(
    boardCandidates
  )

  function search(searchString: string) {
    setFilteredBoards(
      boards.filter((board) => board.name.includes(searchString))
    )
    setFilteredboardCandidates(
      boardCandidates.filter((candidateBoard) =>
        candidateBoard.name.includes(searchString)
      )
    )
  }

  return (
    <Body pageTitle="모든 게시판">
      <LineInput
        className="mb-8"
        type="search"
        onChangeThrottle={[search]}
        placeholder="게시판 이름으로 검색"
      />

      {filteredBoards.length > 0 && (
        <div className="boards mb-20">
          <BoardsList boards={filteredBoards} />
        </div>
      )}

      {filteredboardCandidates.length > 0 && (
        <div className="candidate-boards">
          <h1 className="font-semibold text-2xl ml-1">투표중인 게시판</h1>
          <p className="mx-1 mt-3 text-base-gray">
            매일 밤 12시에 투표수를 정산하여 기간 내에 30표가 넘으면 게시판이
            자동으로 활성화됩니다.
          </p>

          <Grid className="mt-5">
            {filteredboardCandidates.map((boardCandidate) => (
              <BoardCandidateItem
                key={boardCandidate.id}
                boardCandidate={boardCandidate}
              />
            ))}
          </Grid>
        </div>
      )}

      <Flex center className={$['new-board']}>
        <Link href="/community/new-board">
          <a>
            <FloadingButton>새 게시판 만들기</FloadingButton>
          </a>
        </Link>
      </Flex>
    </Body>
  )
}

export const getServerSideProps: GetServerSideProps<AllBoardsPageProps> = async ({
  req,
  res,
}) => {
  await nextRequireAuthMiddleware(req, res)

  const { user } = req

  // Fetch all boards
  const allBoards = await prisma.communityBoard.findMany({
    orderBy: [{ priority: 'desc' }, { name: 'asc' }],
  })

  const myPins = await prisma.communityBoardPin.findMany({
    where: { userId: user.id },
  })

  const boards = allBoards.map((board) => {
    const pinIndex = myPins.findIndex((pin) => pin.boardId === board.id)

    if (pinIndex !== -1) {
      myPins.splice(pinIndex, 1)

      return {
        ...board,
        isPinned: true,
      }
    }

    return {
      ...board,
      isPinned: false,
    }
  })

  const boardCandidates = await prisma.communityBoardCandidate.findMany({
    orderBy: [{ createdAt: 'asc' }],
    include: {
      communityBoardCandidateVotes: true,
    },
  })

  return {
    props: {
      boards,
      boardCandidates: boardCandidates
        .map((boardCandidate) => {
          const { communityBoardCandidateVotes, ...rest } = boardCandidate

          return {
            ...rest,
            votes: communityBoardCandidateVotes.length,
            isMine: boardCandidate.createdBy === user.id,
          }
        })
        .sort((a, b) => b.votes - a.votes),
    },
  }
}
