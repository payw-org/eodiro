import AuthCommon from '@/components/auth/AuthCommon'
import { EodiroPage } from './_app'
import Head from 'next/head'

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

JoinPage.getInitialProps = ({ res, isSigned }): {} => {
  if (isSigned) {
    res.writeHead(302, {
      Location: '/',
    })
    res.end()
  }

  return {}
}

export default JoinPage
