import $ from './style.module.scss'
import EodiroLink from '@/components/utils/EodiroLink'
import { GetPostsOfBoard } from '@payw/eodiro-one-api/api/one/scheme'
import Link from 'next/link'
import { OneApiPayloadData } from '@payw/eodiro-one-api/api/one/scheme/types/utils'
import React from 'react'
import Time from '@/modules/time'
import { Unpacked } from '@/types/unpacked'
import classNames from 'classnames'

// Post item component (memoized)
const PostItem: React.FC<{
  boardName: string
  post: Unpacked<OneApiPayloadData<GetPostsOfBoard>>
}> = React.memo(({ boardName, post }) => {
  return (
    // <Link
    //   key={post.id}
    //   href="/square/[boardName]/[postId]"
    //   as={`/square/${boardName}/${post.id}`}
    // >
    //   <a
    // onClick={(): void => {
    //   sessionStorage.setItem('sbsp', window.scrollY?.toString())
    // }}
    //   >
    <EodiroLink
      key={post.id}
      href="/square/[boardName]/[postId]"
      as={`/square/${boardName}/${post.id}`}
      onClick={(): void => {
        sessionStorage.setItem('sbsp', window.scrollY?.toString())
      }}
    >
      <div className={classNames($['post'])}>
        <div className="display-flex flex-direction-row align-items-center justify-content-space-between">
          <p className={$['title']}>{post.title}</p>

          {/* Post comments amount */}
          {post.comment_count > 0 && (
            <div
              className={classNames(
                $['comments'],
                'font-weight-bold',
                'display-flex',
                'align-items-center'
              )}
            >
              <i className={`octicon octicon-comment ${$['icon']}`} />
              <span className={$['count']}>{post.comment_count}</span>
            </div>
          )}

          {/* Post likes amount */}
          {post.likes && (
            <div className={$['likes']}>
              <i className={`octicon octicon-thumbsup ${$['icon']}`} />
              <span className={$['count']}>{post.likes}</span>
            </div>
          )}
        </div>
        <div className={$['right']}>
          <p className={$['nick']}>{post.random_nickname}</p>
          <p className={$['time']}>{Time.friendly(post.uploaded_at)}</p>
        </div>
      </div>
    </EodiroLink>
    //   </a>
    // </Link>
  )
})

export default PostItem
