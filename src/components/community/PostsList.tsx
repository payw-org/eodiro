import { friendlyTime } from '@/modules/time'
import { CommunityPostWithCommentsCount } from '@/pages/api/types'
import { postPageUrl } from '@/pages/community/board/[boardId]/post/[postId]'
import Link from 'next/link'
import $ from './PostsList.module.scss'

const PostItem: React.FC<{
  boardId: number
  post: CommunityPostWithCommentsCount
}> = ({ boardId, post }) => {
  return (
    <Link href={postPageUrl(boardId, post.id)}>
      <div key={post.id} className={$['post-item']}>
        <p className={$['post-title']}>{post.title}</p>
        <span className={$['post-time']}>{friendlyTime(post.postedAt)}</span>
      </div>
    </Link>
  )
}

export const PostsList: React.FC<{
  boardId: number
  posts: CommunityPostWithCommentsCount[]
}> = ({ boardId, posts }) => {
  return (
    <div className={$['posts-list']}>
      {posts.map((post) => (
        <PostItem key={post.id} boardId={boardId} post={post} />
      ))}
    </div>
  )
}
