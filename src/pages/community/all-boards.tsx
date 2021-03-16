import BoardsList from '@/components/community/BoardsList'
import ServerError from '@/components/global/ServerError'
import { Spinner } from '@/components/global/Spinner'
import { withRequireAuth } from '@/components/hoc/with-require-auth'
import { LineInput } from '@/components/ui'
import { ArrowBlock } from '@/components/ui/ArrowBlock'
import { FloatingButton } from '@/components/ui/FloatingButton'
import { Icon } from '@/components/ui/Icon'
import { Flex } from '@/components/ui/layouts/Flex'
import Grid from '@/components/ui/layouts/Grid'
import { eodiroConst } from '@/constants'
import { NOT_FOUND } from '@/constants/http-status-code'
import Body from '@/layouts/BaseLayout/Body'
import ApiHost from '@/modules/api-host'
import EodiroDialog from '@/modules/client/eodiro-dialog'
import { eodiroRequest } from '@/modules/eodiro-request'
import { Unpacked } from '@/types/unpacked'
import {
  ApiCommunityAllBoardCandidatesResData,
  ApiCommunityAllBoardsResData,
} from '@payw/eodiro-server-types/api/community/all-boards'
import {
  ApiCommunityVoteBoardCandidateReqBody,
  ApiCommunityVoteBoardCandidateResData,
} from '@payw/eodiro-server-types/api/community/vote-board-candidate'
import dayjs from 'dayjs'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import $ from './all-boards.module.scss'

type BoardCandidateItemProps = {
  boardCandidate: Unpacked<ApiCommunityAllBoardCandidatesResData>
}

function BoardCandidateItem({ boardCandidate }: BoardCandidateItemProps) {
  const [votes, setVotes] = useState(boardCandidate.votesCount)
  const [isProcessing, setIsProcessing] = useState(false)

  async function vote(boardCandidateId: number) {
    if (isProcessing) return

    setIsProcessing(true)

    try {
      const result = await eodiroRequest<
        ApiCommunityVoteBoardCandidateReqBody,
        ApiCommunityVoteBoardCandidateResData
      >({
        method: 'post',
        url: ApiHost.resolve('/community/vote-board-candidate'),
        data: {
          boardCandidateId,
        },
      })

      if (result.alreadyVoted) {
        new EodiroDialog().alert('이미 투표했습니다.')
      }

      setVotes(result.votesCount)
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
    (votes / eodiroConst.BOARD_CANDIDATE_VOTES_THRESHOLD) * 100

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
            {votes} / {eodiroConst.BOARD_CANDIDATE_VOTES_THRESHOLD}
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

function AllBoardsPage() {
  const [
    filteredBoards,
    setFilteredBoards,
  ] = useState<ApiCommunityAllBoardsResData>()
  const [
    filteredBoardCandidates,
    setFilteredBoardCandidates,
  ] = useState<ApiCommunityAllBoardCandidatesResData>()

  const {
    data: allBoards,
    error: allBoardsError,
    mutate: setAllBoards,
  } = useSWR<ApiCommunityAllBoardsResData>(
    ApiHost.resolve('/community/all-boards')
  )
  const {
    data: allBoardCandidates,
    error: allBoardCandidatesError,
    mutate: setBoardCandidates,
  } = useSWR<ApiCommunityAllBoardCandidatesResData>(
    ApiHost.resolve('/community/all-board-candidates')
  )

  useEffect(() => {
    if (allBoards) {
      setFilteredBoards(allBoards)
    }
  }, [allBoards])

  useEffect(() => {
    if (allBoardCandidates) {
      setFilteredBoardCandidates(allBoardCandidates)
    }
  }, [allBoardCandidates])

  function search(searchString: string) {
    setAllBoards((prevAllBoards) => {
      if (prevAllBoards) {
        setFilteredBoards(
          prevAllBoards.filter((board) => board.name.includes(searchString))
        )
      }

      return prevAllBoards
    })

    setBoardCandidates((prevBoardsCandidates) => {
      if (prevBoardsCandidates) {
        setFilteredBoardCandidates(
          prevBoardsCandidates.filter((board) =>
            board.name.includes(searchString)
          )
        )
      }

      return prevBoardsCandidates
    })
  }

  return (
    <Body pageTitle="모든 게시판">
      <LineInput
        className="mb-8"
        type="search"
        onChangeThrottle={[search]}
        placeholder="게시판 이름으로 검색"
      />

      {allBoardsError !== undefined ? (
        <ServerError />
      ) : filteredBoards !== undefined ? (
        filteredBoards.length > 0 && (
          <div className="boards mb-20">
            <BoardsList
              boards={filteredBoards as ApiCommunityAllBoardsResData}
            />
          </div>
        )
      ) : (
        <div className="flex justify-center">
          <Spinner />
        </div>
      )}

      {allBoardCandidatesError !== undefined ? (
        <ServerError />
      ) : filteredBoardCandidates !== undefined ? (
        <div className="candidate-boards">
          <h1 className="font-semibold text-2xl ml-1">투표중인 게시판</h1>
          <p className="mx-1 mt-3 text-base-gray">
            매일 밤 12시에 투표수를 정산하여 기간 내에 30표가 넘으면 게시판이
            자동으로 활성화됩니다.
          </p>

          {filteredBoardCandidates.length > 0 ? (
            <Grid className="mt-5">
              {(filteredBoardCandidates as ApiCommunityAllBoardCandidatesResData).map(
                (boardCandidate) => (
                  <BoardCandidateItem
                    key={boardCandidate.id}
                    boardCandidate={boardCandidate}
                  />
                )
              )}
            </Grid>
          ) : (
            <ArrowBlock flat className="mt-4">
              투표중인 게시판이 없습니다.
            </ArrowBlock>
          )}
        </div>
      ) : (
        <div className="flex justify-center">
          <Spinner />
        </div>
      )}

      <Flex center className={$['new-board']}>
        <Link href="/community/new-board">
          <a>
            <FloatingButton>새 게시판 만들기</FloatingButton>
          </a>
        </Link>
      </Flex>
    </Body>
  )
}

export default withRequireAuth(AllBoardsPage)
