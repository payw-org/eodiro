import { withRequireAuth } from '@/components/hoc/with-require-auth'
import MyPostsLists from '@/components/my/MyPostsList'
import Body from '@/layouts/BaseLayout/Body'
import $ from './bookmarks.module.scss'

function MyBookmarks() {
  return (
    <Body
      pageTitle="나의 책갈피"
      titleAlign="center"
      bodyClassName={$['my-bookmarks-page']}
    >
      <MyPostsLists type="bookmarks" />
    </Body>
  )
}

export default withRequireAuth(MyBookmarks)
