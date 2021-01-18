import { Icon } from '@/components/ui/Icon'
import { Flex } from '@/components/ui/layouts/Flex'
import { friendlyTime } from '@/modules/time'
import { CommunityPostWithCounts } from '@/pages/api/types'
import { SafeCommunityPost } from '@/types/schema'
import { communityPostPageUrl } from '@/utils/page-urls'
import classNames from 'classnames'
import Link from 'next/link'
import $ from './style.module.scss'

const PostItem: React.FC<{
  post: SafeCommunityPost
}> = ({ post }) => {
  const {
    title,
    boardId,
    likesCount,
    bookmarksCount,
    commentsCount,
    postedAt,
  } = post

  return (
    <Link href={communityPostPageUrl(boardId, post.id)}>
      <div key={post.id} className={$['post-item']}>
        <Flex column alignStart>
          <p className={$['post-title']}>{title}</p>
          <Flex className={$['counts']} alignCenter>
            <Flex
              alignCenter
              className={classNames($['count-item'], $['likes-count'], {
                [$['empty']]: likesCount === 0,
              })}
            >
              <Icon name="hand_thumbsup" />
              {likesCount}
            </Flex>
            <Flex
              alignCenter
              className={classNames($['count-item'], $['bookmarks-count'], {
                [$['empty']]: bookmarksCount === 0,
              })}
            >
              <Icon name="bookmark" />
              {bookmarksCount}
            </Flex>
            <Flex
              alignCenter
              className={classNames($['count-item'], $['comments-count'], {
                [$['empty']]: commentsCount === 0,
              })}
            >
              <Icon name="bubble_left" />
              {commentsCount}
            </Flex>
          </Flex>
        </Flex>
        <span className={$['post-time']}>{friendlyTime(postedAt)}</span>
      </div>
    </Link>
  )
}

export const PostsList: React.FC<{
  posts: CommunityPostWithCounts[]
}> = ({ posts }) => {
  return (
    <div className={$['posts-list']}>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  )
}
