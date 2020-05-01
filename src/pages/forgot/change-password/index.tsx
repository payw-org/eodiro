import './style.scss'

import { Button, LineInput } from '@/components/ui'

import { AuthApi } from '@/api'
import Body from '@/layouts/BaseLayout/Body'
import { EodiroPage } from '@/pages/_app'
import { useState } from 'react'

type ChangePasswordRequestPageProps = {
  token: string
  valid: boolean
}

const ChangePasswordRequestPage: EodiroPage<ChangePasswordRequestPageProps> = ({
  token,
  valid,
}) => {
  const [password, setPassword] = useState('')
  const [validating, setValidating] = useState(false)

  async function change(): Promise<void> {
    setValidating(true)

    const valid = await AuthApi.validatePassword(password)

    if (!valid) {
      alert('사용할 수 없는 암호입니다. 최소 8자 이상 입력해주세요.')
    } else {
      const changed = await AuthApi.changePassword(token, password)

      if (changed) {
        alert('변경되었습니다.')
        location.href = '/signin'
      } else {
        alert('변경에 실패했습니다.')
      }
    }

    setValidating(false)
  }

  return (
    <Body
      pageTitle={valid ? '새 암호 입력' : '오류'}
      titleAlign="center"
      centered
      bodyClassName="change-password-request"
    >
      {valid && (
        <>
          <LineInput
            type="password"
            value={password}
            setValue={setPassword}
            alignCenter
            onEnter={change}
            disabled={validating}
          />
          <Button
            label="변경하기"
            full
            className="change-btn"
            disabled={validating}
            onClick={change}
          />
        </>
      )}
      {!valid && <p>암호 변경 요청이 만료되었거나 유효하지 않습니다.</p>}
    </Body>
  )
}

ChangePasswordRequestPage.getInitialProps = async (
  ctx
): Promise<ChangePasswordRequestPageProps> => {
  const token = ctx.query.t as string
  const valid = await AuthApi.checkPasswordChange(token)

  return {
    token,
    valid,
  }
}

export default ChangePasswordRequestPage
