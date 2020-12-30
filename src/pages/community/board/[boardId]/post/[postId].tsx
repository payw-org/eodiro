import { Comments } from '@/components/community/Comments'
import Information from '@/components/global/Information'
import { ArrowBlock } from '@/components/ui'
import { eodiroConsts } from '@/constants'
import Body from '@/layouts/BaseLayout/Body'
import { nextRequireAuthMiddleware } from '@/modules/server/ssr-middlewares/next-require-auth'
import { yyyymmddhhmmss } from '@/modules/time'
import {
  apiCommunityPost,
  ApiCommunityPostResData,
  apiCommunityPostUrl,
} from '@/pages/api/community/post'
import { CommunityComment } from '@prisma/client'
import classNames from 'classnames'
import { GetServerSideProps, NextPage } from 'next'
import { useState } from 'react'
import useSWR from 'swr'
import $ from './post.module.scss'

export const postPageUrl = (boardId: number, postId: number) =>
  `/community/board/${boardId}/post/${postId}`

type PostPageProps = {
  post: ApiCommunityPostResData
}

const PostPage: NextPage<PostPageProps> = ({ post: initialPost }) => {
  const { error: postError, data: post } = useSWR(
    apiCommunityPostUrl({ postId: initialPost?.id as number }),
    { initialData: initialPost }
  )
  const [comments, setComments] = useState(
    initialPost?.communityComments as CommunityComment[]
  )

  return (
    <Body
      pageTitle={post?.title ?? '포스트가 없습니다.'}
      titleHidden
      bodyClassName={$['post-page-body']}
    >
      {post ? (
        <>
          <ArrowBlock
            className={classNames(
              $['post-container'],
              eodiroConsts.OVERLAY_SENTINEL_SPOT
            )}
            flat
          >
            <div className={$['header']}>
              <span className={$['author']}>{post.randomNickname}</span>
              <span className={$['time']}>
                {yyyymmddhhmmss(post.postedAt, true)}
              </span>
            </div>
            <article>
              <h1
                className={classNames(
                  $['title'],
                  eodiroConsts.TITLE_SENTINEL_SPOT
                )}
              >
                {post.title}
              </h1>
              <div className={$['body']}>
                {post.body.split('\n').map((line, i) => {
                  if (line.length === 0) {
                    // eslint-disable-next-line react/no-array-index-key
                    return <br key={i} />
                  }

                  // eslint-disable-next-line react/no-array-index-key
                  return <p key={i}>{line}</p>
                })}
              </div>
            </article>
          </ArrowBlock>

          <Comments
            comments={comments}
            setComments={setComments}
            postId={post.id}
          />
        </>
      ) : (
        <div
          className={classNames(
            eodiroConsts.OVERLAY_SENTINEL_SPOT,
            eodiroConsts.TITLE_SENTINEL_SPOT
          )}
        >
          <Information title="삭제되었거나 없는 포스트입니다." />
        </div>
      )}
    </Body>
  )
}

export default PostPage

export const getServerSideProps: GetServerSideProps<PostPageProps> = async ({
  req,
  res,
  query,
}) => {
  await nextRequireAuthMiddleware(req, res)

  const post = await apiCommunityPost({
    postId: Number(query.postId),
  })

  return {
    props: { post },
  }
}
