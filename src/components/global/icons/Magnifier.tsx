import { FillableIcon } from '@/types'
import React from 'react'

export const Magnifier: FillableIcon = ({ fill, size = 128, className }) => {
  return (
    <>
      <svg
        className={className}
        // TODO: inline width and height don't support CSS units like 'rem' or 'em'
        width={size}
        height={size}
        viewBox="0 0 128 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M58.5 83C72.031 83 83 72.031 83 58.5C83 44.969 72.031 34 58.5 34C44.969 34 34 44.969 34 58.5C34 72.031 44.969 83 58.5 83ZM58.5 92C77.0015 92 92 77.0015 92 58.5C92 39.9985 77.0015 25 58.5 25C39.9985 25 25 39.9985 25 58.5C25 77.0015 39.9985 92 58.5 92Z"
          fill={fill}
          className={fill || 'svg-bg'}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M75.8241 76.5312C77.5815 74.7739 80.4307 74.7739 82.1881 76.5312L99.1586 93.5018C100.916 95.2591 100.916 98.1084 99.1586 99.8657C97.4013 101.623 94.552 101.623 92.7947 99.8657L75.8241 82.8952C74.0667 81.1378 74.0667 78.2886 75.8241 76.5312Z"
          fill={fill}
          className={fill || 'svg-bg'}
        />
      </svg>
    </>
  )
}
