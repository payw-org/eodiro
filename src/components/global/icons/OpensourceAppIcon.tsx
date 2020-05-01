import { ColorIcon } from '@/types'
import React from 'react'

export const OpensourceAppIcon: ColorIcon = ({ className }) => {
  return (
    <svg
      className={className}
      width="128"
      height="129"
      viewBox="0 0 128 129"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#opensource-clip)">
        <path
          d="M0 49.791C0 32.5862 0 23.9838 3.34828 17.4124C6.29351 11.6321 10.9931 6.93255 16.7734 3.98732C23.3448 0.639038 31.9472 0.639038 49.152 0.639038H78.848C96.0528 0.639038 104.655 0.639038 111.227 3.98732C117.007 6.93255 121.706 11.6321 124.652 17.4124C128 23.9838 128 32.5862 128 49.791V79.487C128 96.6919 128 105.294 124.652 111.866C121.706 117.646 117.007 122.346 111.227 125.291C104.655 128.639 96.0528 128.639 78.848 128.639H49.152C31.9472 128.639 23.3448 128.639 16.7734 125.291C10.9931 122.346 6.29351 117.646 3.34828 111.866C0 105.294 0 96.6919 0 79.487V49.791Z"
          fill="url(#opensource-background-linear)"
        />
        <path
          d="M64 95.2647C64 95.2647 36.7293 80.2877 30.0128 61.3675C26.2125 50.6623 29.4206 42.6857 35.0798 37.9497C40.739 33.2138 49.1275 32.8432 55.3298 36.343C61.5321 39.8428 64 46.8723 64 46.8723C64 46.8723 66.4678 39.8428 72.6701 36.343C78.8724 32.8432 87.2609 33.2138 92.9201 37.9497C98.5794 42.6857 101.787 50.6623 97.9872 61.3675C91.2707 80.2877 64 95.2647 64 95.2647Z"
          className="svg-bg-dark"
        />
      </g>
      <defs>
        <linearGradient
          id="opensource-background-linear"
          x1="64"
          y1="0.639038"
          x2="64"
          y2="128.639"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E751FF" />
          <stop offset="1" stopColor="#B221F7" />
        </linearGradient>
        <clipPath id="opensource-clip">
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
