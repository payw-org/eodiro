import React, { useContext, useEffect } from 'react'

import Router from 'next/router'

export const ScrollPositionContext = React.createContext({
  triggerScroll: () => null,
})

export const useScrollPosition = () => useContext(ScrollPositionContext)

let routerBound = false
let shouldScrollRestore = false
let scrollRestored = false

const cachedScrollPositions: {
  [asPath: string]: { x: number; y: number }
} = {}

/**
 * - Save the scroll position mapped to the current url on navigation
 * - Mark shouldScrollRestore on beforePopState to trigger scrollTo only for back/next navigation
 * - Remove scroll position when normally navigating in: Refresh, links
 * - (Re-)trigger scrollTo after all content is loaded with triggerScroll
 *
 * Inspired by https://github.com/zeit/next.js/issues/3303#issuecomment-562581796
 */
const ScrollPositionProvider = ({ children }) => {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Commented out because I'm not sure if its necessary
    // if (window?.history?.scrollRestoration) {
    //   window.history.scrollRestoration = 'manual';
    // }

    const handleChangeStart = () => {
      cachedScrollPositions[Router.asPath] = {
        x: window.scrollX || window.pageXOffset,
        y: window.scrollY || window.pageYOffset,
      }
      scrollRestored = false
    }

    const handleChangeComplete = () => {
      if (shouldScrollRestore && cachedScrollPositions[Router.asPath]) {
        const { x, y } = cachedScrollPositions[Router.asPath]
        window.scrollTo(x, y)
        shouldScrollRestore = false
        scrollRestored = true
      }
    }

    if (!routerBound) {
      routerBound = true
      Router.events.on('routeChangeStart', handleChangeStart)
      Router.events.on('routeChangeComplete', handleChangeComplete)
    }

    Router.beforePopState(() => {
      shouldScrollRestore = true
      return true
    })

    // // Commented out because not sure if it works
    // return () => {
    //   router.events.off('routeChangeStart', handleChangeStart);
    //   router.events.on('routeChangeComplete', handleChangeComplete);
    // };
  })

  const triggerScroll = () => {
    if (scrollRestored && cachedScrollPositions[Router.asPath]) {
      const { x, y } = cachedScrollPositions[Router.asPath]
      window.scrollTo(x, y)
    }
  }

  return (
    <ScrollPositionContext.Provider value={{ triggerScroll }}>
      {children}
    </ScrollPositionContext.Provider>
  )
}

export default ScrollPositionProvider
