import $ from './style.module.scss'
import React from 'react'
import classNames from 'classnames'

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

export const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      className={classNames(
        $['eodiro-btn'],
        props.className,
        props.full && $['full']
      )}
      data-accent={props.accent}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.label}
      {props.children}
    </button>
  )
}
