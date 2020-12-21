import GlobalFooter from '@/components/global/GlobalFooter'
import Navigation, { NavContextProvider } from '@/components/global/Navigation'
import { isApp } from '@/modules/booleans/is-app'
import React from 'react'
import $ from './style.module.scss'

const BaseLayout: React.FC = ({ children }) => {
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
