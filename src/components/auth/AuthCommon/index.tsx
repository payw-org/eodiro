import { authState } from '@/atoms/auth'
import { Button, LineInput } from '@/components/ui'
import Body from '@/layouts/BaseLayout/Body'
import ApiHost from '@/modules/api-host'
import EodiroDialog from '@/modules/client/eodiro-dialog'
import { eodiroRequest, registerPush } from '@/modules/eodiro-request'
import { ApiAuthForgotReqBody } from '@payw/eodiro-server-types/api/auth/forgot'
import {
  ApiAuthJoinRequestBody,
  ApiAuthJoinResponseData,
} from '@payw/eodiro-server-types/api/auth/join'
import {
  ApiAuthLoginReqBody,
  ApiAuthLoginResData,
} from '@payw/eodiro-server-types/api/auth/log-in'
import {
  ApiAuthValidateRequestBody,
  ApiAuthValidateResponseData,
} from '@payw/eodiro-server-types/api/auth/validate'
import axios from 'axios'
import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import $ from './style.module.scss'

type AuthCommonProps = {
  mode: 'signin' | 'join' | 'forgot'
}

const AuthCommonContent: React.FC<AuthCommonProps> = ({ mode }) => {
  const router = useRouter()

  const setAuth = useSetRecoilState(authState)

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

  async function logIn(): Promise<void> {
    setValidating(true)

    const loginData: ApiAuthLoginReqBody = {
      portalId,
      password,
    }

    const res = await axios
      .post<ApiAuthLoginResData>(ApiHost.resolve('/auth/log-in'), loginData, {
        withCredentials: true,
      })
      .finally(() => {
        setValidating(false)
      })

    if (res.data.isSigned) {
      setAuth({ isLoggedIn: true })
      registerPush()
      // window.location.replace(Cookie.get(eodiroConst.LAST_PATH) ?? '/')
      window.location.replace('/')
    } else {
      setSignInFailed(true)
    }
  }

  async function join(): Promise<void> {
    setValidating(true)

    const joinData: ApiAuthJoinRequestBody = { portalId, nickname, password }
    const response = await axios.post<ApiAuthJoinResponseData>(
      '/auth/join',
      joinData
    )

    setValidating(false)

    if (response.data.hasJoined) {
      alert(
        '중앙대학교 포탈 이메일로 인증 이메일이 발송되었습니다. 인증 후 로그인 해주세요. 인증 메일은 30분동안 유효합니다.'
      )
      router.push('/login')
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

  // TODO: Forgot
  async function forgot(): Promise<void> {
    setValidating(true)

    try {
      await eodiroRequest<ApiAuthForgotReqBody>({
        url: ApiHost.resolve('/auth/forgot'),
        method: 'post',
        data: {
          portalId,
        },
      })

      new EodiroDialog().alert(
        '포탈 이메일로 암호 변경 요청 이메일을 발송했습니다.'
      )

      router.push('/')
    } catch (error) {
      setValidating(false)

      if (error.response?.status === 404) {
        new EodiroDialog().alert('가입되어 있지 않은 포탈 아이디입니다.')
      } else {
        new EodiroDialog().alert('서버에 문제가 발생했습니다.')
      }
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
              const response = await axios.post<ApiAuthValidateResponseData>(
                '/auth/validate',
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
                const response = await axios.post<ApiAuthValidateResponseData>(
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
                logIn()
              } else if (mode === 'join') {
                join()
              }
            }}
            disabled={validating}
            onChangeThrottle={[
              async (value): Promise<void> => {
                if (mode === 'join') {
                  const response = await axios.post<ApiAuthValidateResponseData>(
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
              logIn()
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
              이미 가입했나요? <Link href="/login">로그인 →</Link>
            </p>
          )}
          {mode === 'signin' && (
            <>
              <p className={$['new']}>
                <b style={{ fontWeight: 600 }}>어디로</b>에 처음이신가요?{' '}
                <Link href="/join">
                  <a className={$['join']}>회원가입 →</a>
                </Link>
              </p>
              <p className={$['forgot']}>
                암호를 잊으셨나요?{' '}
                <Link href="/forgot">
                  <a className={$['join']}>암호 변경 →</a>
                </Link>
              </p>
            </>
          )}
          <p>
            <Link href="/privacy">개인정보 처리방침</Link>
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
