import { authState } from '@/atoms/auth'
import { Button, Tile } from '@/components/ui'
import { Icon } from '@/components/ui/Icon'
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
import $ from './index.module.scss'

const MyPage: NextPage = () => {
  const router = useRouter()
  const setAuth = useSetRecoilState(authState)
  const [user, setUser] = useState<SafeUser>({
    portalId: '-',
    nickname: '-',
    randomNickname: '-',
    joinedAt: new Date('1996-03-11'),
    point: 0,
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
    <Body pageTitle={`${user.nickname}님`}>
      <section className={classNames($['section'])}>
        <h1 className={$['section-header']}>포인트</h1>
        <Tile flat className={$['section-body']}>
          <div className={$['gauge-']} />
        </Tile>
      </section>

      <section className={classNames($['section'], $['info-section'])}>
        <h1 className={$['section-header']}>기본 정보</h1>
        <Grid proportion="large" className={$['section-body']}>
          <Tile flat>
            <div className={$['info-block']}>
              <h2 className={$['ib-header']}>가입일</h2>
              <p>{dayjs(user.joinedAt).format('YYYY년 M월 D일')}</p>
            </div>
          </Tile>
          <Tile flat>
            <div className={$['info-block']}>
              <h2 className={$['ib-header']}>포탈 이메일</h2>
              <p>{user.portalId}</p>
            </div>
          </Tile>
          <Tile flat>
            <div className={classNames($['info-block'], $['random-nickname'])}>
              <h2 className={$['ib-header']}>오늘의 랜덤 닉네임</h2>
              <p>{user.randomNickname}</p>
            </div>
          </Tile>

          <Link href="/my/posts">
            <a>
              <Tile>
                <div className={$['info-block']}>
                  <h2 className={$['ib-header']}>
                    <Icon
                      name="doc_plaintext"
                      className="mr-1 font-bold text-eodiro-primary-color"
                    />{' '}
                    나의 게시물
                  </h2>
                </div>
              </Tile>
            </a>
          </Link>
          <Link href="/my/comments">
            <a>
              <Tile>
                <div className={$['info-block']}>
                  <h2 className={$['ib-header']}>
                    <Icon
                      name="bubble_left"
                      className="mr-1 font-bold text-eodiro-green-2"
                    />{' '}
                    나의 댓글
                  </h2>
                </div>
              </Tile>
            </a>
          </Link>
          <Link href="/my/bookmarks">
            <a>
              <Tile>
                <div className={$['info-block']}>
                  <h2 className={$['ib-header']}>
                    <Icon
                      name="bookmark"
                      className="mr-1 font-bold text-eodiro-yellow-2"
                    />{' '}
                    나의 책갈피
                  </h2>
                </div>
              </Tile>
            </a>
          </Link>
        </Grid>
      </section>

      {/* Sign out section */}
      <section className={$['sign-out-section']}>
        <Button
          className={$['sign-out-btn']}
          label="로그아웃"
          onClick={onLogOut}
        />
        {/* <Button label="모든 기기에서 로그아웃" onClick={revoke} /> */}
      </section>
    </Body>
  )
}

export default MyPage
