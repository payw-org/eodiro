import { PostsList } from '@/components/community/PostsList'
import Information from '@/components/global/Information'
import { ArrowBlock } from '@/components/ui'
import Pagination from '@/components/ui/Pagination'
import Body from '@/layouts/BaseLayout/Body'
import { nextRequireAuthMiddleware } from '@/modules/server/ssr-middlewares/next-require-auth'
import {
  apiCommunityBoard,
  ApiCommunityBoardResData,
  apiCommunityBoardUrl,
} from '@/pages/api/community/board'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import $ from './board.module.scss'

const PostsPage: React.FC<{
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
      <PostsList boardId={board.id} posts={data.board.communityPosts} />
    </ArrowBlock>
  )
}

const BoardPage: NextPage<ApiCommunityBoardResData> = (initialData) => {
  const router = useRouter()
  const { board, page, totalPage } = initialData
  const boardId = board?.id

  return (
    <Body pageTitle={board?.name ?? '없는 게시판'}>
      {!board ? (
        <Information title="다른 게시판을 이용해주세요." />
      ) : (
        <>
          <PostsPage board={board} totalPage={totalPage} page={page} />
          <div style={{ display: 'none' }}>
            <PostsPage board={board} totalPage={totalPage} page={page + 1} />
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
        </>
      )}
    </Body>
  )
}

export default BoardPage

export const getServerSideProps: GetServerSideProps<ApiCommunityBoardResData> = async ({
  req,
  res,
  query,
  params,
}) => {
  await nextRequireAuthMiddleware(req, res)

  const data = await apiCommunityBoard({
    boardId: Number(params?.boardId),
    page: query.page ? Number(query.page) : 1,
  })
  return {
    props: data,
  }
}
