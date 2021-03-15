import { Button, LineInput } from '@/components/ui'
import Body from '@/layouts/BaseLayout/Body'
import EodiroDialog from '@/modules/client/eodiro-dialog'
import { logInUrl } from '@/utils/page-urls'
import { ApiAuthJoinRequestBody } from '@payw/eodiro-server-types/api/auth/join'
import Axios from 'axios'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import $ from './style.module.scss'

type ChangePasswordRequestPageProps = {
  userId: number
  valid: boolean
}

const ChangePasswordRequestPage: NextPage<ChangePasswordRequestPageProps> = ({
  userId,
  valid,
}) => {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [validating, setValidating] = useState(false)

  async function change(): Promise<void> {
    setValidating(true)

    const { data } = await Axios.post('/api/auth/validate', {
      password,
    } as ApiAuthJoinRequestBody)

    if (!data.password?.isValid) {
      new EodiroDialog().alert(data.password?.error?.message)
    } else {
      try {
        await Axios.post('/api/auth/change-password', {
          userId,
          password,
        })

        new EodiroDialog().alert('변경되었습니다. 다시 로그인 해주세요.')
        router.push(logInUrl)
      } catch (error) {
        new EodiroDialog().alert(
          '암호 변경에 실패했습니다. 반복 시 문의해주세요.'
        )
      }
    }

    setValidating(false)
  }

  return (
    <Body
      pageTitle={valid ? '새 암호 입력' : '오류'}
      titleAlign="center"
      centered
      bodyClassName={$['change-password-request']}
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
            className={$['change-btn']}
            disabled={validating}
            onClick={change}
          />
        </>
      )}
      {!valid && <p>암호 변경 요청이 만료되었거나 유효하지 않습니다.</p>}
    </Body>
  )
}

export default ChangePasswordRequestPage
