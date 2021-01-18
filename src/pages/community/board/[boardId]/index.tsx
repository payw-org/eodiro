import BoardSideBar from '@/components/community/BoardSideBar'
import { PostsList } from '@/components/community/PostsList'
import Information from '@/components/global/Information'
import { ArrowBlock } from '@/components/ui'
import { Flex } from '@/components/ui/layouts/Flex'
import Pagination from '@/components/ui/Pagination'
import Body from '@/layouts/BaseLayout/Body'
import { nextRequireAuthMiddleware } from '@/modules/server/ssr-middlewares/next-require-auth'
import {
  apiCommunityBoard,
  ApiCommunityBoardResData,
  apiCommunityBoardUrl,
} from '@/pages/api/community/board'
import { postEditorPageUrl } from '@/utils/page-urls'
import { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import $ from './board-page.module.scss'

const BoardPosts: React.FC<{
  totalPage: ApiCommunityBoardResData['totalPage']
  page: ApiCommunityBoardResData['page']
  board: Exclude<ApiCommunityBoardResData['board'], null>
}> = (initialData) => {
  const { board, page } = initialData

  const { data } = useSWR(apiCommunityBoardUrl({ boardId: board.id, page }), {
    initialData,
  })

  if (!data) return null

  return (
    <ArrowBlock flat className={$['posts-container']}>
      <PostsList posts={data.board.communityPosts} />
    </ArrowBlock>
  )
}

type BoardPageProps = {
  boardInformation: ApiCommunityBoardResData
}

const BoardPage: NextPage<BoardPageProps> = ({ boardInformation }) => {
  const router = useRouter()
  const { board, page, totalPage } = boardInformation
  const boardId = board?.id

  return (
    <Body pageTitle={board?.name ?? '없는 게시판'}>
      {!board ? (
        <Information title="게시판이 삭제되었거나 잘못된 접근입니다. 커뮤니티 홈에서 게시판을 이용해주세요." />
      ) : (
        <>
          <div className={$['board-page']}>
            <div className={$['column-posts']}>
              <BoardPosts board={board} totalPage={totalPage} page={page} />
              <div style={{ display: 'none' }}>
                <BoardPosts
                  board={board}
                  totalPage={totalPage}
                  page={page + 1}
                />
              </div>
              <Pagination
                totalPage={totalPage ?? 0}
                currentPage={page ?? 0}
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

              <Flex className={$['new-post-btn-wrapper']}>
                <Link href={postEditorPageUrl(board.id)}>
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
        </>
      )}
    </Body>
  )
}

export default BoardPage

export const getServerSideProps: GetServerSideProps<BoardPageProps> = async ({
  req,
  res,
  query,
  params,
}) => {
  await nextRequireAuthMiddleware(req, res)

  const { user } = req

  const boardIdParam = globalThis.isNaN(parseInt(params?.boardId as string, 10))
    ? params?.boardId
    : parseInt(params?.boardId as string, 10)

  let boardId = 0

  if (typeof boardIdParam === 'number') {
    boardId = boardIdParam
  }

  const boardInformation = await apiCommunityBoard({
    boardId,
    page: query.page ? Math.max(Number(query.page), 1) : 1,
    userId: user.id,
  })

  return {
    props: {
      boardInformation,
    },
  }
}
