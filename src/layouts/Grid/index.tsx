import $ from './style.module.scss'
import React from 'react'
import { camelToKebab } from '@/modules/string-utils'
import classNames from 'classnames'

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
      className={classNames(
        $['grid-layout'],
        $[`proportion--${camelToKebab(proportion)}`],
        $[`gap--${camelToKebab(gap)}`],
        className
      )}
    >
      {children}
    </div>
  )
}

export default Grid
