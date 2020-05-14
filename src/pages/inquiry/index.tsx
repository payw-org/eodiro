import { AuthContext, EodiroPage } from '../_app'
import { InquiryApi, InquiryData } from '@/api'
import React, { useContext, useRef, useState } from 'react'

import $ from './style.module.scss'
import { ArrowBlock } from '@/components/ui'
import Body from '@/layouts/BaseLayout/Body'
import { GetServerSideProps } from 'next'
import Grid from '@/layouts/Grid'
import Head from 'next/head'
import Link from 'next/link'
import Time from '@/modules/time'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { getAuthState } from '@/modules/server/get-auth-state'
import getState from '@/modules/get-state'
import { redirect } from '@/modules/server/redirect'

export const getServerSideProps: GetServerSideProps<InquiryProps> = async ({
  req,
  res,
}) => {
  const { isSigned } = await getAuthState({ req, res })

  if (!isSigned) {
    redirect(res, '/inquiry/request')
  }

  const inquiries = await InquiryApi.inquiries(0, null, req)

  return {
    props: {
      inquiries,
    },
  }
}

type InquiryProps = {
  inquiries: InquiryData[]
}

const InquiryPage: EodiroPage<InquiryProps> = ({ inquiries }) => {
  const authContext = useContext(AuthContext)

  const [items, setItems] = useState(inquiries)

  const inquiriesContainerRef = useRef<HTMLDivElement>(null)
  async function loadMore(): Promise<boolean> {
    const items = await getState(setItems)

    const moreInquiries = await InquiryApi.inquiries(items.length)

    if (moreInquiries && moreInquiries.length > 0) {
      setItems([...items, ...moreInquiries])
      return true
    } else {
      return false
    }
  }

  return (
    <>
      <Head>
        <title>문의</title>
      </Head>
      {inquiries === undefined ? null : (
        <Body hasTopGap pageTitle="문의">
          <div id={$['eodiro-inquiry']}>
            <div ref={inquiriesContainerRef}>
              <Grid className={$['inquiry-container']}>
                {authContext.isAdmin ? null : (
                  <ArrowBlock noArrow className={$['request-btn']}>
                    <Link href={'/inquiry/request'}>
                      <a className="absolute-link" />
                    </Link>
                    <h1 className={$['request-content']}>+</h1>
                  </ArrowBlock>
                )}

                {items && items.length > 0 ? (
                  items.map((item) => {
                    return (
                      <ArrowBlock key={item.id}>
                        <div className={$['inquiry-content']}>
                          <h1 className={$['']}>{item.title}</h1>
                          <p
                            className={classNames(
                              $['inquiry-uploaded-at'],
                              $['inquiry-item']
                            )}
                          >
                            {Time.friendly(item.uploaded_at)}
                          </p>
                          <p
                            className={classNames(
                              $['inquiry-answer'],
                              $['inquiry-item']
                            )}
                          >
                            {item.answer
                              ? '답변 완료(' +
                                dayjs(item.answered_at).format(
                                  'YYYY-MM-DD HH:MM:ss'
                                ) +
                                ')'
                              : '답변 대기 중'}
                          </p>
                        </div>
                      </ArrowBlock>
                    )
                  })
                ) : (
                  <p className={$['no-inquiries']}>문의 내역이 없습니다.</p>
                )}
              </Grid>
            </div>
          </div>
        </Body>
      )}
    </>
  )
}

export default InquiryPage
