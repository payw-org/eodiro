import $ from './style.module.scss'
import ApiHost from '@/modules/api-host'
import Body from '@/layouts/BaseLayout/Body'
import EodiroLink from '@/components/utils/EodiroLink'
import { EodiroPage } from '../_app'
import { FlatBlock } from '@/components/ui'
import { GetPostsOfBoard } from '@payw/eodiro-one-api/api/one/scheme'
import { GetServerSideProps } from 'next'
import { OneApiPayloadData } from '@payw/eodiro-one-api/api/one/types'
import classNames from 'classnames'
import { oneApiClient } from '@payw/eodiro-one-api'

export const getServerSideProps: GetServerSideProps<SquareMainPageProps> = async () => {
  // Fetch 자유 게시판 data
  const { data: freeBoardPosts } = await oneApiClient(ApiHost.getHost(), {
    action: 'getPostsOfBoard',
    data: {
      boardId: 1, // 자유 게시판
      amount: 15,
      noBody: true,
      columns: ['id', 'title', 'random_nickname', 'uploaded_at'],
    },
  })

  // 취업 후기
  // const empReviews = await oneApiClient(ApiHost.getHost(), {
  //   action: 'getPostsOfBoard',
  //   data: {
  //     boardId: 3,
  //   },
  // })

  return {
    props: {
      freeBoardPosts,
    },
  }
}

type SquareMainPageProps = {
  freeBoardPosts: OneApiPayloadData<GetPostsOfBoard>
}
const SquareMainPage: EodiroPage<SquareMainPageProps> = (props) => {
  return (
    <>
      <Body pageTitle="빼빼로 광장" bodyClassName={$['eodiro-square-main']}>
        <FlatBlock className={$['board']}>
          <h1 className={classNames($['board-name'], 'position-relative')}>
            자유 게시판
            <EodiroLink
              href="/square/[boardName]"
              as="/square/자유 게시판"
              absolute
            />
          </h1>

          <div>
            {props.freeBoardPosts &&
              props.freeBoardPosts.map((globalPost) => {
                return (
                  <EodiroLink
                    key={globalPost.id}
                    href="/square/[boardName]/[postId]"
                    as={`/square/자유 게시판/${globalPost.id}`}
                    className={classNames($['post-item'], 'display-flex')}
                  >
                    <div className="display-flex align-items-center">
                      <span className={classNames($['title'], 'display-block')}>
                        {globalPost.title}
                      </span>
                      {globalPost.comment_count > 0 && (
                        <span
                          className={classNames(
                            $['comments-count'],
                            'line-height-1'
                          )}
                        >
                          {globalPost.comment_count}
                        </span>
                      )}
                    </div>
                  </EodiroLink>
                )
              })}
          </div>
        </FlatBlock>
      </Body>
    </>
  )
}

export default SquareMainPage
