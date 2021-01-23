import classNames from 'classnames'
import React from 'react'
import { Icon } from '../Icon'
import $ from './style.module.scss'

export interface ArrowBlockProps {
  className?: string
  noArrow?: boolean
  /** If `true`, no effect on hover. */
  flat?: boolean
  noPadding?: boolean
  customHeight?: boolean
  onClick?: () => void
}

export const ArrowBlock: React.FC<ArrowBlockProps> = ({
  className,
  noArrow = false,
  flat = false,
  children,
  noPadding = false,
  customHeight = false,
  onClick,
}) => {
  return (
    <div
      className={classNames($['arrow-block'], className, {
        [$['unflat']]: !flat,
        [$['no-padding']]: noPadding,
        [$['custom-height']]: customHeight,
      })}
      tabIndex={0}
      role="menu"
      onClick={onClick}
    >
      <div className={$['ab-body']}>{children}</div>
      {!noArrow && !flat && (
        <div className={$['ab-arrow-container']}>
          <Icon name="chevron_right" className="text-gray-500" />
        </div>
      )}
    </div>
  )
}
