import { authState } from '@/atoms/auth'
import GlobalFooter from '@/components/global/GlobalFooter'
import Navigation, { NavContextProvider } from '@/components/global/Navigation'
import { isInApp as checkIsInApp } from '@/modules/booleans/is-in-app'
import EodiroDialog from '@/modules/client/eodiro-dialog'
import { eodiroRequest, registerPush } from '@/modules/eodiro-request'
import { AuthData } from '@/modules/jwt'
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
        const responseData = await eodiroRequest<null, ApiAuthVerifyResData>({
          url: '/api/auth/verify',
          method: 'POST',
        })

        await registerPush()

        setAuthData(responseData.authData as AuthData)
      } catch (error) {
        // JWT verification error
        console.error(error)
        new EodiroDialog().alert('토큰 인증에 실패했습니다. 재로그인바랍니다.')
      }
    }

    if (shouldCheckAuth) {
      init()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <NavContextProvider>
      <div id={$['eodiro-app-scaffold']}>
        <div id={$['eodiro-app']}>
          <Navigation />
          {children}
          {!isInApp && <GlobalFooter />}
          {/* {isInApp ? <AppNavigation /> : <GlobalFooter />} */}
        </div>
      </div>
    </NavContextProvider>
  )
}

export default BaseLayout
