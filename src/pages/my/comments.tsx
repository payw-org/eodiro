import { withRequireAuth } from '@/components/hoc/with-require-auth'
import MyPostsLists from '@/components/my/MyPostsList'
import Body from '@/layouts/BaseLayout/Body'
import $ from './comments.module.scss'

function MyComments() {
  return (
    <Body
      pageTitle="나의 댓글"
      titleAlign="center"
      bodyClassName={$['my-comments-page']}
    >
      <MyPostsLists type="comments" />
    </Body>
  )
}

export default withRequireAuth(MyComments)
