import BoardsList from '@/components/community/BoardsList'
import ServerError from '@/components/global/ServerError'
import { Spinner } from '@/components/global/Spinner'
import { Icon } from '@/components/ui/Icon'
import { Flex } from '@/components/ui/layouts/Flex'
import Body from '@/layouts/BaseLayout/Body'
import { nextRequireAuthMiddleware } from '@/modules/server/ssr-middlewares/next-require-auth'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import useSWR from 'swr'
import { ApiGetPinnedBoardsResData } from '../api/community/get-pinned-boards'
import { ApiGetRecentBoardsResData } from '../api/community/get-recent-boards'
import $ from './community-home.module.scss'

export default function CommunityHomepage() {
  const {
    data: pinnedBoards,
    error: pinnedBoardsError,
    mutate: updatePinnedBoards,
  } = useSWR<ApiGetPinnedBoardsResData>('/api/community/get-pinned-boards')
  const {
    data: recentBoards,
    error: recentBoardsError,
    mutate: updateRecentBoards,
  } = useSWR<ApiGetRecentBoardsResData>('/api/community/get-recent-boards')

  function refresh() {
    updatePinnedBoards()
    updateRecentBoards()
  }

  return (
    <Body pageTitle="커뮤니티" bodyClassName={$['community-page']}>
      <section className={$['community-home-section']}>
        <h1 className={$['subhead']}>고정됨</h1>
        {pinnedBoards ? (
          pinnedBoards.length > 0 ? (
            <BoardsList
              boards={pinnedBoards.map((board) => ({
                ...board,
                isPinned: true,
              }))}
              onUpdatePin={refresh}
            />
          ) : (
            <div className={$['no-pins-yet']}>
              <Icon name="pin" className={$['pin-icon']} />을 눌러 자주 이용하는
              게시판을 고정할 수 있습니다.
            </div>
          )
        ) : pinnedBoardsError ? (
          <ServerError />
        ) : (
          <Flex center>
            <Spinner />
          </Flex>
        )}
      </section>
      <section className={$['community-home-section']}>
        <h1 className={$['subhead']}>최근 게시판</h1>
        {recentBoards ? (
          recentBoards.length > 0 ? (
            <BoardsList
              boards={recentBoards.map((board) => ({
                ...board,
                isPinned: false,
              }))}
              onUpdatePin={refresh}
            />
          ) : (
            <div className={$['no-pins-yet']}>최근 게시판이 없습니다.</div>
          )
        ) : recentBoardsError ? (
          <ServerError />
        ) : (
          <Flex center>
            <Spinner />
          </Flex>
        )}

        <Flex className={$['see-all-boards']}>
          <Link href="/community/all-boards">
            <a className="default">
              모든 게시판 보기 <Icon name="chevron_right" />
            </a>
          </Link>
        </Flex>
      </section>
    </Body>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  await nextRequireAuthMiddleware(req, res)

  return { props: {} }
}
