import BoardSideBar from '@/components/community/BoardSideBar'
import { PostsList } from '@/components/community/PostsList'
import { Spinner } from '@/components/global/Spinner'
import { withRequireAuth } from '@/components/hoc/with-require-auth'
import { ArrowBlock } from '@/components/ui'
import { Flex } from '@/components/ui/layouts/Flex'
import Pagination from '@/components/ui/Pagination'
import Body from '@/layouts/BaseLayout/Body'
import ApiHost from '@/modules/api-host'
import { postEditorPageUrl } from '@/utils/page-urls'
import { ApiCommunityPostsListResData } from '@payw/eodiro-server-types/api/community/posts-list'
import { CommunityPostsList } from '@payw/eodiro-server-types/types/schema'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Else, If, Then, When } from 'react-if'
import useSWR from 'swr'
import $ from './board-page.module.scss'

const BoardPosts: React.FC<{
  boardId: number
  page: number
}> = ({ boardId, page }) => {
  const router = useRouter()
  const {
    data: postsListData,
    error: postsListError,
  } = useSWR<ApiCommunityPostsListResData>(
    ApiHost.resolve(`/community/posts-list?boardId=${boardId}&page=${page}`)
  )

  return (
    <>
      <ArrowBlock flat className={$['posts-container']}>
        <If condition={postsListError !== undefined}>
          <Then>
            <div>불러올 수 없습니다.</div>
          </Then>
          <Else>
            <If condition={postsListData !== undefined}>
              <Then>
                <PostsList posts={postsListData?.posts as CommunityPostsList} />
              </Then>
              <Else>
                <div className="flex justify-center">
                  <Spinner />
                </div>
              </Else>
            </If>
          </Else>
        </If>
      </ArrowBlock>
      <When condition={postsListData !== undefined}>
        <Pagination
          totalPage={postsListData?.totalPage as number}
          currentPage={postsListData?.page as number}
          onPressPage={(pressedPage) => {
            router.push({
              pathname: '/community/board/[boardId]',
              query: {
                boardId,
                page: pressedPage,
              },
            })
          }}
        />
      </When>
    </>
  )
}

function BoardPage() {
  const router = useRouter()
  const boardId = parseInt(router.query.boardId as string, 10) || 0
  const page = parseInt(router.query.page as string, 10) || 1
  const { data: boardNameData, error: boardNameError } = useSWR<{
    boardName: string
  }>(ApiHost.resolve(`/community/board-name?boardId=${boardId}`))

  const pageTitle = boardNameError
    ? '없는 게시판'
    : (router.query.boardName as string) ?? boardNameData?.boardName ?? ''

  return (
    <Body pageTitle={pageTitle}>
      <div className={$['board-page']}>
        <div className={$['column-posts']}>
          <BoardPosts boardId={boardId} page={page} />
          <div style={{ display: 'none' }}>
            <BoardPosts boardId={boardId} page={page + 1} />
          </div>

          <Flex className={$['new-post-btn-wrapper']}>
            <Link href={postEditorPageUrl(boardId)}>
              <a>
                <button type="button" className={$['new-post-btn']}>
                  <i className="f7-icons">square_pencil</i>게시물 작성
                </button>
              </a>
            </Link>
          </Flex>
        </div>

        <BoardSideBar />
      </div>
    </Body>
  )
}

export default withRequireAuth(BoardPage)
