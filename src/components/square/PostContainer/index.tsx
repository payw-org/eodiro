import React, { useEffect, useRef, useState } from 'react'

import ApiHost from '@/modules/api-host'
import { GetPostsOfBoard } from '@payw/eodiro-one-api/api/one/scheme'
import InfiniteScrollContainer from '@/components/utils/InfiniteScrollContainer'
import { OneApiPayloadData } from '@payw/eodiro-one-api/api/one/scheme/types/utils'
import PostItem from './PostItem'
import { ResizeSensor } from 'css-element-queries'
import { Spinner } from '@/components/global/Spinner'
import _ from 'lodash'
import getState from '@/modules/get-state'
import mergeClassNames from '@/modules/merge-class-name'
import { oneAPIClient } from '@payw/eodiro-one-api'
import { pathIds } from '@/config/paths'
import { useRouter } from 'next/router'
import { visualizeBody } from '@/layouts/BaseLayout/Body'

// Dynamic post container component
type PostContainerProps = {
  boardId: number
}
const PostContainer: React.FC<PostContainerProps> = ({ boardId }) => {
  function isFromPostOrNew(): boolean {
    const lastpage = sessionStorage.getItem('lastpage')

    if (!lastpage) return false

    const writePageRegExp = new RegExp(`/square/.*/${pathIds.writePost}`, 'g')
    return (
      lastpage.match(/\/square\/.*\/[0-9]*/g)?.length > 0 ||
      lastpage.match(writePageRegExp)?.length > 0
    )
  }

  // Get board name from router
  const router = useRouter()
  const boardName = router.query.boardName as string

  // Posts init value with cached ones
  const [posts, setPosts] = useState<OneApiPayloadData<GetPostsOfBoard>>([])
  const [isMobile, setIsMobile] = useState(false)
  const postContainerRef = useRef<HTMLDivElement>(null)

  function checkWidth(width: number): void {
    if (width < 400) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }

  useEffect(() => {
    // Check container width for responsive layout
    checkWidth(postContainerRef.current.clientWidth)
    new ResizeSensor(postContainerRef.current, () => {
      checkWidth(postContainerRef.current.clientWidth)
    })
  }, [])

  // Resotre cached data and scroll position
  useEffect(() => {
    if (isFromPostOrNew()) {
      const cached = JSON.parse(sessionStorage.getItem('sbpd'))

      if (cached !== null) {
        setPosts(cached)
      }

      setTimeout(() => {
        window.scrollTo(0, Number(sessionStorage.getItem('sbsp')))
        visualizeBody()
      }, 0)
    } else {
      visualizeBody()
    }
  }, [])

  async function loadMore(): Promise<boolean> {
    const posts = await getState(setPosts)
    const { data: newPosts } = await oneAPIClient(ApiHost.getHost(), {
      action: 'getPostsOfBoard',
      data: {
        boardId,
        lastPostId: _.last(posts)?.id,
        noBody: true,
      },
    })

    if (newPosts.length === 0) {
      return false
    }

    const updatedPosts = [...posts, ...newPosts]
    setPosts(updatedPosts)
    sessionStorage.setItem('sbpd', JSON.stringify(updatedPosts))
  }

  const [isPostsExist, setIsPostsExist] = useState(false)

  useEffect(() => {
    loadMore().then((exist) => setIsPostsExist(exist))
  }, [])

  async function loadNew(): Promise<void> {
    const posts = await getState(setPosts)

    if (posts && posts.length > 0) {
      const { data: recentPosts } = await oneAPIClient(ApiHost.getHost(), {
        action: 'getRecentPostsOfBoard',
        data: {
          boardId,
          mostRecentPostId: posts[0].id,
        },
      })

      if (recentPosts && recentPosts.length > 0) {
        sessionStorage.setItem(
          'sbpd',
          JSON.stringify([...recentPosts, ...posts])
        )
        const updatedPosts = [...recentPosts, ...posts]
        setPosts(updatedPosts)
      }
    }
  }

  // Poll to update new data
  useEffect(() => {
    // Initial refresh
    loadNew()

    const refreshInterval = setInterval(loadNew, 3000)

    return () => {
      clearInterval(refreshInterval)
    }
  }, [])

  return (
    <div
      className={mergeClassNames('posts-container', isMobile && 'mobile')}
      ref={postContainerRef}
    >
      <InfiniteScrollContainer strategy={loadMore}>
        {posts.length > 0 ? (
          posts.map((post) => {
            return <PostItem key={post.id} boardName={boardName} post={post} />
          })
        ) : isPostsExist ? (
          <div className="display-flex justify-content-center">
            <Spinner />
          </div>
        ) : (
          <h3 className="text-align-center">포스트가 없습니다.</h3>
        )}
      </InfiniteScrollContainer>
    </div>
  )
}

export default PostContainer
