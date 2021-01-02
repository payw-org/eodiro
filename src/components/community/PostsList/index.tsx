import { Icon } from '@/components/ui/Icon'
import { Flex } from '@/components/ui/layouts/Flex'
import { friendlyTime } from '@/modules/time'
import { CommunityPostWithCounts } from '@/pages/api/types'
import { communityPostPageUrl } from '@/utils/page-urls'
import classNames from 'classnames'
import Link from 'next/link'
import $ from './style.module.scss'

const PostItem: React.FC<{
  post: CommunityPostWithCounts
}> = ({ post }) => {
  return (
    <Link href={communityPostPageUrl(post.boardId, post.id)}>
      <div key={post.id} className={$['post-item']}>
        <Flex column alignStart>
          <p className={$['post-title']}>{post.title}</p>
          <Flex className={$['counts']} alignCenter>
            <Flex
              alignCenter
              className={classNames($['count-item'], $['likes-count'])}
            >
              <Icon name="hand_thumbsup" />
              {post.communityPostLikesCount}
            </Flex>
            <Flex
              alignCenter
              className={classNames($['count-item'], $['bookmarks-count'])}
            >
              <Icon name="bookmark" />
              {post.communityPostBookmarksCount}
            </Flex>
            <Flex
              alignCenter
              className={classNames($['count-item'], $['comments-count'])}
            >
              <Icon name="bubble_left" />
              {post.communityCommentsCount}
            </Flex>
          </Flex>
        </Flex>
        <span className={$['post-time']}>{friendlyTime(post.postedAt)}</span>
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
