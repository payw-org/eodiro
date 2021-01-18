import BoardSideBar from '@/components/community/BoardSideBar'
import { PostsList } from '@/components/community/PostsList'
import ServerError from '@/components/global/ServerError'
import { Spinner } from '@/components/global/Spinner'
import { ArrowBlock } from '@/components/ui'
import { Flex } from '@/components/ui/layouts/Flex'
import Pagination from '@/components/ui/Pagination'
import Body from '@/layouts/BaseLayout/Body'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { ApiCommunityGetPopularPostsResData } from '../api/community/get-popular-posts'

export default function CommunityPopularPage() {
  const router = useRouter()
  const page = parseInt(router.query.page as string, 10)
  // convert page to number
  const { data, error } = useSWR<ApiCommunityGetPopularPostsResData>(
    `/api/community/get-popular-posts?page=${
      !globalThis.isNaN(page) ? page : 1
    }`
  )

  return (
    <Body pageTitle="인기 게시물">
      <div className="flex flex-row flex-wrap">
        <div className="posts-column flex-1">
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

        <BoardSideBar />
      </div>
    </Body>
  )
}
