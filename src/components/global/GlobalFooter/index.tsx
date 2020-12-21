import EodiroLink from '@/components/utils/EodiroLink'
import dayjs from 'dayjs'
import React from 'react'
import $ from './style.module.scss'

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
      &nbsp;•&nbsp;
      <a href="mailto:support@eodiro.com" className={$['inquiry']}>
        문의하기
      </a>
      &nbsp;•&nbsp;
      <EodiroLink href="/privacy" className={$['privacy']}>
        개인정보 처리방침
      </EodiroLink>
    </footer>
  )
}

export default React.memo(Footer)
