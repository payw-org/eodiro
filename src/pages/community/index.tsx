import { ArrowBlock } from '@/components/ui'
import FriendlyTime from '@/components/utils/FriendlyTime'
import { IfExists } from '@/components/utils/IfExists'
import Body from '@/layouts/BaseLayout/Body'
import Grid from '@/layouts/Grid'
import { nextRequireAuthMiddleware } from '@/modules/server/ssr-middlewares/next-require-auth'
import { Unpacked } from '@/types/unpacked'
import { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import useSWR from 'swr'
import {
  apiCommunityHome,
  ApiCommunityHomeResData,
  apiCommunityHomeUrl,
} from '../api/community/home'
import { postPageUrl } from './board/[boardId]/post/[postId]'
import $ from './community.module.scss'

const BoardSection: React.FC<{
  board: Unpacked<ApiCommunityHomeResData>
}> = ({ board }) => {
  return (
    <ArrowBlock flat noArrow className={$['board-section']}>
      <div className={$['board-header']}>
        <h1 className={$['board-name']}>{board.name}</h1>
        <Link href={`/community/board/${board.id}?page=1`}>
          <a>
            <span className={$['board-more']}>
              더보기 <i className="f7-icons">chevron_right</i>
            </span>
          </a>
        </Link>
      </div>
      <div className={$['posts-container']}>
        {board.communityPosts.length > 0 ? (
          board.communityPosts.map((post) => (
            <Link href={postPageUrl(board.id, post.id)} key={post.id}>
              <a>
                <div className={$['post-item']}>
                  <h2 className={$['post-title']}>{post.title}</h2>
                  <FriendlyTime
                    time={post.postedAt}
                    className={$['post-time']}
                  />
                </div>
              </a>
            </Link>
          ))
        ) : (
          <div className={$['no-post-yet']}>아직 포스트가 없습니다.</div>
        )}
      </div>
    </ArrowBlock>
  )
}

type CommunityHomePageProps = {
  boards: ApiCommunityHomeResData
}

const Page: NextPage<CommunityHomePageProps> = ({ boards }) => {
  const { data, error } = useSWR(apiCommunityHomeUrl, { initialData: boards })

  return (
    <Body
      pageTitle="커뮤니티"
      bodyClassName={$['community-page']}
      titleAlign="center"
    >
      <IfExists data={data} error={error}>
        <Grid proportion="extraLarge">
          {boards.map((board) => (
            <BoardSection board={board} key={board.id} />
          ))}
        </Grid>
      </IfExists>
    </Body>
  )
}

export default Page

export const getServerSideProps: GetServerSideProps<CommunityHomePageProps> = async ({
  req,
  res,
}) => {
  await nextRequireAuthMiddleware(req, res)

  const boards = await apiCommunityHome()

  return { props: { boards } }
}
