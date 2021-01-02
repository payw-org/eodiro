import EodiroLink from '@/components/utils/EodiroLink'
import classNames from 'classnames'
import $ from './style.module.scss'

type RequireAuthProps = {
  className?: string
}

const RequireAuth: React.FC<RequireAuthProps> = ({ className }) => {
  return (
    <div className={classNames($['comp-require-auth'], className)}>
      <EodiroLink absolute href="/login" />
      <i className={classNames('f7-icons', $['icon'])}>lock_circle_fill</i>
      <p className={$['paragraph']}>로그인이 필요한 서비스입니다.</p>
    </div>
  )
}

export default RequireAuth
