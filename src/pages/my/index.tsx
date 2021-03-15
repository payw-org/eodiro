import { authState } from '@/atoms/auth'
import { ArrowBlock, Button, FlatBlock } from '@/components/ui'
import Grid from '@/components/ui/layouts/Grid'
import Body from '@/layouts/BaseLayout/Body'
import ApiHost from '@/modules/api-host'
import { logOut } from '@/modules/api/log-out'
import { eodiroRequest } from '@/modules/eodiro-request'
import { SafeUser } from '@payw/eodiro-server-types/api/my'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import $ from './style.module.scss'

const MyPage: NextPage = () => {
  const router = useRouter()
  const setAuth = useSetRecoilState(authState)
  const [user, setUser] = useState<SafeUser>({
    portalId: '-',
    nickname: '-',
    randomNickname: '-',
    joinedAt: new Date('1996-03-11'),
  })

  async function onLogOut() {
    await logOut()

    setAuth({ isLoggedIn: false })
    router.replace('/')
  }

  useEffect(() => {
    async function loadInformation() {
      const fetchedUser = await eodiroRequest<any, SafeUser>({
        url: ApiHost.resolve('/my/information'),
        method: 'GET',
      })

      setUser(fetchedUser)
    }

    loadInformation()
  }, [])

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
          onClick={onLogOut}
        />
        {/* <Button label="모든 기기에서 로그아웃" onClick={revoke} /> */}
      </section>
    </Body>
  )
}

export default MyPage
