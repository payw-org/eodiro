import './style.scss'

import ApiHost from '@/modules/api-host'
import Body from '@/layouts/BaseLayout/Body'
import { EodiroPage } from '../_app'
import { FlatBlock } from '@/components/ui'
import { GetPostsOfBoard } from '@payw/eodiro-one-api/api/one/scheme'
import { GetServerSideProps } from 'next'
import { OneApiPayloadData } from '@payw/eodiro-one-api/api/one/scheme/types/utils'
import { oneAPIClient } from '@payw/eodiro-one-api'

type SquareMainPageProps = {
  freeBoardPosts: OneApiPayloadData<GetPostsOfBoard>
}
const SquareMainPage: EodiroPage<SquareMainPageProps> = (props) => {
  return (
    <>
      <Body pageTitle="빼빼로 광장" bodyClassName="eodiro-square-main">
        <FlatBlock className="board">
          <h1 className="board-name position-relative">
            자유 게시판
            <a href="/square/자유 게시판" className="abs-link" />
          </h1>

          <div>
            {props.freeBoardPosts &&
              props.freeBoardPosts.map((globalPost) => {
                return (
                  <a
                    href={`/square/자유 게시판/${globalPost.id}`}
                    className="post-item display-flex"
                    key={globalPost.id}
                  >
                    <div className="display-flex align-items-center">
                      <span className="title display-block">
                        {globalPost.title}
                      </span>
                      {globalPost.comment_count > 0 && (
                        <span className="comments-count line-height-1">
                          {globalPost.comment_count}
                        </span>
                      )}
                    </div>
                  </a>
                )
              })}
          </div>
        </FlatBlock>
      </Body>
    </>
  )
}

export default SquareMainPage

export const getServerSideProps: GetServerSideProps<SquareMainPageProps> = async () => {
  // Fetch 자유 게시판 data
  const { data: freeBoardPosts } = await oneAPIClient(ApiHost.getHost(), {
    action: 'getPostsOfBoard',
    data: {
      boardId: 1, // 자유 게시판
      amount: 15,
      noBody: true,
      columns: ['id', 'title', 'random_nickname', 'uploaded_at'],
    },
  })

  // 취업 후기
  const empReviews = await oneAPIClient(ApiHost.getHost(), {
    action: 'getPostsOfBoard',
    data: {
      boardId: 3,
    },
  })

  return {
    props: {
      freeBoardPosts,
    },
  }
}
