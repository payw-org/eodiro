import BoardSideBar from '@/components/community/BoardSideBar'
import { PostsList } from '@/components/community/PostsList'
import ServerError from '@/components/global/ServerError'
import { Spinner } from '@/components/global/Spinner'
import { withRequireAuth } from '@/components/hoc/with-require-auth'
import { ArrowBlock } from '@/components/ui'
import { Icon } from '@/components/ui/Icon'
import { Flex } from '@/components/ui/layouts/Flex'
import Pagination from '@/components/ui/Pagination'
import Body from '@/layouts/BaseLayout/Body'
import ApiHost from '@/modules/api-host'
import { ApiCommunityGetPopularPostsResData } from '@payw/eodiro-server-types/api/community/popular-posts'
import { useRouter } from 'next/router'
import useSWR from 'swr'

function CommunityPopularPage() {
  const router = useRouter()
  const page = parseInt(router.query.page as string, 10)
  // convert page to number
  const { data, error } = useSWR<ApiCommunityGetPopularPostsResData>(
    ApiHost.resolve(
      `/community/posts/popular?page=${!globalThis.isNaN(page) ? page : 1}`
    )
  )

  return (
    <Body pageTitle="인기 게시물">
      <div className="flex flex-row flex-wrap">
        <div className="posts-column flex-1">
          <ArrowBlock flat noPadding customHeight className="mb-4">
            <div className="p-2 text-center">
              <Icon name="info_circle_fill" className="mr-2" />
              좋아요가 10개 이상이면 인기 게시물에 표시됩니다.
            </div>
          </ArrowBlock>
          <div>
            {error ? (
              <ServerError />
            ) : data ? (
              <>
                <ArrowBlock flat>
                  <PostsList posts={data.popularPosts} />
                </ArrowBlock>
                <Pagination
                  totalPage={data.totalPage}
                  currentPage={data.page}
                  onPressPage={(pressedPage) => {
                    router.push(`/community/popular?page=${pressedPage}`)
                  }}
                />
              </>
            ) : (
              <ArrowBlock flat>
                <Flex center>
                  <Spinner />
                </Flex>
              </ArrowBlock>
            )}
          </div>
        </div>

        <BoardSideBar />
      </div>
    </Body>
  )
}

export default withRequireAuth(CommunityPopularPage)
