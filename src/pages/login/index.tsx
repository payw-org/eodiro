import AuthCommon from '@/components/auth/AuthCommon'
import { NextPage } from 'next'
import Head from 'next/head'

const SignInPage: NextPage = () => (
  <>
    <Head>
      <title>로그인</title>
    </Head>

    <AuthCommon mode="signin" />
  </>
)

export default SignInPage
