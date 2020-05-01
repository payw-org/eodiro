import './style.scss'

import { AuthApi } from '@/api'
import Body from '@/layouts/BaseLayout/Body'
import { Button } from '@/components/ui'
import { EodiroPage } from '../_app'
import { GetServerSideProps } from 'next'
import { redirect } from '@/modules/server/redirect'
import { useEffect } from 'react'

type VerificationPageProps = {
  verified: boolean
}

const VerifiedComp: React.FC<{ verified: boolean }> = ({ verified }) => {
  const paragraph = verified ? '환영합니다!' : '없거나 만료된 인증 코드입니다.'
  const anchor = {
    href: verified ? '/signin' : '/join',
    text: verified ? '로그인' : '회원가입',
  }

  // Clear verification code after load
  useEffect(() => {
    history.pushState({}, null, '/verification')
  }, [])

  return (
    <div className="wrapper">
      <h1 className="manifesto overlay-sentinel-spot title-sentinel-spot">
        {paragraph}
      </h1>
      <a href={anchor.href}>
        <Button label={anchor.text} className="btn" />
      </a>
    </div>
  )
}

const VerificationPage: EodiroPage<VerificationPageProps> = ({ verified }) => {
  return (
    <Body
      pageTitle="회원가입 인증"
      titleHidden
      centered
      bodyClassName="eodiro-join-verification"
    >
      <VerifiedComp verified={verified} />
    </Body>
  )
}

export default VerificationPage

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { t } = ctx.query

  if (!t) {
    redirect(ctx.res)
  }

  const verified = await AuthApi.verify(t as string)

  return {
    props: {
      verified,
    },
  }
}
