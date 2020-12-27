import AuthCommon from '@/components/auth/AuthCommon'
import { getAuthState } from '@/modules/server/get-auth-state'
import { redirect } from '@/modules/server/redirect'
import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'

const SignInPage: NextPage = () => (
  <>
    <Head>
      <title>로그인</title>
    </Head>

    <AuthCommon mode="signin" />
  </>
)

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const { isSigned } = await getAuthState({ req, res })

  if (isSigned) {
    redirect(res)
  }

  return { props: {} }
}

export default SignInPage
