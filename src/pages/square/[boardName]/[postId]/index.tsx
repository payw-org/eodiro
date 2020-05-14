import { EodiroPage, useAuth } from '@/pages/_app'
import { GetComments, GetPostById } from '@payw/eodiro-one-api/api/one/scheme'

import $ from './style.module.scss'
import ApiHost from '@/modules/api-host'
import Body from '@/layouts/BaseLayout/Body'
import { CommentAttrs } from '@payw/eodiro-one-api/database/models/comment'
import Comments from '@/components/square/Comments'
import { GetServerSideProps } from 'next'
import Information from '@/components/global/Information'
import Link from 'next/link'
import { OneApiPayload } from '@payw/eodiro-one-api/api/one/scheme/types/utils'
import { PostAttrs } from '@payw/eodiro-one-api/database/models/post'
import { PostViewerFileContainer } from '@/components/square/PostViewerFileContainer'
import RequireAuth from '@/components/global/RequireAuth'
import Time from '@/modules/time'
import { Tokens } from '@/api'
import WhiteBody from '@/components/utils/WhiteBody'
import _ from 'lodash'
import classNames from 'classnames'
import { oneAPIClient } from '@payw/eodiro-one-api'
import { pathIds } from '@/config/paths'
import { useRouter } from 'next/router'

type ContentProps = {
  post: OneApiPayload<GetPostById>['data']
  comments: CommentAttrs[]
}
const Content: React.FC<ContentProps> = ({ post, comments }) => {
  const authInfo = useAuth()
  const router = useRouter()
  const boardName = router.query.boardName

  async function deletePost() {
    // Confirm
    const confirmation = confirm(
      '삭제된 포스트는 되돌릴 수 없으며 모든 댓글도 함께 삭제됩니다.\n정말 삭제하시겠습니까?'
    )

    if (!confirmation) return

    // Delete
    await oneAPIClient(ApiHost.getHost(), {
      action: 'deletePost',
      data: {
        accessToken: (await Tokens.get()).accessToken,
        postId: post.id,
      },
    })

    alert('삭제되었습니다.')

    // Update cached posts
    const cached: PostAttrs[] = JSON.parse(sessionStorage.getItem('sbpd'))
    // Update when there is cache
    if (cached) {
      const index = cached.findIndex((cachedPost) => cachedPost.id === post.id)

      if (index !== -1) {
        // Only if it exists in the cache
        _.pullAt(cached, index)
        sessionStorage.setItem('sbpd', JSON.stringify(cached))
      }
    }

    // Redirect to the list
    window.location.replace(`/square/${boardName}`)
  }

  return (
    <div>
      <WhiteBody />
      <Link href="/square/[boardName]" as={`/square/${boardName}`}>
        <a className={$['to-list']}>
          <span className="display-flex align-items-center overlay-sentinel-spot">
            <i className="octicon octicon-chevron-left font-weight-bold" />
            &nbsp;목록으로
          </span>
        </a>
      </Link>

      <article className={$['post']}>
        <div className={$['info']}>
          <span className={$['author']}>{post.random_nickname}</span>

          <span className={$['time']}>
            {Time.yyyymmddhhmmss(post.uploaded_at, true)}
          </span>

          {post.user_id === authInfo.userId && (
            <span className={$['actions']}>
              <a
                href={`/square/${boardName}/${pathIds.writePost}?post_id=${post.id}`}
              >
                <button className={$['edit']}>
                  <i className="octicon octicon-pencil" />
                </button>
              </a>
              <button className={$['delete']} onClick={deletePost}>
                <i className="octicon octicon-trashcan" />
              </button>
            </span>
          )}
        </div>

        {/* Post title */}
        <h1 className={$['title']}>
          <span className="title-sentinel-spot">{post.title}</span>
        </h1>

        {/* Post body */}
        {post.body &&
          post.body.split('\n').map((line, i) => {
            return line.length === 0 ? (
              <br key={`br-${i}`} className="line-break" />
            ) : (
              <p key={`p-${i}`} className={`paragraph-${i}`}>
                {line}
              </p>
            )
          })}

        {/* Files list */}
        {post.files && post.files.length > 0 && (
          <PostViewerFileContainer files={post.files} />
        )}
      </article>

      {/* Like */}
      <div
        className={`${$['like-container']} display-flex justify-content-center`}
      >
        <button className={classNames($['like'], 'scheme-distinct')}>
          <i className="octicon octicon-thumbsup" />
        </button>
      </div>

      <Comments comments={comments} />
    </div>
  )
}

type PostPageProps = {
  post: GetPostById['payload']['data']
  comments: GetComments['payload']['data']
  postErr: GetPostById['payload']['err']
}
const PostPage: EodiroPage<PostPageProps> = ({ post, comments, postErr }) => {
  return (
    <Body
      pageTitle={post?.title || '어디로 - 포스트'}
      titleHidden
      bodyClassName={$['eodiro-post-view']}
      hasTopGap={postErr ? true : false}
    >
      {post && <Content post={post} comments={comments} />}
      {postErr === 'Unauthorized' && (
        <div className="overlay-sentinel-spot title-sentinel-spot">
          <RequireAuth />
        </div>
      )}
      {postErr === 'No Content' && (
        <div className="overlay-sentinel-spot title-sentinel-spot">
          <Information title="존재하지 않는 포스트입니다." />
        </div>
      )}
    </Body>
  )
}

export default PostPage

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  const postPayload = await oneAPIClient(ApiHost.getHost(), {
    action: 'getPostById',
    data: {
      postId: Number(query.postId),
      accessToken: (await Tokens.get(req)).accessToken,
    },
  })

  const commentsPayload = await oneAPIClient(ApiHost.getHost(), {
    action: 'getComments',
    data: {
      postId: Number(query.postId),
      accessToken: (await Tokens.get(req)).accessToken,
    },
  })

  return {
    props: {
      post: postPayload.data,
      comments: commentsPayload.data,
      postErr: postPayload.err,
    },
  }
}
