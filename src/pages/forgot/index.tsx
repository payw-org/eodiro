import AuthCommon from '@/components/auth/AuthCommon'
import { NextPage } from 'next'
import Head from 'next/head'

const ForgotPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>암호 재발급</title>
      </Head>
      <AuthCommon mode="forgot" />
    </>
  )
}

export default ForgotPage
