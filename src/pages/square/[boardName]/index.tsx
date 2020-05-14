import { Button, FlatBlock } from '@/components/ui'
import { GetServerSideProps, NextPage } from 'next'

import $ from './style.module.scss'
import ApiHost from '@/modules/api-host'
import Body from '@/layouts/BaseLayout/Body'
import { GetBoardId } from '@payw/eodiro-one-api/api/one/scheme'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { oneAPIClient } from '@payw/eodiro-one-api'
import { pathIds } from '@/config/paths'
import { useAuth } from '@/pages/_app'
import { useRouter } from 'next/router'

// Import PostContainer dynamically (only client side rendering)
const PostContainer = dynamic(
  () => import('@/components/square/PostContainer'),
  { ssr: false }
)

export const getServerSideProps: GetServerSideProps<BoardPageProps> = async ({
  query,
}) => {
  const { err, data } = await oneAPIClient(ApiHost.getHost(), {
    action: 'getBoardId',
    data: {
      boardName: query.boardName as string,
    },
  })

  return {
    props: {
      err,
      boardId: data,
    },
  }
}

// Side
const SideContainer: React.FC<{ isSigned: boolean; boardName: string }> = ({
  isSigned,
  boardName,
}) => {
  return (
    <div className={$['side']}>
      {isSigned && (
        <Link
          href={`/square/[boardName]/${pathIds.writePost}`}
          as={`/square/${boardName}/${pathIds.writePost}`}
        >
          <a
            onClick={(): void => {
              sessionStorage.setItem('sbsp', window.scrollY?.toString())
            }}
          >
            <div className={$['new-btn-wrapper']}>
              <Button full label="새 포스트 작성" className={$['new-btn']} />
            </div>
          </a>
        </Link>
      )}
      <div className={$['more']}>
        <FlatBlock>
          <h3>다른 게시판</h3>
        </FlatBlock>
      </div>
    </div>
  )
}

type BoardPageProps = {
  boardId: number
  err: GetBoardId['payload']['err']
}
const BoardPage: NextPage<BoardPageProps> = ({ err, boardId }) => {
  const { isSigned } = useAuth()
  const router = useRouter()
  const boardName = router.query.boardName as string

  if (err) {
    return (
      <Body pageTitle="없는 게시판입니다." titleAlign="center" centered></Body>
    )
  } else {
    return (
      <Body
        pageTitle={boardName}
        bodyClassName={$['eodiro-board-page']}
        hideOnLoad
      >
        <div className={$['page-container']}>
          <SideContainer isSigned={isSigned} boardName={boardName} />
          <FlatBlock className={$['content']}>
            <PostContainer boardId={boardId} />
          </FlatBlock>
        </div>
      </Body>
    )
  }
}

export default BoardPage
