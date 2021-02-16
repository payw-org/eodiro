import { Spinner } from '@/components/global/Spinner'
import { Button } from '@/components/ui'
import { eodiroConst } from '@/constants'
import Body from '@/layouts/BaseLayout/Body'
import ApiHost from '@/modules/api-host'
import { logInUrl } from '@/utils/page-urls'
import axios from 'axios'
import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode, useEffect, useState } from 'react'
import $ from './style.module.scss'

const VerifiedComp: React.FC<{ verified: boolean }> = ({ verified }) => {
  const paragraph = verified ? '환영합니다!' : '없거나 만료된 인증 코드입니다.'
  const anchor = {
    href: verified ? logInUrl : '/join',
    text: verified ? '로그인' : '회원가입',
  }

  return (
    <div className={$['wrapper']}>
      <h1
        className={classNames(
          $['manifesto'],
          'overlay-sentinel-spot',
          'title-sentinel-spot'
        )}
      >
        {paragraph}
      </h1>
      <Link href={anchor.href}>
        <a>
          <Button label={anchor.text} className={$['btn']} />
        </a>
      </Link>
    </div>
  )
}

function VerificationPage() {
  const [verified, setVerified] = useState<undefined | boolean>(undefined)
  const router = useRouter()

  useEffect(() => {
    const { t: token } = router.query

    axios
      .post(ApiHost.resolve('/auth/verify-join'), {
        token,
      })
      .then(() => {
        setVerified(true)
      })
      .catch(() => {
        setVerified(false)
      })
      .finally(() => {
        window.history.replaceState({}, '', '/verification')
      })
  }, [router.query])

  let renderNode: ReactNode

  if (verified === undefined) {
    renderNode = <Spinner />
  } else {
    renderNode = <VerifiedComp verified={verified} />
  }

  return (
    <Body
      pageTitle="회원가입 인증"
      titleHidden
      centered
      bodyClassName={$['eodiro-join-verification']}
    >
      <div
        className={`${eodiroConst.TITLE_SENTINEL_SPOT} ${eodiroConst.OVERLAY_SENTINEL_SPOT}`}
      >
        {renderNode}
      </div>
    </Body>
  )
}

export default VerificationPage
