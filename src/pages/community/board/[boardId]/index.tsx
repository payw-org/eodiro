import Information from '@/components/global/Information'
import { ArrowBlock } from '@/components/ui'
import Pagination from '@/components/ui/Pagination'
import FriendlyTime from '@/components/utils/FriendlyTime'
import Body from '@/layouts/BaseLayout/Body'
import { nextRequireAuthMiddleware } from '@/modules/server/ssr-middlewares/next-require-auth'
import {
  apiCommunityBoard,
  ApiCommunityBoardResData,
  apiCommunityBoardUrl,
} from '@/pages/api/community/board'
import { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import $ from './board.module.scss'
import { postPageUrl } from './post/[postId]'

const PostsPage: React.FC<{
  totalPage: ApiCommunityBoardResData['totalPage']
  page: ApiCommunityBoardResData['page']
  board: Exclude<ApiCommunityBoardResData['board'], null>
}> = (initialData) => {
  const { board, page } = initialData

  const { data } = useSWR(apiCommunityBoardUrl({ boardId: board.id, page }), {
    initialData,
  })

  return (
    // <div className={$['']}>
    <ArrowBlock flat className={$['posts-container']}>
      {data?.board?.communityPosts.map((post) => (
        <Link href={postPageUrl(board.id, post.id)} key={post.id}>
          <a>
            <div key={post.id} className={$['post-item']}>
              <p className={$['post-title']}>{post.title}</p>
              <FriendlyTime time={post.postedAt} className={$['post-time']} />
            </div>
          </a>
        </Link>
      ))}
    </ArrowBlock>
    // </div>
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
