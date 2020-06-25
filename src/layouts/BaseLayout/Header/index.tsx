import {
  NavHiddenDispatchContext,
  NavScrollDispatchContext,
  NavTitleDispatchContext,
} from '@/components/global/Navigation'
import React, { FC, useContext, useEffect, useRef } from 'react'

import $ from './style.module.scss'
import classNames from 'classnames'

export type HeaderProps = {
  titleAlign?: 'left' | 'center'
  titleHidden?: boolean
  pageTitle: string
}

const Header: FC<HeaderProps> = ({ pageTitle, titleAlign, titleHidden }) => {
  const pageAppTitleRef = useRef<HTMLHeadingElement>(null)

  const setNavTitle = useContext(NavTitleDispatchContext)
  const setNavHidden = useContext(NavHiddenDispatchContext)
  const setNavScrolled = useContext(NavScrollDispatchContext)

  useEffect(() => {
    setNavTitle(pageTitle)

    // Sentinel spots
    const overlaySentinelSpot = titleHidden
      ? document.querySelector('.overlay-sentinel-spot')
      : pageAppTitleRef.current
    const titleSentinelSpot = titleHidden
      ? document.querySelector('.title-sentinel-spot')
      : pageAppTitleRef.current

    if (!overlaySentinelSpot) {
      alert(
        `The navigation Overlay Sentinel Spot is not set. Set class name 'overlay-sentinel-spot'.`
      )
    }

    if (!titleSentinelSpot) {
      alert(
        `The navigation Title Sentinel Spot is not set. Set class name 'title-sentinel-spot'.`
      )
    }

    // Create overlay sentinel
    const overlaySentinel = document.createElement('div')
    overlaySentinel.className = $['overlay-sentinel']
    const titleSentinel = document.createElement('div')
    titleSentinel.className = $['title-sentinel']

    // Dynamically append sentinels
    overlaySentinelSpot?.parentElement.insertBefore(
      overlaySentinel,
      overlaySentinelSpot
    )
    titleSentinelSpot?.parentElement.insertBefore(
      titleSentinel,
      titleSentinelSpot.nextSibling
    )

    // Create an intersection observer which is observing the sentinels
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target.isSameNode(titleSentinel)) {
          if (entry.isIntersecting) {
            // Appear
            setNavHidden(true)
          } else {
            // Disappear
            setNavHidden(false)
          }
        } else if (entry.target.isSameNode(overlaySentinel)) {
          if (entry.isIntersecting) {
            setNavScrolled(false)
          } else {
            setNavScrolled(true)
          }
        }
      })
    })

    observer.observe(overlaySentinel)
    observer.observe(titleSentinel)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <h1
      className={classNames(
        $['base-layout-header'],
        titleAlign === 'center' && $['center'],
        titleHidden && $['hidden']
      )}
    >
      <span ref={pageAppTitleRef} className={$['page-title']}>
        {pageTitle}
      </span>
    </h1>
  )
}

export default React.memo(Header, (prev, next) => {
  return prev.pageTitle === next.pageTitle
})
