import { AuthApi } from '@/api'
import { Button, LineInput } from '@/components/ui'
import EodiroLink from '@/components/utils/EodiroLink'
import Body from '@/layouts/BaseLayout/Body'
import {
  ApiAuthJoinRequestBody,
  ApiAuthJoinResponseData,
} from '@/pages/api/auth/join'
import {
  ApiAuthLoginReqBody,
  ApiAuthLoginResData,
} from '@/pages/api/auth/login'
import {
  ApiAuthValidateRequestBody,
  ApiAuthValidateResponseData,
} from '@/pages/api/auth/validate'
import Axios from 'axios'
import classNames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import $ from './style.module.scss'

type AuthCommonProps = {
  mode: 'signin' | 'join' | 'forgot'
}

const AuthCommonContent: React.FC<AuthCommonProps> = ({ mode }) => {
  const [validating, setValidating] = useState(false)
  const [signInFailed, setSignInFailed] = useState(false)

  const [portalId, setPortalId] = useState('')
  const [isValidPortalId, setIsValidPortalId] = useState(true)
  const [portalIdErrorMessage, setPortalIdErrorMessage] = useState('')
  const portalIdRef = useRef<HTMLInputElement>(null)
  function focusPortalId(): void {
    if (!portalIdRef.current) return
    portalIdRef.current.focus()
  }
  useEffect(() => {
    focusPortalId()
  }, [])

  const [nickname, setNickname] = useState('')
  const [isValidNickname, setIsValidNickname] = useState(true)
  const [nicknameErrorMessage, setNicknameErrorMessage] = useState('')
  const nicknameRef = useRef<HTMLInputElement>(null)

  const [password, setPassword] = useState('')
  const [isValidPassword, setIsValidPassword] = useState(true)
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
  const passwordRef = useRef<HTMLInputElement>(null)

  function focusPassword(): void {
    if (passwordRef.current) {
      passwordRef.current.focus()
    }
  }

  async function login(): Promise<void> {
    setValidating(true)

    const loginData: ApiAuthLoginReqBody = {
      portalId,
      password,
    }
    const res = await Axios.post<ApiAuthLoginResData>(
      '/api/auth/login',
      loginData
    )

    setValidating(false)

    if (res.data.isSigned) {
      window.location.href = '/'
    } else {
      setSignInFailed(true)
    }
  }

  async function join(): Promise<void> {
    setValidating(true)

    const joinData: ApiAuthJoinRequestBody = { portalId, nickname, password }
    const response = await Axios.post<ApiAuthJoinResponseData>(
      '/api/auth/join',
      joinData
    )

    setValidating(false)

    if (response.data.hasJoined) {
      alert(
        '중앙대학교 포탈로 인증 이메일이 발송되었습니다. 인증 후 로그인하세요.'
      )
      window.location.href = '/signin'
    } else {
      const { validations } = response.data

      setIsValidPortalId(validations.portalId.isValid)
      setPortalIdErrorMessage(validations.portalId.error?.message ?? '')
      setIsValidNickname(validations.nickname.isValid)
      setNicknameErrorMessage(validations.nickname.error?.message ?? '')
      setIsValidPassword(validations.password.isValid)
      setPasswordErrorMessage(validations.password.error?.message ?? '')
    }
  }

  async function forgot(): Promise<void> {
    setValidating(true)

    const available = await AuthApi.validatePortalId(portalId, true)
    if (!available) {
      alert('등록되지 않은 포탈 아이디입니다.')
      setValidating(false)
      focusPortalId()
    } else {
      const changed = await AuthApi.requestPasswordChange(portalId)
      if (changed) {
        alert('암호 변경 이메일을 발송했습니다.')
        setPortalId('')
      }
      setValidating(false)
    }
  }

  const buttonLabelsMap: Record<typeof mode, string> = {
    signin: '로그인',
    join: '회원가입',
    forgot: '변경 이메일 발송',
  }

  return (
    <div id={$['eodiro-signin']}>
      <div className={$['signin-box']}>
        <LineInput
          ref={portalIdRef}
          className={classNames($['field'], $['id'])}
          placeholder="포탈 아이디"
          value={portalId}
          setValue={setPortalId}
          onEnter={(): void => {
            if (nicknameRef.current) {
              nicknameRef.current.focus()
            } else if (passwordRef.current) {
              passwordRef.current.focus()
            } else if (mode === 'forgot') {
              forgot()
            }
          }}
          disabled={validating}
          onChangeThrottle={[
            async (value): Promise<void> => {
              if (mode !== 'join') return

              const validatingData: ApiAuthValidateRequestBody = {
                portalId: value,
              }
              const response = await Axios.post<ApiAuthValidateResponseData>(
                '/api/auth/validate',
                validatingData
              )

              setIsValidPortalId(response.data.portalId?.isValid ?? false)

              if (!response.data.portalId?.isValid) {
                setPortalIdErrorMessage(
                  response.data.portalId?.error?.message ?? ''
                )
              }
            },
          ]}
          onFocus={(): void => {
            setSignInFailed(false)
          }}
        />

        {mode === 'join' && !isValidPortalId && (
          <p className={$['error']}>{portalIdErrorMessage}</p>
        )}

        {mode === 'join' && (
          <LineInput
            ref={nicknameRef}
            className={classNames($['field'], $['nickname'])}
            placeholder="닉네임"
            value={nickname}
            setValue={setNickname}
            disabled={validating}
            onChangeThrottle={[
              async (value): Promise<void> => {
                const response = await Axios.post<ApiAuthValidateResponseData>(
                  '/api/auth/validate',
                  {
                    nickname: value,
                  } as ApiAuthJoinRequestBody
                )

                setIsValidNickname(response.data.nickname?.isValid ?? false)

                if (!response.data.nickname?.isValid) {
                  setNicknameErrorMessage(
                    response.data.nickname?.error?.message ?? ''
                  )
                }
              },
            ]}
            onEnter={focusPassword}
            autoComplete="off"
          />
        )}

        {mode === 'join' && !isValidNickname && (
          <p className={$['error']}>{nicknameErrorMessage}</p>
        )}

        {mode !== 'forgot' && (
          <LineInput
            ref={passwordRef}
            className={classNames($['field'], $['pw'])}
            type="password"
            placeholder="암호"
            value={password}
            setValue={setPassword}
            onEnter={(): void => {
              if (mode === 'signin') {
                login()
              } else if (mode === 'join') {
                join()
              }
            }}
            disabled={validating}
            onChangeThrottle={[
              async (value): Promise<void> => {
                if (mode === 'join') {
                  const response = await Axios.post<ApiAuthValidateResponseData>(
                    '/api/auth/validate',
                    {
                      password: value,
                    } as ApiAuthJoinRequestBody
                  )

                  setIsValidPassword(response.data.password?.isValid ?? false)

                  if (!response.data.password?.isValid) {
                    setPasswordErrorMessage(
                      response.data.password?.error?.message ?? ''
                    )
                  }
                }
              },
            ]}
            onFocus={(): void => {
              setSignInFailed(false)
            }}
          />
        )}

        {mode === 'join' && !isValidPassword && (
          <p className={$['error']}>{passwordErrorMessage}</p>
        )}

        {signInFailed && (
          <p className={$['error']}>아이디 또는 암호가 잘못되었습니다.</p>
        )}

        <Button
          label={buttonLabelsMap[mode]}
          full
          className={$['btn']}
          disabled={validating}
          onClick={(): void => {
            if (mode === 'signin') {
              login()
            } else if (mode === 'join') {
              join()
            } else if (mode === 'forgot') {
              forgot()
            }
          }}
        />
        <div className={$['more']}>
          {mode !== 'signin' && (
            <p>
              이미 가입했나요? <EodiroLink href="/signin">로그인 →</EodiroLink>
            </p>
          )}
          {mode === 'signin' && (
            <>
              <p className={$['new']}>
                <b style={{ fontWeight: 600 }}>어디로</b>는 처음인가요?{' '}
                <EodiroLink href="/join" className={$['join']}>
                  회원가입 →
                </EodiroLink>
              </p>
              <p className={$['forgot']}>
                암호를 잊었나요?{' '}
                <EodiroLink href="/forgot" className={$['join']}>
                  암호 변경 →
                </EodiroLink>
              </p>
            </>
          )}
          <p>
            <EodiroLink href="/privacy">개인정보 처리방침</EodiroLink>
          </p>
        </div>
      </div>
    </div>
  )
}

const AuthCommon: React.FC<AuthCommonProps> = (props) => {
  const { mode } = props
  const pageTitlesMap: Record<typeof mode, string> = {
    signin: '로그인',
    join: '회원가입',
    forgot: '암호 변경',
  }

  return (
    <Body
      bodyClassName={$['eodiro-auth-common']}
      centered
      pageTitle={pageTitlesMap[mode]}
      titleAlign="center"
    >
      <AuthCommonContent {...props} />
    </Body>
  )
}

export default AuthCommon
