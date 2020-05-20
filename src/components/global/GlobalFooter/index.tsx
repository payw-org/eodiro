import $ from './style.module.scss'
import Link from 'next/link'
import React from 'react'
import dayjs from 'dayjs'

const Footer: React.FC = () => {
  const now = dayjs()

  return (
    <footer id={$['global-footer']}>
      Copyright © {now.year()}
      &nbsp;
      <a
        href="https://payw.org"
        target="_blank"
        rel="noopener noreferrer"
        className={$['payw']}
      >
        PAYW
      </a>
      &nbsp;|&nbsp;
      {/* <Link href="/inquiry"> */}
      <a href="/inquiry" className={$['inquiry']}>
        문의하기
      </a>
      {/* </Link> */}
    </footer>
  )
}

export default React.memo(Footer)
