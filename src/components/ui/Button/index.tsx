import classNames from 'classnames'
import React from 'react'
import $ from './style.module.scss'

type ButtonProps = {
  className?: string
  /**
   * @deprecated Pass children instead
   */
  label?: string | JSX.Element
  full?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  disabled?: boolean
  accent?:
    | 'default'
    | 'pink'
    | 'orange'
    | 'yellow'
    | 'green'
    | 'grass'
    | 'sky'
    | 'blue'
    | 'purple'
    | 'violet'
}

export const Button: React.FC<ButtonProps> = ({
  className,
  full,
  accent,
  onClick,
  disabled,
  label,
  children,
}) => {
  return (
    <button
      type="button"
      className={classNames($['eodiro-btn'], className, {
        [$['full']]: full,
        [$['default']]: accent === 'default',
      })}
      data-accent={accent}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
      {children}
    </button>
  )
}
