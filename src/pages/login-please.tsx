import { Button } from '@/components/ui'
import { eodiroConst } from '@/constants'
import Body from '@/layouts/BaseLayout/Body'
import { logInUrl } from '@/utils/page-urls'
import classNames from 'classnames'
import { NextPage } from 'next'
import Link from 'next/link'
import $ from './login-please.module.scss'

const Page: NextPage = () => {
  return (
    <Body pageTitle="로그인 해주세요." centered titleHidden>
      <h1
        className={classNames(
          eodiroConst.OVERLAY_SENTINEL_SPOT,
          eodiroConst.TITLE_SENTINEL_SPOT
        )}
      >
        로그인 해주세요.
      </h1>
      <Link href={logInUrl}>
        <a>
          <Button className={$['login-btn']}>로그인</Button>
        </a>
      </Link>
    </Body>
  )
}

export default Page
