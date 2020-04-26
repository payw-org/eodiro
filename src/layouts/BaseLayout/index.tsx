import GlobalFooter from '@/components/global/GlobalFooter'
import Navigation, { NavContextProvider } from '@/components/global/Navigation'
import React from 'react'
import './style.scss'

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
