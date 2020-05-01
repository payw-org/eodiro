import { FillableIcon } from '@/types'

const Blocks: FillableIcon = ({ fill, size = 128, className }) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="31.25"
        y="29"
        width="59"
        height="18"
        rx="5"
        fill={fill}
        className={fill || 'svg-bg'}
      />
      <rect
        x="44.75"
        y="55"
        width="60"
        height="18"
        rx="5"
        fill={fill}
        className={fill || 'svg-bg'}
      />
      <rect
        x="31.25"
        y="81"
        width="59"
        height="18"
        rx="5"
        fill={fill}
        className={fill || 'svg-bg'}
      />
    </svg>
  )
}

export default Blocks
