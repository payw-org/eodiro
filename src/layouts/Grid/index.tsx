import './style.scss'

import React from 'react'
import { camelToKebab } from '@/modules/string-utils'

type GridProps = {
  proportion?: 'extraSmall' | 'small' | 'medium' | 'large'
  gap?: 'small' | 'medium' | 'large'
  className?: string
}

const Grid: React.FC<GridProps> = ({
  children,
  className,
  proportion = 'medium',
  gap = 'medium',
}) => {
  return (
    <div
      className={
        `grid-layout` +
        ` proportion--${camelToKebab(proportion)}` +
        ` gap--${camelToKebab(gap)}` +
        (className ? ` ${className}` : '')
      }
    >
      {children}
    </div>
  )
}

export default Grid
