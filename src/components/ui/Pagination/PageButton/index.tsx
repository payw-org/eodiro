import $ from './style.module.scss'
import classNames from 'classnames'

type PageButtonProps = {
  page: number
  type?: 'previous' | 'begin' | 'next' | 'end'
  isSelected?: boolean
  onPressPage: (page: number) => void
}

const PageButton: React.FC<PageButtonProps> = ({
  page,
  type,
  isSelected,
  onPressPage,
}) => {
  const icon =
    type === 'begin'
      ? 'chevron_left_2'
      : type === 'previous'
      ? 'chevron_left'
      : type === 'next'
      ? 'chevron_right'
      : type === 'end'
      ? 'chevron_right_2'
      : ''

  return (
    <div
      className={classNames($['button'], {
        [$['selected']]: isSelected,
      })}
      onClick={() => {
        onPressPage(page)
      }}
    >
      {icon ? <i className="f7-icons">{icon}</i> : page}
    </div>
  )
}

export default PageButton
