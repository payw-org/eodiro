import $ from './style.module.scss'
import classNames from 'classnames'

const RequireAuth: React.FC = () => {
  return (
    <div className={$['comp-require-auth']}>
      <i className={classNames('f7-icons', $['icon'])}>lock</i>
      <p className={$['paragraph']}>로그인이 필요한 서비스입니다.</p>
    </div>
  )
}

export default RequireAuth
