import { authState } from '@/atoms/auth'
import { canGoBackState } from '@/atoms/navigation'
import GlobalFooter from '@/components/global/GlobalFooter'
import Navigation from '@/components/global/Navigation'
import ApiHost from '@/modules/api-host'
import { isInApp as checkIsInApp } from '@/modules/booleans/is-in-app'
import EodiroDialog from '@/modules/client/eodiro-dialog'
import { eodiroRequest, registerPush } from '@/modules/eodiro-request'
import { ApiAuthVerifyResData } from '@payw/eodiro-server-types/api/auth/verify'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import $ from './style.module.scss'

const BaseLayout: React.FC<{
  shouldCheckAuth: boolean
}> = ({ children, shouldCheckAuth }) => {
  const setAuthData = useSetRecoilState(authState)
  const isInApp = checkIsInApp()

  useEffect(() => {
    async function init() {
      try {
        await eodiroRequest<null, ApiAuthVerifyResData>({
          method: 'post',
          url: ApiHost.resolve('/auth/verify'),
        })

        registerPush()
        setAuthData({ isLoggedIn: true })
      } catch (error) {
        // JWT verification error
        console.error(error)
        new EodiroDialog().alert('토큰 인증에 실패했습니다. 재로그인바랍니다.')
      }
    }

    if (shouldCheckAuth) {
      init()
    }
  }, [setAuthData, shouldCheckAuth])

  const router = useRouter()
  const setCanGoBack = useSetRecoilState(canGoBackState)

  useEffect(() => {
    const f = async (e: MessageEvent) => {
      // TODO: replace raw string data with JSON format
      if (e.data === 'reload') {
        router.reload()
      } else {
        try {
          const parsed = JSON.parse(e.data)
          const { type } = parsed

          if (type === 'redirect') {
            const splitted = parsed.url.split('?')
            const pathnameOnly = splitted[0]
            const query = splitted[1]

            if (window.location.pathname === pathnameOnly) {
              window.location.search = `?${query}`
            } else {
              router.push(parsed.url)
            }
          } else if (type === 'registerPush') {
            const { expoPushToken } = parsed

            try {
              await axios.post('/api/push', {
                expoPushToken,
              })
            } catch (error) {
              console.error(error)
              new EodiroDialog().alert(
                '푸시 토큰 등록에 실패했습니다. 오류가 반복될 시 문의 바랍니다.'
              )
            }
          } else if (type === 'setCanGoBack') {
            const canGoBack = parsed.value
            setCanGoBack(canGoBack)
          }
        } catch (parseError) {
          //
        }
      }
    }

    window.addEventListener('message', f)
    document.addEventListener('message' as any, f)

    return () => {
      window.removeEventListener('message', f)
      document.removeEventListener('message' as any, f)
    }
  }, [router, setCanGoBack])

  return (
    <div id={$['eodiro-app-scaffold']}>
      <div id={$['eodiro-app']}>
        <Navigation />
        {children}
        {!isInApp && <GlobalFooter />}
        {/* {isInApp ? <AppNavigation /> : <GlobalFooter />} */}
      </div>
    </div>
  )
}

export default BaseLayout
