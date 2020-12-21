import getState from '@/modules/get-state'
import React, { useEffect, useRef, useState } from 'react'
import $ from './style.module.scss'

type InfiniteScrollContainerProps = {
  strategy: () => Promise<boolean>
}

const InfiniteScrollContainer: React.FC<InfiniteScrollContainerProps> = ({
  strategy,
  children,
}) => {
  const bodyContentBottomRef = useRef<HTMLDivElement>(null)
  const [, setIsLoading] = useState(false)
  const [, setNoMore] = useState(false)

  function isReachBottom(
    ref: React.MutableRefObject<HTMLElement | null>
  ): boolean {
    if (ref.current) {
      return window.innerHeight < ref.current.getBoundingClientRect().bottom
    }
    return false
  }

  const processStrategy = React.useCallback(async () => {
    const isLoading = await getState(setIsLoading)
    const noMore = await getState(setNoMore)

    if (noMore) return
    if (isLoading) return

    setIsLoading(true)

    const loadingIndicator = document.querySelector(
      `.${$['loading-indicator']}`
    )

    if (!loadingIndicator) return

    loadingIndicator.classList.add($['processing'])

    const shouldProcessAgain = await strategy()

    setIsLoading(false)

    setTimeout(() => {
      if (!loadingIndicator) return

      loadingIndicator.classList.remove($['processing'])
    }, 700)

    if (shouldProcessAgain === false) {
      setNoMore(true)
      return
    }

    if (!isReachBottom(bodyContentBottomRef)) {
      processStrategy()
    }
  }, [strategy])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const sentinel = entries[0]

      if (sentinel.isIntersecting) {
        // Load more
        processStrategy()
      }
    })

    if (bodyContentBottomRef.current) {
      observer.observe(bodyContentBottomRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [processStrategy])

  // Reset noMore flag when the strategy changes
  useEffect(() => {
    setNoMore(false)
  }, [strategy])

  return (
    <div className={$['infinite-scroll-container']}>
      {children}
      <div
        className={$['infinite-scroll-bottom-sentinel']}
        ref={bodyContentBottomRef}
      />
      <div className={$['loading-indicator-wrapper']}>
        <div className={$['loading-indicator']}>
          <p>
            <span role="img" aria-label="rocket emoji">
              🚀
            </span>{' '}
            불러오는 중...
          </p>
        </div>
      </div>
    </div>
  )
}

export default InfiniteScrollContainer
