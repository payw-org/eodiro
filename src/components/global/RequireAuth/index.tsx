import $ from './style.module.scss'
import EodiroLink from '@/components/utils/EodiroLink'
import classNames from 'classnames'

type RequireAuthProps = {
  className?: string
}

const RequireAuth: React.FC<RequireAuthProps> = ({ className }) => {
  return (
    <div className={classNames($['comp-require-auth'], className)}>
      <EodiroLink absolute href="/signin" />
      <i className={classNames('f7-icons', $['icon'])}>lock</i>
      <p className={$['paragraph']}>로그인이 필요한 서비스입니다.</p>
    </div>
  )
}

export default RequireAuth
