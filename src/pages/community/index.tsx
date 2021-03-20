import BoardsList from '@/components/community/BoardsList'
import ServerError from '@/components/global/ServerError'
import { Spinner } from '@/components/global/Spinner'
import { withRequireAuth } from '@/components/hoc/with-require-auth'
import { ArrowBlock } from '@/components/ui'
import { Icon } from '@/components/ui/Icon'
import { Flex } from '@/components/ui/layouts/Flex'
import Grid from '@/components/ui/layouts/Grid'
import Body from '@/layouts/BaseLayout/Body'
import ApiHost from '@/modules/api-host'
import { ApiCommunityPinnedBoardsResData } from '@payw/eodiro-server-types/api/community/pinned-boards'
import { ApiCommunityRecentBoardsResData } from '@payw/eodiro-server-types/api/community/recent-boards'
import Link from 'next/link'
import { ReactNode } from 'react'
import useSWR from 'swr'
import $ from './community-home.module.scss'

function CommunityHomepage() {
  const {
    data: pinnedBoards,
    error: pinnedBoardsError,
    mutate: updatePinnedBoards,
  } = useSWR<ApiCommunityPinnedBoardsResData>(
    ApiHost.resolve('/community/pinned-boards')
  )
  const {
    data: recentBoards,
    error: recentBoardsError,
    mutate: updateRecentBoards,
  } = useSWR<ApiCommunityRecentBoardsResData>(
    ApiHost.resolve('/community/recent-boards?excludePins=true')
  )

  function refresh() {
    updatePinnedBoards()
    updateRecentBoards()
  }

  function SubHead({ children }: { children: ReactNode }) {
    return <h1 className="text-2xl font-semibold ml-1 mb-4">{children}</h1>
  }

  return (
    <Body pageTitle="커뮤니티" bodyClassName={$['community-page']}>
      <section className="popular-posts mb-10">
        <Grid>
          <Link href="/community/popular">
            <a>
              <ArrowBlock>
                <h2 className="text-xl">
                  <Icon
                    name="flame_fill"
                    className="text-eodiro-primary-color mr-2"
                  />
                  인기 글
                </h2>
              </ArrowBlock>
            </a>
          </Link>
        </Grid>
      </section>

      <section className={$['community-home-section']}>
        <SubHead>고정됨</SubHead>
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
        <SubHead>최근 게시판</SubHead>
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

export default withRequireAuth(CommunityHomepage)
