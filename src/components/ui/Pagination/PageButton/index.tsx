import $ from './style.module.scss'
import classNames from 'classnames'

type PageButtonProps = {
  page: number
  isSelected: boolean
}

const PageButton: React.FC<PageButtonProps> = ({ page, isSelected }) => {
  return (
    <div
      className={classNames($['button'], {
        [$['selected']]: isSelected,
      })}
    >
      {page}
    </div>
  )
}

export default PageButton
