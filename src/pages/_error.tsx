import $ from './_error.module.scss'
import Body from '@/layouts/BaseLayout/Body'
import { NextPage } from 'next'
import React from 'react'
import classNames from 'classnames'

type ErrorPageProps = {
  statusCode: number
}

const ErrorPage: NextPage<ErrorPageProps> = ({ statusCode }) => {
  const pageTitle = statusCode === 999 ? 'Unknwon Error' : statusCode.toString()
  const msg =
    statusCode === 500
      ? '서버에 연결할 수 없습니다.'
      : statusCode === 999
      ? '알 수 없는 오류입니다.'
      : '페이지를 찾을 수 없습니다.'

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
  const statusCode =
    res && res.statusCode
      ? res.statusCode
      : err && err.statusCode
      ? err.statusCode
      : 999

  return {
    statusCode,
  }
}

export default ErrorPage
