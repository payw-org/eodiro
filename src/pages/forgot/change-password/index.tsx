import { Button, LineInput } from '@/components/ui'
import { BAD_REQUEST, NOT_FOUND } from '@/constants/http-status-code'
import Body from '@/layouts/BaseLayout/Body'
import ApiHost from '@/modules/api-host'
import EodiroDialog from '@/modules/client/eodiro-dialog'
import { eodiroRequest } from '@/modules/eodiro-request'
import { ApiAuthChangePasswordReqBody } from '@payw/eodiro-server-types/api/auth/change-password'
import {
  ApiAuthValidateRequestBody,
  ApiAuthValidateResponseData,
} from '@payw/eodiro-server-types/api/auth/validate'
import { useRouter } from 'next/router'
import { useState } from 'react'
import $ from './style.module.scss'

const ChangePasswordRequestPage = () => {
  const router = useRouter()
  const token = router.query.t as string
  const [password, setPassword] = useState('')
  const [isValidating, setIsValidating] = useState(false)
  const [isAvailable, setIsAvailable] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const buttonDisabled = !isAvailable || isValidating

  function validatePassword(newPassword: string) {
    setIsValidating(true)

    eodiroRequest<ApiAuthValidateRequestBody, ApiAuthValidateResponseData>({
      method: 'POST',
      url: ApiHost.resolve('/auth/validate'),
      data: {
        password: newPassword,
      },
    })
      .then((data) => {
        if (data.password?.isValid) {
          setErrorMessage('')
          setIsAvailable(true)
        } else {
          setErrorMessage(data.password?.error?.message as string)
          setIsAvailable(false)
        }
      })
      .catch((error) => {
        console.error(error)
        setIsAvailable(false)
      })
      .finally(() => {
        setIsValidating(false)
      })
  }

  function changePassword(newPassword: string) {
    eodiroRequest<ApiAuthChangePasswordReqBody>({
      method: 'POST',
      url: ApiHost.resolve('/auth/change-password'),
      data: {
        newPassword,
        token: token ?? '',
      },
    })
      .then(() => {
        new EodiroDialog().alert('암호가 변경되었습니다.')
        router.push('/log-in')
      })
      .catch((error) => {
        const status = error.response?.status

        if (status === NOT_FOUND) {
          new EodiroDialog().alert(
            '암호 변경 요청이 만료되었거나 유효하지 않습니다. 다시 요청해주세요.'
          )
          router.push('/log-in')
        } else if (status === BAD_REQUEST) {
          new EodiroDialog().alert(error.response?.message)
        }

        console.error(error)
      })
  }

  return (
    <Body
      pageTitle="암호 변경"
      titleAlign="center"
      centered
      bodyClassName={$['change-password-request']}
    >
      <LineInput
        type="password"
        value={password}
        placeholder="새 암호를 입력하세요."
        setValue={setPassword}
        alignCenter
        onChangeThrottle={[validatePassword]}
        disabled={isValidating}
      />
      {errorMessage && (
        <span className="text-eodiro-primary-color mt-2">{errorMessage}</span>
      )}
      <Button
        label="변경하기"
        full
        className={$['change-btn']}
        disabled={buttonDisabled}
        onClick={() => changePassword(password)}
      />
    </Body>
  )
}

export default ChangePasswordRequestPage
