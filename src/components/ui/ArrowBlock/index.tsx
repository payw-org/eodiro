import { ArrowIcon } from '@/components/global/icons'
import classNames from 'classnames'
import React from 'react'
import $ from './style.module.scss'

export interface ArrowBlockProps {
  className?: string
  noArrow?: boolean
  /** If `true`, no effect on hover. */
  flat?: boolean
  customPadding?: boolean
  onClick?: () => void
}

export const ArrowBlock: React.FC<ArrowBlockProps> = ({
  className,
  noArrow = false,
  flat = false,
  children,
  customPadding = false,
  onClick,
}) => {
  return (
    <div
      className={classNames(
        $['arrow-block'],
        className,
        !flat && $['unflat'],
        customPadding && $['custom-padding']
      )}
      tabIndex={0}
      role="menu"
      onClick={onClick}
    >
      <div className={$['ab-body']}>{children}</div>
      {!noArrow && !flat && (
        <div className={$['ab-arrow-container']}>
          <ArrowIcon direction="right" className={$['ab-arrow']} />
        </div>
      )}
    </div>
  )
}
