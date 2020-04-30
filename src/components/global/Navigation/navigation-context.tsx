import React, { createContext, useState } from 'react'

import { Dispatcher } from '@/types/react-helper'

// Nav hidden context
export const NavHiddenStateContext = createContext<boolean>(undefined)
export const NavHiddenDispatchContext = createContext<Dispatcher<boolean>>(
  undefined
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
export const NavScrollStateContext = createContext<boolean>(undefined)
export const NavScrollDispatchContext = createContext<Dispatcher<boolean>>(
  undefined
)
export const NavScrollContextProvider: React.FC = ({ children }) => {
  const [scroll, setScroll] = useState(false)

  return (
    <NavScrollDispatchContext.Provider value={setScroll}>
      <NavScrollStateContext.Provider value={scroll}>
        {children}
      </NavScrollStateContext.Provider>
    </NavScrollDispatchContext.Provider>
  )
}

// Nav title context
export const NavTitleStateContext = createContext<string>(undefined)
export const NavTitleDispatchContext = createContext<Dispatcher<string>>(
  undefined
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
export const NavMenuOpenStateContext = createContext<boolean>(undefined)
export const NavMenuOpenDispatchContext = createContext<Dispatcher<boolean>>(
  undefined
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
