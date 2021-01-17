import { authState } from '@/atoms/auth'
import { ArrowBlock, Button, FlatBlock } from '@/components/ui'
import { eodiroConsts } from '@/constants'
import Body from '@/layouts/BaseLayout/Body'
import Grid from '@/layouts/Grid'
import { eodiroRequest } from '@/modules/eodiro-request'
import { RefinedUser } from '@/modules/server/middlewares/require-auth'
import { nextRequireAuthMiddleware } from '@/modules/server/ssr-middlewares/next-require-auth'
import { Cookies } from '@/pages/api/cookie'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSetRecoilState } from 'recoil'
import $ from './style.module.scss'

type MyPageProps = {
  user: RefinedUser
}

const MyPage: NextPage<MyPageProps> = ({ user }) => {
  const router = useRouter()
  const setAuthState = useSetRecoilState(authState)

  async function signOut() {
    const cookies: Cookies = [
      {
        name: eodiroConsts.EDR_ACCESS_TOKEN_NAME,
        expires: new Date('1997-01-01').toUTCString(),
        value: '',
      },
      {
        name: eodiroConsts.EDR_REFRESH_TOKEN_NAME,
        expires: new Date('1997-01-01').toUTCString(),
        value: '',
      },
    ]

    await eodiroRequest({
      url: '/api/cookie',
      method: 'POST',
      data: cookies,
    })

    setAuthState({ userId: 0 })
    router.replace('/')
  }

  // TODO: withdrawl
  // async function revoke() {
  //   await eodiroRequest({
  //     url: '/api/auth/revoke',
  //     method: 'POST',
  //   })

  //   setAuthState({ userId: 0 })
  //   router.replace('/')
  // }

  return (
    <Body pageTitle={`${user.nickname}님`} bodyClassName={$['eodiro-my']}>
      <section className={$['info-section']}>
        <h1 className={$['section-header']}>기본 정보</h1>
        <Grid proportion="large" className={$['section-body']}>
          <FlatBlock>
            <div className={$['info-block']}>
              <h2 className={$['ib-header']}>가입일</h2>
              <p>{dayjs(user.joinedAt).format('YYYY년 M월 D일')}</p>
            </div>
          </FlatBlock>
          <FlatBlock>
            <div className={$['info-block']}>
              <h2 className={$['ib-header']}>포탈 이메일</h2>
              <p>{user.portalId}</p>
            </div>
          </FlatBlock>
          <FlatBlock>
            <div className={classNames($['info-block'], $['random-nickname'])}>
              <h2 className={$['ib-header']}>오늘의 랜덤 닉네임</h2>
              <p>{user.randomNickname}</p>
            </div>
          </FlatBlock>

          <Link href="/my/posts">
            <a>
              <ArrowBlock>
                <div className={$['info-block']}>
                  <h2 className={$['ib-header']}>나의 게시물</h2>
                </div>
              </ArrowBlock>
            </a>
          </Link>
          <Link href="/my/comments">
            <a>
              <ArrowBlock>
                <div className={$['info-block']}>
                  <h2 className={$['ib-header']}>나의 댓글</h2>
                </div>
              </ArrowBlock>
            </a>
          </Link>
          <Link href="/my/bookmarks">
            <a>
              <ArrowBlock>
                <div className={$['info-block']}>
                  <h2 className={$['ib-header']}>나의 책갈피</h2>
                </div>
              </ArrowBlock>
            </a>
          </Link>
        </Grid>
      </section>

      {/* Sign out section */}
      <section className={$['signout-section']}>
        <Button
          className={$['signout-btn']}
          label="로그아웃"
          onClick={signOut}
        />
        {/* <Button label="모든 기기에서 로그아웃" onClick={revoke} /> */}
      </section>
    </Body>
  )
}

export const getServerSideProps: GetServerSideProps<MyPageProps> = async ({
  req,
  res,
}) => {
  await nextRequireAuthMiddleware(req, res)

  const { user } = req

  return {
    props: {
      user,
    },
  }
}

export default MyPage
