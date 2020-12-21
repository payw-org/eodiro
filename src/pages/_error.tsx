import Body from '@/layouts/BaseLayout/Body'
import classNames from 'classnames'
import { NextPage } from 'next'
import React from 'react'
import $ from './_error.module.scss'

type ErrorPageProps = {
  statusCode: number
}

const ErrorPage: NextPage<ErrorPageProps> = ({ statusCode }) => {
  const pageTitle = statusCode === 999 ? 'Unknwon Error' : statusCode.toString()

  let msg = ''

  if (statusCode === 500) {
    msg = '서버에 연결할 수 없습니다.'
  } else if (statusCode === 999) {
    msg = '알 수 없는 오류입니다.'
  } else {
    msg = '페이지를 찾을 수 없습니다.'
  }

  return (
    <Body pageTitle={pageTitle} titleHidden centered>
      <div id={$['error-page']}>
        <h1
          className={classNames(
            $['status-code'],
            'overlay-sentinel-spot',
            'title-sentinel-spot'
          )}
        >
          {statusCode}
        </h1>
        <p className={$['manifesto']}>{msg}</p>
      </div>
    </Body>
  )
}

ErrorPage.getInitialProps = async ({ res, err }): Promise<ErrorPageProps> => {
  let statusCode = 999

  if (res && res.statusCode) {
    statusCode = res.statusCode
  } else if (err && err.statusCode) {
    statusCode = err.statusCode
  }

  return {
    statusCode,
  }
}

export default ErrorPage
