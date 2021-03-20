import ApiHost from '@/modules/api-host'
import { ApiCommunityPostsListResData } from '@payw/eodiro-server-types/api/community/posts-list'
import { useRouter } from 'next/router'
import queryString from 'query-string'
import useSWR from 'swr'
import { PostsList } from '../community/PostsList'
import ServerError from '../global/ServerError'
import { Spinner } from '../global/Spinner'
import { ArrowBlock } from '../ui'
import { Flex } from '../ui/layouts/Flex'
import Pagination from '../ui/Pagination'

export type MyPostsListProps = {
  type: 'posts' | 'comments' | 'bookmarks'
}

export default function MyPostsLists({ type }: MyPostsListProps) {
  const router = useRouter()
  const { data, error: postsError } = useSWR<ApiCommunityPostsListResData>(
    queryString.stringifyUrl({
      url: ApiHost.resolve('/community/posts-list'),
      query: {
        my: type,
        page: router.query.page,
      },
    })
  )

  return (
    <>
      {postsError ? (
        <ServerError />
      ) : data === undefined ? (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          <ArrowBlock flat>
            {data.posts.length > 0 ? (
              <PostsList posts={data.posts} />
            ) : (
              <Flex center>아직 게시물이 없습니다.</Flex>
            )}
          </ArrowBlock>

          <Pagination
            totalPage={data.totalPage}
            currentPage={data.page}
            onPressPage={(nextPage) => {
              router.push(`/my/${type}?page=${nextPage}`)
            }}
          />
        </>
      )}
    </>
  )
}
