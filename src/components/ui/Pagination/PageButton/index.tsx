import $ from './style.module.scss'
import classNames from 'classnames'

type PageButtonProps = {
  page: number
  isSelected: boolean
  onPressPage: (page: number) => void
}

const PageButton: React.FC<PageButtonProps> = ({
  page,
  isSelected,
  onPressPage,
}) => {
  return (
    <div
      className={classNames($['button'], {
        [$['selected']]: isSelected,
      })}
      onClick={() => {
        onPressPage(page)
      }}
    >
      {page}
    </div>
  )
}

export default PageButton
