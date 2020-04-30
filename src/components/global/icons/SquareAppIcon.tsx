import { ColorIcon } from '@/types'
import React from 'react'

export const SquareAppIcon: ColorIcon = ({ className }) => {
  return (
    <svg
      className={className}
      width="128"
      height="129"
      viewBox="0 0 128 129"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#square-clip)">
        <path
          d="M0 49.791C0 32.5862 0 23.9838 3.34828 17.4124C6.29351 11.6321 10.9931 6.93255 16.7734 3.98732C23.3448 0.639038 31.9472 0.639038 49.152 0.639038H78.848C96.0528 0.639038 104.655 0.639038 111.227 3.98732C117.007 6.93255 121.706 11.6321 124.652 17.4124C128 23.9838 128 32.5862 128 49.791V79.487C128 96.6919 128 105.294 124.652 111.866C121.706 117.646 117.007 122.346 111.227 125.291C104.655 128.639 96.0528 128.639 78.848 128.639H49.152C31.9472 128.639 23.3448 128.639 16.7734 125.291C10.9931 122.346 6.29351 117.646 3.34828 111.866C0 105.294 0 96.6919 0 79.487V49.791Z"
          fill="url(#square-background-linear)"
        />
        <rect
          x="35.5976"
          y="34.2854"
          width="51.1675"
          height="15.6104"
          rx="5"
          className="svg-bg"
        />
        <rect
          x="47.3055"
          y="56.8338"
          width="52.0348"
          height="15.6104"
          rx="5"
          className="svg-bg"
        />
        <rect
          x="35.5976"
          y="79.3822"
          width="51.1675"
          height="15.6104"
          rx="5"
          className="svg-bg"
        />
      </g>
      <defs>
        <linearGradient
          id="square-background-linear"
          x1="64"
          y1="0.639038"
          x2="64"
          y2="128.639"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF79B9" />
          <stop offset="1" stopColor="#FF3E78" />
        </linearGradient>
        <clipPath id="square-clip">
          <rect
            width="128"
            height="128"
            fill="white"
            transform="translate(0 0.639038)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}
