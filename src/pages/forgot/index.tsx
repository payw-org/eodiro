import AuthCommon from '@/components/auth/AuthCommon'
import Head from 'next/head'
import { EodiroPage } from '../_app'

const ForgotPage: EodiroPage = () => {
  return (
    <>
      <Head>
        <title>암호 재발급</title>
      </Head>
      <AuthCommon mode="forgot" />
    </>
  )
}

ForgotPage.getInitialProps = ({ res, isSigned }): {} => {
  if (isSigned) {
    res.writeHead(302, {
      Location: '/',
    })
    res.end()
  }

  return {}
}

export default ForgotPage
