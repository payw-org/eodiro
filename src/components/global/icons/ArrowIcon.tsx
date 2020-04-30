import React, { memo } from 'react'

import { FillableIconProps } from '@/types'

interface ArrowIconProps extends FillableIconProps {
  direction?: 'right' | 'down' | 'left' | 'up'
}

export const ArrowIcon: React.FC<ArrowIconProps> = memo(
  ({ fill = '#9b9b9b', className, appearance, direction = 'right' }) => {
    return (
      <svg
        data-appearance={appearance}
        className={className}
        width="8"
        height="11"
        viewBox="0 0 8 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transform:
            direction === 'down'
              ? 'rotate(90deg)'
              : direction === 'left'
              ? 'rotate(180deg)'
              : direction === 'up'
              ? 'rotate(270deg)'
              : '',
        }}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.26231 0.662654C1.7587 0.155744 2.56351 0.155743 3.0599 0.662651L6.73763 4.4183C6.97601 4.66173 7.10993 4.99188 7.10993 5.33614C7.10993 5.6804 6.97601 6.01056 6.73763 6.25398L3.0599 10.0096C2.56351 10.5166 1.7587 10.5166 1.26231 10.0096C0.765917 9.50274 0.765917 8.68087 1.26231 8.17397L4.04125 5.33614L1.26231 2.49833C0.765918 1.99143 0.765916 1.16956 1.26231 0.662654Z"
          fill={fill}
        />
      </svg>
    )
  }
)
