import BoardSideBar from '@/components/community/BoardSideBar'
import { PostsList } from '@/components/community/PostsList'
import { Spinner } from '@/components/global/Spinner'
import { withRequireAuth } from '@/components/hoc/with-require-auth'
import { ArrowBlock, LineInput } from '@/components/ui'
import { Flex } from '@/components/ui/layouts/Flex'
import Pagination from '@/components/ui/Pagination'
import Body from '@/layouts/BaseLayout/Body'
import ApiHost from '@/modules/api-host'
import { postEditorPageUrl } from '@/utils/page-urls'
import { ApiCommunityPostsListResData } from '@payw/eodiro-server-types/api/community/posts-list'
import { SafeCommunityPost } from '@payw/eodiro-server-types/types/schema'
import Link from 'next/link'
import { useRouter } from 'next/router'
import queryString from 'query-string'
import { useEffect, useState } from 'react'
import { Else, If, Then, When } from 'react-if'
import useSWR from 'swr'
import $ from './board-page.module.scss'

const BoardPosts: React.FC<{
  boardId: number
  page: number
}> = ({ boardId, page }) => {
  const router = useRouter()
  const [contains, setContains] = useState('')
  const [containsInput, setContainsInput] = useState('')
  const {
    data: postsListData,
    error: postsListError,
  } = useSWR<ApiCommunityPostsListResData>(
    queryString.stringifyUrl({
      url: ApiHost.resolve('/community/posts-list'),
      query: {
        boardId,
        page,
        contains,
      },
    })
  )

  useEffect(() => {
    if (router.query.contains !== undefined) {
      const containsQuery = router.query.contains as string
      setContainsInput(containsQuery)
      setContains(containsQuery)
    }
  }, [router.query.contains])

  return (
    <>
      <LineInput
        type="search"
        className="mb-4"
        placeholder="게시물 검색"
        value={containsInput}
        setValue={setContainsInput}
        onChangeThrottle={[
          (value) => {
            const urlAndQuery = queryString.parseUrl(window.location.href)
            router.replace(
              queryString.stringifyUrl({
                url: urlAndQuery.url,
                query: { ...urlAndQuery.query, contains: value },
              })
            )
          },
        ]}
      />
      <ArrowBlock flat className={$['posts-container']}>
        <If condition={postsListError !== undefined}>
          <Then>
            <div>불러올 수 없습니다.</div>
          </Then>
          <Else>
            <If condition={postsListData !== undefined}>
              <Then>
                <PostsList
                  posts={postsListData?.posts as SafeCommunityPost[]}
                />
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
