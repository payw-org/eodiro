import './style.scss'

import React from 'react'
import dayjs from 'dayjs'

const GlobalFooter: React.FC = () => {
  const now = dayjs()

  return (
    <footer id="global-footer">
      Copyright © {now.year()}
      &nbsp;
      <a
        href="https://payw.org"
        target="_blank"
        rel="noopener noreferrer"
        className="payw"
      >
        PAYW
      </a>
      &nbsp;|&nbsp;
      <a href="/inquiry" className="inquiry">
        문의하기
      </a>
    </footer>
  )
}

export default React.memo(GlobalFooter)
