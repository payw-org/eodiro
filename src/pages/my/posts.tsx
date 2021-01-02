import { PostsList } from '@/components/community/PostsList'
import { ArrowBlock } from '@/components/ui'
import { Flex } from '@/components/ui/layouts/Flex'
import Pagination from '@/components/ui/Pagination'
import Body from '@/layouts/BaseLayout/Body'
import { prisma } from '@/modules/prisma'
import { nextRequireAuthMiddleware } from '@/modules/server/ssr-middlewares/next-require-auth'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { CommunityPostWithCounts } from '../api/types'
import $ from './posts.module.scss'

type MyPostsProps = {
  posts: CommunityPostWithCounts[]
  page: number
  totalPage: number
}

export default function MyPosts({ posts, page, totalPage }: MyPostsProps) {
  const router = useRouter()

  return (
    <Body
      pageTitle="나의 포스트"
      titleAlign="center"
      bodyClassName={$['my-posts-page']}
    >
      <ArrowBlock flat>
        {posts.length > 0 ? (
          <PostsList posts={posts} />
        ) : (
          <Flex center>아직 포스트가 없습니다.</Flex>
        )}
      </ArrowBlock>

      <Pagination
        totalPage={totalPage}
        currentPage={page}
        onPressPage={(nextPage) => {
          router.push(`/my/posts?page=${nextPage}`)
        }}
      />
    </Body>
  )
}

export const getServerSideProps: GetServerSideProps<MyPostsProps> = async ({
  req,
  res,
  query,
}) => {
  await nextRequireAuthMiddleware(req, res)

  const page = query.page ? Number(query.page) : 1

  const { user } = req

  const take = 30
  const skip = Math.max(page - 1, 0) * take
  const totalPage = Math.ceil(
    (await prisma.communityPost.count({
      where: { userId: user.id },
    })) / take
  )

  const posts = await prisma.communityPost.findMany({
    where: { userId: user.id, isDeleted: false },
    orderBy: { id: 'desc' },
    skip,
    include: {
      communityComments: { where: { isDeleted: false } },
      communityPostLikes: true,
      communityPostBookmarks: true,
    },
  })

  const countedPosts = posts.map((post) => {
    const {
      communityComments,
      communityPostBookmarks,
      communityPostLikes,
      ...rest
    } = post

    return {
      ...rest,
      communityCommentsCount: communityComments.length,
      communityPostBookmarksCount: communityPostBookmarks.length,
      communityPostLikesCount: communityPostLikes.length,
    }
  })

  return {
    props: {
      posts: countedPosts,
      page,
      totalPage,
    },
  }
}
