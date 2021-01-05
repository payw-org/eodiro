import { authState } from '@/atoms/auth'
import GlobalFooter from '@/components/global/GlobalFooter'
import Navigation, { NavContextProvider } from '@/components/global/Navigation'
import { isInApp } from '@/modules/booleans/is-in-app'
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
        window.alert(error)
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
          {!isInApp() && <GlobalFooter />}
        </div>
      </div>
    </NavContextProvider>
  )
}

export default BaseLayout
