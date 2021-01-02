import { reactNativeWebViewPostMessage } from '@/modules/native/react-native-webview'
import { Dispatcher } from '@/types/react-helper'
import React, { createContext, useEffect, useState } from 'react'

// Nav hidden context
export const NavHiddenStateContext = createContext<boolean>(false)
export const NavHiddenDispatchContext = createContext<Dispatcher<boolean>>(
  () => {}
)
export const NavHiddenContextProvider: React.FC = ({ children }) => {
  const [hidden, setHidden] = useState(true)

  return (
    <NavHiddenDispatchContext.Provider value={setHidden}>
      <NavHiddenStateContext.Provider value={hidden}>
        {children}
      </NavHiddenStateContext.Provider>
    </NavHiddenDispatchContext.Provider>
  )
}

// Nav scroll context
export const NavScrollStateContext = createContext<boolean>(false)
export const NavScrollDispatchContext = createContext<Dispatcher<boolean>>(
  () => {}
)
export const NavScrollContextProvider: React.FC = ({ children }) => {
  const [scroll, setScroll] = useState(false)

  useEffect(() => {
    reactNativeWebViewPostMessage({
      key: 'navScroll',
      value: scroll,
    })
  }, [scroll])

  return (
    <NavScrollDispatchContext.Provider value={setScroll}>
      <NavScrollStateContext.Provider value={scroll}>
        {children}
      </NavScrollStateContext.Provider>
    </NavScrollDispatchContext.Provider>
  )
}

// Nav title context
export const NavTitleStateContext = createContext<string>('')
export const NavTitleDispatchContext = createContext<Dispatcher<string>>(
  () => {}
)
export const NavTitleContextProvider: React.FC = ({ children }) => {
  const [title, setTitle] = useState('')

  return (
    <NavTitleDispatchContext.Provider value={setTitle}>
      <NavTitleStateContext.Provider value={title}>
        {children}
      </NavTitleStateContext.Provider>
    </NavTitleDispatchContext.Provider>
  )
}

// Nav menu open context
export const NavMenuOpenStateContext = createContext<boolean>(false)
export const NavMenuOpenDispatchContext = createContext<Dispatcher<boolean>>(
  () => {}
)
export const NavMenuOpenContextProvider: React.FC = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <NavMenuOpenDispatchContext.Provider value={setMenuOpen}>
      <NavMenuOpenStateContext.Provider value={menuOpen}>
        {children}
      </NavMenuOpenStateContext.Provider>
    </NavMenuOpenDispatchContext.Provider>
  )
}

export const NavContextProvider: React.FC = ({ children }) => {
  return (
    <NavHiddenContextProvider>
      <NavScrollContextProvider>
        <NavTitleContextProvider>
          <NavMenuOpenContextProvider>{children}</NavMenuOpenContextProvider>
        </NavTitleContextProvider>
      </NavScrollContextProvider>
    </NavHiddenContextProvider>
  )
}
