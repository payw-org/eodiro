import './style.scss'

const RequireAuth: React.FC = () => {
  return (
    <div className="comp-require-auth">
      <i className="octicon octicon-lock icon" />
      <p className="paragraph">로그인이 필요한 서비스입니다.</p>
    </div>
  )
}

export default RequireAuth
