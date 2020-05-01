import { FillableIcon } from '@/types'

const Spoon: FillableIcon = ({ fill, size = 128, className }) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        cx="45.4931"
        cy="37.791"
        rx="14.4442"
        ry="18.0206"
        fill={fill}
        className={fill || 'svg-bg'}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M88.7604 22.5318C91.0748 22.5318 92.951 24.166 92.951 26.1819L92.951 104.579C92.951 106.595 91.0748 108.23 88.7604 108.23C86.446 108.23 84.5698 106.595 84.5698 104.579L84.5698 26.1819C84.5698 24.166 86.446 22.5318 88.7604 22.5318Z"
        fill={fill}
        className={fill || 'svg-bg'}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M74.0093 22.5318C76.3237 22.5318 78.1999 24.166 78.1999 26.1819L78.1999 104.579C78.1999 106.595 76.3237 108.23 74.0093 108.23C71.6949 108.23 69.8187 106.595 69.8187 104.579L69.8187 26.1819C69.8187 24.166 71.6949 22.5318 74.0093 22.5318Z"
        fill={fill}
        className={fill || 'svg-bg'}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M45.4931 22.5318C47.8075 22.5318 49.6837 24.166 49.6837 26.1819L49.6837 104.579C49.6837 106.595 47.8075 108.23 45.4931 108.23C43.1787 108.23 41.3025 106.595 41.3025 104.579L41.3025 26.1819C41.3025 24.166 43.1787 22.5318 45.4931 22.5318Z"
        fill={fill}
        className={fill || 'svg-bg'}
      />
    </svg>
  )
}

export default Spoon
