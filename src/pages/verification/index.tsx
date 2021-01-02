import { Button } from '@/components/ui'
import Body from '@/layouts/BaseLayout/Body'
import { prisma } from '@/modules/prisma'
import { redirect } from '@/modules/server/redirect'
import classNames from 'classnames'
import { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import { useEffect } from 'react'
import $ from './style.module.scss'

type VerificationPageProps = {
  verified: boolean
}

const VerifiedComp: React.FC<{ verified: boolean }> = ({ verified }) => {
  const paragraph = verified ? '환영합니다!' : '없거나 만료된 인증 코드입니다.'
  const anchor = {
    href: verified ? '/login' : '/join',
    text: verified ? '로그인' : '회원가입',
  }

  // Clear verification code after load
  useEffect(() => {
    window.history.pushState({}, '', '/verification')
  }, [])

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

const VerificationPage: NextPage<VerificationPageProps> = ({ verified }) => (
  <Body
    pageTitle="회원가입 인증"
    titleHidden
    centered
    bodyClassName={$['eodiro-join-verification']}
  >
    <VerifiedComp verified={verified} />
  </Body>
)

export default VerificationPage

export const getServerSideProps: GetServerSideProps<VerificationPageProps> = async (
  ctx
) => {
  const { t } = ctx.query
  const token = t as string

  if (!token) {
    redirect(ctx.res)
    return { props: { verified: false } }
  }

  // const verified = await AuthApi.verify(t as string)
  const pendingUser = await prisma.pendingUser.findUnique({
    where: { token },
  })

  if (pendingUser) {
    const clearPendingUser = prisma.pendingUser.delete({
      where: { token },
    })
    const {
      portalId,
      nickname,
      password,
      randomNickname,
      joinedAt,
    } = pendingUser
    const createUser = prisma.user.create({
      data: { portalId, nickname, password, randomNickname, joinedAt },
    })

    await prisma.$transaction([clearPendingUser, createUser])

    return {
      props: { verified: true },
    }
  }

  return {
    props: { verified: false },
  }
}
