import AuthCommon from '@/components/auth/AuthCommon'
import { getAuthState } from '@/modules/server/get-auth-state'
import Head from 'next/head'
import { EodiroPage } from './_app'

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
  if (isSigned && res) {
    res.writeHead(302, {
      Location: '/',
    })
    res.end()
  }

  return {}
}

export default JoinPage
