import { authState } from '@/atoms/auth'
import GlobalFooter from '@/components/global/GlobalFooter'
import Navigation, { NavContextProvider } from '@/components/global/Navigation'
import { isApp } from '@/modules/booleans/is-app'
import { eodiroAxios } from '@/modules/client/eodiro-axios'
import { AuthData } from '@/modules/jwt'
import { ApiAuthVerifyResData } from '@/pages/api/auth/verify'
import React, { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import $ from './style.module.scss'

const BaseLayout: React.FC<{ shouldCheckAuth: boolean }> = ({
  children,
  shouldCheckAuth,
}) => {
  const setAuthData = useSetRecoilState(authState)

  useEffect(() => {
    async function init() {
      const responseData = await eodiroAxios<ApiAuthVerifyResData>({
        url: '/api/auth/verify',
        method: 'POST',
      })

      setAuthData(responseData.authData as AuthData)
    }

    if (shouldCheckAuth) {
      init()
    }
  }, [setAuthData, shouldCheckAuth])

  return (
    <NavContextProvider>
      <div id={$['eodiro-app-scaffold']}>
        <div id={$['eodiro-app']}>
          <Navigation />
          {children}
          {!isApp() && <GlobalFooter />}
        </div>
      </div>
    </NavContextProvider>
  )
}

export default BaseLayout
