import { PostsList } from '@/components/community/PostsList'
import Information from '@/components/global/Information'
import { ArrowBlock } from '@/components/ui'
import { Flex } from '@/components/ui/layouts/Flex'
import Pagination from '@/components/ui/Pagination'
import Body from '@/layouts/BaseLayout/Body'
import { prisma } from '@/modules/prisma'
import { nextRequireAuthMiddleware } from '@/modules/server/ssr-middlewares/next-require-auth'
import {
  apiCommunityBoard,
  ApiCommunityBoardResData,
  apiCommunityBoardUrl,
} from '@/pages/api/community/board'
import { communityBoardPageUrl, postEditorPageUrl } from '@/utils/page-urls'
import { CommunityBoard } from '@prisma/client'
import classNames from 'classnames'
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
      {data.board.communityPosts.length > 0 ? (
        <PostsList posts={data.board.communityPosts} />
      ) : (
        <Flex center column>
          <span className={$['no-posts-icon']}>
            <i className="f7-icons">bin_xmark</i>
          </span>
          <p className={$['no-posts-label']}>아직 포스트가 없습니다.</p>
        </Flex>
      )}
    </ArrowBlock>
  )
}

type BoardPageProps = {
  boardsList: Pick<CommunityBoard, 'id' | 'name'>[]
  boardInformation: ApiCommunityBoardResData
}

const BoardPage: NextPage<BoardPageProps> = ({
  boardsList,
  boardInformation,
}) => {
  const router = useRouter()
  const { board, page, totalPage } = boardInformation
  const boardId = board?.id

  return (
    <Body pageTitle={board?.name ?? '없는 게시판'} titleAlign="center">
      {!board ? (
        <Information title="다른 게시판을 이용해주세요." />
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
            </div>

            <div className={$['sidebar']}>
              <ArrowBlock className={$['boards-list']} flat>
                <h2 className={$['boards-list-header']}>다른 게시판</h2>
                {boardsList.map((boardInfo) => (
                  <Link
                    href={communityBoardPageUrl(boardInfo.id)}
                    key={boardInfo.id}
                  >
                    <div
                      className={classNames($['boards-list-item'], {
                        [$['current']]: boardInfo.id === boardId,
                      })}
                    >
                      {boardInfo.name}
                    </div>
                  </Link>
                ))}
              </ArrowBlock>
            </div>
          </div>
          <Flex className={$['new-post-btn-wrapper']}>
            <Link href={postEditorPageUrl(board.id)}>
              <a>
                <button type="button" className={$['new-post-btn']}>
                  <i className="f7-icons">square_pencil</i>새 포스트 작성
                </button>
              </a>
            </Link>
          </Flex>
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
  const boardInformation = await apiCommunityBoard({
    boardId: Number(params?.boardId),
    page: query.page ? Math.max(Number(query.page), 1) : 1,
    userId: user.id,
  })

  const boardsList = await prisma.communityBoard.findMany({
    orderBy: [{ priority: 'desc' }, { activeAt: 'desc' }],
    select: { id: true, name: true },
  })

  return {
    props: {
      boardsList,
      boardInformation,
    },
  }
}
