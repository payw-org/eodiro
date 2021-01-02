import classNames from 'classnames'
import $ from './style.module.scss'

type FlexProps = {
  children: React.ReactNode
  className?: string
  row?: boolean
  column?: boolean
  center?: boolean
  flex?: number
  minWidth?: string
  alignCenter?: boolean
  alignStart?: boolean
  alignEnd?: boolean
  justifyCenter?: boolean
  justifyStart?: boolean
  justifyEnd?: boolean
  justifyBetween?: boolean
  wrap?: boolean
  onClick?: () => void
}

export function Flex({
  children,
  className,
  row,
  column,
  center,
  flex,
  minWidth,
  alignCenter,
  alignStart,
  alignEnd,
  justifyCenter,
  justifyStart,
  justifyEnd,
  justifyBetween,
  wrap,
  onClick,
}: FlexProps) {
  const builtClassName = classNames(
    $['center'],
    {
      [$['row']]: row,
      [$['column']]: column,
      [$['center']]: center,
      [$['align-center']]: alignCenter,
      [$['align-start']]: alignStart,
      [$['align-end']]: alignEnd,
      [$['justify-center']]: justifyCenter,
      [$['justify-start']]: justifyStart,
      [$['justify-end']]: justifyEnd,
      [$['justify-between']]: justifyBetween,
      [$['wrap']]: wrap,
    },
    className
  )

  const style: React.CSSProperties = { flex, minWidth }

  if (onClick) {
    return (
      <button
        type="button"
        className={builtClassName}
        style={style}
        onClick={onClick}
      >
        {children}
      </button>
    )
  }

  return (
    <div className={builtClassName} style={style}>
      {children}
    </div>
  )
}
