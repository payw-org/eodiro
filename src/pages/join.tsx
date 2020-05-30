import AuthCommon from '@/components/auth/AuthCommon'
import { EodiroPage } from './_app'
import Head from 'next/head'
import { getAuthState } from '@/modules/server/get-auth-state'

const JoinPage: EodiroPage = () => {
  return (
    <>
      <Head>
        <title>회원가입</title>
      </Head>
      <AuthCommon mode="join" />
    </>
  )
}

JoinPage.getInitialProps = async ({ req, res }) => {
  const { isSigned } = await getAuthState({ req, res })
  if (isSigned) {
    res.writeHead(302, {
      Location: '/',
    })
    res.end()
  }

  return {}
}

export default JoinPage
