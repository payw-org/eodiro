import Header, { HeaderProps } from './Header'
import React, { FC } from 'react'

import $ from './style.module.scss'
import Head from 'next/head'
import mergeClassNames from '@/modules/merge-class-name'

export type BodyProps = HeaderProps & {
  bodyClassName?: string
  hasTopGap?: boolean
  centered?: boolean
  hideOnLoad?: boolean
}

const Body: FC<BodyProps> = (props) => {
  const {
    children,
    bodyClassName,
    hasTopGap = true,
    centered = false,
    hideOnLoad = false,
  } = props

  return (
    <>
      <Head>
        <title>{props.browserTitle || props.pageTitle}</title>
      </Head>
      <div
        className={mergeClassNames(
          $['body-content'],
          bodyClassName,
          hasTopGap && $['top-gap'],
          centered && $['centered'],
          hideOnLoad && $['hidden']
        )}
      >
        <Header {...props} />
        {children}
      </div>
    </>
  )
}

export default Body

export function visualizeBody(): void {
  document
    .getElementsByClassName($['body-content'])[0]
    .classList.remove($['hidden'])
}
