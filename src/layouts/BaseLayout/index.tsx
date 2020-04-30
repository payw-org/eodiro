import './style.scss'

import Navigation, { NavContextProvider } from '@/components/global/Navigation'

import GlobalFooter from '@/components/global/GlobalFooter'
import React from 'react'

const BaseLayout: React.FC = (props) => {
  return (
    <NavContextProvider>
      <div id="eodiro-app-scaffold">
        <div id="eodiro-app">
          <Navigation />
          {props.children}
          <GlobalFooter />
        </div>
      </div>
    </NavContextProvider>
  )
}

export default BaseLayout
