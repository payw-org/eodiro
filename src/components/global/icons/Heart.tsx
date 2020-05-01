import { FillableIcon } from '@/types'

const Heart: FillableIcon = ({ fill, size = 128, className }) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M64 99.3137C64 99.3137 32.5548 82.0441 24.8102 60.2277C20.4282 47.8837 24.1274 38.6862 30.6529 33.2253C37.1784 27.7643 46.8509 27.3371 54.0027 31.3726C61.1544 35.4081 64 42.5136 64 42.5136C64 42.5136 66.8456 35.4081 73.9973 31.3726C81.1491 27.3371 90.8216 27.7643 97.3471 33.2253C103.873 38.6862 107.572 47.8837 103.19 60.2277C95.4452 82.0441 64 99.3137 64 99.3137Z"
        fill={fill}
        className={fill || 'svg-bg'}
      />
    </svg>
  )
}

export default Heart
