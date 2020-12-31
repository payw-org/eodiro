import { PostsList } from '@/components/community/PostsList'
import { ArrowBlock } from '@/components/ui'
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
          <PostsList boardId={board.id} posts={board.communityPosts} />
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
