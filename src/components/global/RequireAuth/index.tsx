import $ from './style.module.scss'
import classNames from 'classnames'

const RequireAuth: React.FC = () => {
  return (
    <div className={$['comp-require-auth']}>
      <i className={classNames('octicon', 'octicon-lock', $['icon'])} />
      <p className={$['paragraph']}>로그인이 필요한 서비스입니다.</p>
    </div>
  )
}

export default RequireAuth
