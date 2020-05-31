import Navigation, { NavContextProvider } from '@/components/global/Navigation'

import $ from './style.module.scss'
import GlobalFooter from '@/components/global/GlobalFooter'
import React from 'react'
import { isApp } from '@/modules/booleans/is-app'

const BaseLayout: React.FC = (props) => {
  return (
    <NavContextProvider>
      <div id={$['eodiro-app-scaffold']}>
        <div id={$['eodiro-app']}>
          <Navigation />
          {props.children}
          {!isApp() && <GlobalFooter />}
        </div>
      </div>
    </NavContextProvider>
  )
}

export default BaseLayout
