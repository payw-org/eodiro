import { withRequireAuth } from '@/components/hoc/with-require-auth'
import MyPostsLists from '@/components/my/MyPostsList'
import Body from '@/layouts/BaseLayout/Body'
import $ from './posts.module.scss'

function MyPosts() {
  return (
    <Body
      pageTitle="나의 게시물"
      titleAlign="center"
      bodyClassName={$['my-posts-page']}
    >
      <MyPostsLists type="posts" />
    </Body>
  )
}

export default withRequireAuth(MyPosts)
