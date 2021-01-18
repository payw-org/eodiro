import {
  navHiddenState,
  navScrolledState,
  navTitleState,
} from '@/atoms/navigation'
import { eodiroConsts } from '@/constants'
import classNames from 'classnames'
import React, { FC, useEffect, useRef } from 'react'
import { useSetRecoilState } from 'recoil'
import $ from './style.module.scss'

export type HeaderProps = {
  titleAlign?: 'left' | 'center'
  titleHidden?: boolean
  pageTitle: string
}

const Header: FC<HeaderProps> = ({ pageTitle, titleAlign, titleHidden }) => {
  const pageAppTitleRef = useRef<HTMLHeadingElement>(null)

  const setNavTitle = useSetRecoilState(navTitleState)
  const setNavHidden = useSetRecoilState(navHiddenState)
  const setNavScrolled = useSetRecoilState(navScrolledState)

  useEffect(() => {
    setNavTitle(pageTitle)
  }, [setNavTitle, pageTitle])

  useEffect(() => {
    // Sentinel spots
    const overlaySentinelSpot = titleHidden
      ? document.querySelector(`.${eodiroConsts.OVERLAY_SENTINEL_SPOT}`)
      : pageAppTitleRef.current
    const titleSentinelSpot = titleHidden
      ? document.querySelector(`.${eodiroConsts.TITLE_SENTINEL_SPOT}`)
      : pageAppTitleRef.current

    if (!overlaySentinelSpot) {
      console.error(
        `The navigation Overlay Sentinel Spot is not set. Set class name '${eodiroConsts.OVERLAY_SENTINEL_SPOT}'.`
      )
    }

    if (!titleSentinelSpot) {
      console.error(
        `The navigation Title Sentinel Spot is not set. Set class name '${eodiroConsts.TITLE_SENTINEL_SPOT}'.`
      )
    }

    // Create overlay sentinel
    const overlaySentinel = document.createElement('div')
    overlaySentinel.className = $['overlay-sentinel']
    const titleSentinel = document.createElement('div')
    titleSentinel.className = $['title-sentinel']

    // Dynamically append sentinels
    overlaySentinelSpot?.parentElement?.insertBefore(
      overlaySentinel,
      overlaySentinelSpot
    )
    titleSentinelSpot?.parentElement?.insertBefore(
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
  }, [setNavHidden, setNavScrolled, setNavTitle, titleHidden])

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
