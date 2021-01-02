import AuthCommon from '@/components/auth/AuthCommon'
import { NextPage } from 'next'
import Head from 'next/head'

const JoinPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>회원가입</title>
      </Head>
      <AuthCommon mode="join" />
    </>
  )
}

export default JoinPage
