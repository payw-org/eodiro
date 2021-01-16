import BoardsList from '@/components/community/BoardsList'
import { LineInput } from '@/components/ui'
import { FloadingButton } from '@/components/ui/FloatingButton'
import { Flex } from '@/components/ui/layouts/Flex'
import Body from '@/layouts/BaseLayout/Body'
import { prisma } from '@/modules/prisma'
import { nextRequireAuthMiddleware } from '@/modules/server/ssr-middlewares/next-require-auth'
import { SafeCommunityBoard } from '@/types/schema'
import { GetServerSideProps } from 'next'
import { useState } from 'react'
import $ from './all-boards.module.scss'

type AllBoardsPageProps = {
  boards: (SafeCommunityBoard & { isPinned: boolean })[]
}

export default function AllBoardsPage({ boards }: AllBoardsPageProps) {
  const [filteredBoards, setFilteredBoards] = useState(boards)

  function search(searchString: string) {
    setFilteredBoards(
      boards.filter((board) => board.name.includes(searchString))
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
      <BoardsList boards={filteredBoards} />
      <Flex center className={$['new-board']}>
        <FloadingButton>새 게시판 만들기</FloadingButton>
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

  return { props: { boards } }
}
