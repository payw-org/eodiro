import { authState } from '@/atoms/auth'
import GlobalFooter from '@/components/global/GlobalFooter'
import Navigation from '@/components/global/Navigation'
import { isInApp as checkIsInApp } from '@/modules/booleans/is-in-app'
import EodiroDialog from '@/modules/client/eodiro-dialog'
import { eodiroRequest, registerPush } from '@/modules/eodiro-request'
import { ApiAuthVerifyResData } from '@/pages/api/auth/verify'
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
          url: '/api/auth/verify',
          method: 'POST',
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
