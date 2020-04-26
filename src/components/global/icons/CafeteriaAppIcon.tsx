import React from 'react'
import { ColorIcon } from '@/types'

export const CafeteriaAppIcon: ColorIcon = ({ className }) => {
  return (
    <svg
      className={className}
      width="128"
      height="129"
      viewBox="0 0 128 129"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#cafeteria-clip)">
        <path
          d="M3.05176e-05 49.791C3.05176e-05 32.5862 3.05176e-05 23.9838 3.34831 17.4124C6.29354 11.6321 10.9931 6.93255 16.7734 3.98732C23.3448 0.639038 31.9472 0.639038 49.152 0.639038H78.848C96.0528 0.639038 104.655 0.639038 111.227 3.98732C117.007 6.93255 121.707 11.6321 124.652 17.4124C128 23.9838 128 32.5862 128 49.791V79.487C128 96.6919 128 105.294 124.652 111.866C121.707 117.646 117.007 122.346 111.227 125.291C104.655 128.639 96.0528 128.639 78.848 128.639H49.152C31.9472 128.639 23.3448 128.639 16.7734 125.291C10.9931 122.346 6.29354 117.646 3.34831 111.866C3.05176e-05 105.294 3.05176e-05 96.6919 3.05176e-05 79.487V49.791Z"
          fill="url(#cafeteria-background-linear)"
        />
        <ellipse
          cx="47.95"
          cy="41.9093"
          rx="12.5267"
          ry="15.6283"
          className="svg-bg"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M85.4734 28.6758C87.4806 28.6758 89.1077 30.0931 89.1077 31.8414L89.1077 99.8314C89.1077 101.58 87.4806 102.997 85.4734 102.997C83.4663 102.997 81.8391 101.58 81.8391 99.8314L81.8391 31.8414C81.8391 30.0931 83.4663 28.6758 85.4734 28.6758Z"
          className="svg-bg"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M72.6805 28.6758C74.6877 28.6758 76.3148 30.0931 76.3148 31.8414L76.3148 99.8314C76.3148 101.58 74.6877 102.997 72.6805 102.997C70.6734 102.997 69.0462 101.58 69.0462 99.8314L69.0462 31.8414C69.0462 30.0931 70.6734 28.6758 72.6805 28.6758Z"
          className="svg-bg"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M47.95 28.6758C49.9571 28.6758 51.5842 30.0931 51.5842 31.8414L51.5842 99.8314C51.5842 101.58 49.9571 102.997 47.95 102.997C45.9428 102.997 44.3157 101.58 44.3157 99.8314L44.3157 31.8414C44.3157 30.0931 45.9428 28.6758 47.95 28.6758Z"
          className="svg-bg"
        />
      </g>
      <defs>
        <linearGradient
          id="cafeteria-background-linear"
          x1="64"
          y1="0.639038"
          x2="64"
          y2="128.639"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#31A8FF" />
          <stop offset="1" stopColor="#305DFF" />
        </linearGradient>
        <clipPath id="cafeteria-clip">
          <rect
            width="128"
            height="128"
            fill="white"
            transform="translate(3.05176e-05 0.639038)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}
