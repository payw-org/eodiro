import { ArrowBlock, Button, FlatBlock } from '@/components/ui'
import { AuthApi, Tokens, UserInfo } from '@/api'
import { GetServerSideProps, NextPage } from 'next'

import $ from './style.module.scss'
import ApiHost from '@/modules/api-host'
import Body from '@/layouts/BaseLayout/Body'
import EodiroLink from '@/components/utils/EodiroLink'
import FriendlyTime from '@/components/utils/FriendlyTime'
import { GetMyPosts } from '@payw/eodiro-one-api/api/one/scheme'
import Grid from '@/layouts/Grid'
import { OneApiPayload } from '@payw/eodiro-one-api/api/one/scheme/types/utils'
import { Unpacked } from '@/types/unpacked'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { oneAPIClient } from '@payw/eodiro-one-api'
import { redirect } from '@/modules/server/redirect'

type PostItemProps = {
  postData: Unpacked<OneApiPayload<GetMyPosts>['data']>
}
const PostItem: React.FC<PostItemProps> = ({ postData }) => {
  return (
    <div className={$['post-item']}>
      <span className={$['post-item-boardName']}>{postData.board_name}</span>
      <FriendlyTime time={postData.uploaded_at} />
      <h1>{postData.title}</h1>
    </div>
  )
}

type MyPageProps = {
  userInfo: UserInfo
  myPosts: OneApiPayload<GetMyPosts>['data']
}

const MyPage: NextPage<MyPageProps> = ({ userInfo, myPosts }) => {
  return (
    <Body pageTitle={userInfo.nickname} bodyClassName={$['eodiro-my']}>
      <section className={$['info-section']}>
        <h1 className={$['section-header']}>기본 정보</h1>
        <Grid proportion="large" className={$['section-body']}>
          <FlatBlock>
            <div className={$['info-block']}>
              <h2 className={$['ib-header']}>가입일</h2>
              <p>{dayjs(userInfo.registered_at).format('YYYY년 M월 D일')}</p>
            </div>
          </FlatBlock>
          <FlatBlock>
            <div className={$['info-block']}>
              <h2 className={$['ib-header']}>포탈 이메일</h2>
              <p>{userInfo.portal_id}</p>
            </div>
          </FlatBlock>
          <FlatBlock>
            <div className={classNames($['info-block'], $['random-nickname'])}>
              <h2 className={$['ib-header']}>오늘의 랜덤 닉네임</h2>
              <p>{userInfo.random_nickname}</p>
            </div>
          </FlatBlock>
        </Grid>
      </section>

      {/* My Posts */}
      <section className={$['my-posts']}>
        {myPosts.map((post, i) => {
          return (
            <EodiroLink
              key={i}
              href="/square/[boardName]/[postId]"
              as={`/square/${post.board_name}/${post.id}`}
            >
              <ArrowBlock className={$['my-post-item']}>
                <PostItem postData={post} />
              </ArrowBlock>
            </EodiroLink>
          )
        })}
      </section>

      {/* Sign out section */}
      <section className={$['signout-section']}>
        <Button
          className={$['signout-btn']}
          label="로그아웃"
          accent="purple"
          onClick={async (): Promise<void> => {
            const signedOut = await Tokens.clear()
            if (signedOut) {
              location.href = '/'
            }
          }}
        />
        <Button
          label="모든 기기에서 로그아웃"
          accent="purple"
          onClick={async (): Promise<void> => {
            const signedOutFromAll = await AuthApi.signOutFromAll()

            if (signedOutFromAll) {
              alert('모든 기기에서 로그아웃 되었습니다. 다시 로그인해주세요.')
              location.href = '/'
            } else {
              alert('문제가 발생하여 모든 기기에서 로그아웃하지 못했습니다.')
            }
          }}
        />
      </section>
    </Body>
  )
}

export const getServerSideProps: GetServerSideProps<MyPageProps> = async ({
  req,
  res,
}) => {
  const userInfo = await AuthApi.info(req)

  if (!userInfo) {
    redirect(res, '/')
    return
  }

  const { data: myPosts } = await oneAPIClient(ApiHost.getHost(), {
    action: 'getMyPosts',
    data: {
      accessToken: (await Tokens.get(req)).accessToken,
    },
  })

  return {
    props: {
      userInfo,
      myPosts,
    },
  }
}

export default MyPage
