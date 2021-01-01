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
}

export function Flex({
  children,
  className,
  row,
  column,
  center,
  flex,
  minWidth,
}: FlexProps) {
  return (
    <div
      className={classNames(
        $['center'],
        {
          [$['row']]: row,
          [$['column']]: column,
          [$['center']]: center,
        },
        className
      )}
      style={{
        flex,
        minWidth,
      }}
    >
      {children}
    </div>
  )
}
