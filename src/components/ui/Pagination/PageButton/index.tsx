import classNames from 'classnames'
import $ from './style.module.scss'

type PageButtonProps = {
  page: number
  type: 'previous' | 'begin' | 'next' | 'end' | 'default'
  isSelected?: boolean
  onPressPage: (page: number) => void
}

const iconMap: Record<PageButtonProps['type'], string | undefined> = {
  begin: 'chevron_left_2',
  previous: 'chevron_left',
  next: 'chevron_right',
  end: 'chevron_right_2',
  default: undefined,
}

const PageButton: React.FC<PageButtonProps> = ({
  page,
  type,
  isSelected,
  onPressPage,
}) => {
  const icon = iconMap[type]

  return (
    <button
      type="button"
      className={classNames($['button'], {
        [$['selected']]: isSelected,
      })}
      onClick={() => {
        onPressPage(page)
      }}
    >
      {icon ? <i className="f7-icons">{icon}</i> : page}
    </button>
  )
}

export default PageButton
