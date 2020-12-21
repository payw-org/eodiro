import React from 'react'

type VerticalThreeDotsIconProps = {
  className?: string
  fill?: string
  onClick?: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void
}
const VerticalThreeDotsIcon: React.FC<VerticalThreeDotsIconProps> = ({
  className,
  fill,
  onClick,
}) => {
  return (
    <svg
      className={className}
      onClick={onClick}
      width="30px"
      height="162px"
      viewBox="0 0 30 162"
      version="1.1"
    >
      <g
        id="three-dots-vertical-color-icon"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
        className=""
      >
        <g id="Group" fill={fill || ''} className="svg-bg">
          <circle id="Oval" cx="15" cy="15" r="15" />
          <circle id="Oval" cx="15" cy="81" r="15" />
          <circle id="Oval" cx="15" cy="147" r="15" />
        </g>
      </g>
    </svg>
  )
}

export { VerticalThreeDotsIcon }
