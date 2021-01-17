import { Comments } from '@/components/community/Comments'
import Information from '@/components/global/Information'
import { ArrowBlock } from '@/components/ui'
import { Icon } from '@/components/ui/Icon'
import { Flex } from '@/components/ui/layouts/Flex'
import { eodiroConsts } from '@/constants'
import Body from '@/layouts/BaseLayout/Body'
import EodiroDialog from '@/modules/client/eodiro-dialog'
import { eodiroRequest } from '@/modules/eodiro-request'
import { nextRequireAuthMiddleware } from '@/modules/server/ssr-middlewares/next-require-auth'
import { yyyymmddhhmm } from '@/modules/time'
import {
  ApiCommunityBookmarkPostReqData,
  ApiCommunityBookmarkPostResData,
  apiCommunityBookmarkPostUrl,
} from '@/pages/api/community/bookmark-post'
import { CommunityCommentWithSubcomments } from '@/pages/api/community/comments'
import {
  ApiCommunityLikePostReqData,
  ApiCommunityLikePostResData,
  apiCommunityLikePostUrl,
} from '@/pages/api/community/like-post'
import {
  ApiCommunityDeletePostReqData,
  apiCommunityPost,
  ApiCommunityPostResData,
  apiCommunityUpsertDeleteUrl,
} from '@/pages/api/community/post'
import { communityBoardPageUrl, postEditorPageUrl } from '@/utils/page-urls'
import classNames from 'classnames'
import { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { atom, useRecoilState } from 'recoil'
import $ from './post-page.module.scss'

type PostPageProps = {
  post: ApiCommunityPostResData
}

export const commentsState = atom<CommunityCommentWithSubcomments[]>({
  key: 'commentsState',
  default: [],
})

const PostPage: NextPage<PostPageProps> = ({ post }) => {
  const router = useRouter()
  const [comments, setComments] = useRecoilState(commentsState)
  const [likesCount, setLikesCount] = useState(
    post?.communityPostLikesCount ?? 0
  )
  const [bookmarksCount, setBookmarksCount] = useState(
    post?.communityPostBookmarksCount ?? 0
  )
  const [likedByMe, setLikedByMe] = useState(post?.likedByMe)
  const [bookmarkedByMe, setBookmarkedByMe] = useState(post?.bookmarkedByMe)

  /**
   * https://github.com/facebookexperimental/Recoil/issues/12
   */
  useEffect(() => {
    setComments(post?.communityComments as CommunityCommentWithSubcomments[])
  }, [setComments, post?.communityComments])

  async function deletePost() {
    if (!post || !(await new EodiroDialog().confirm('정말 삭제하시겠습니까?')))
      return

    await eodiroRequest<ApiCommunityDeletePostReqData>({
      url: apiCommunityUpsertDeleteUrl,
      method: 'DELETE',
      data: { postId: post.id },
    })

    new EodiroDialog().alert('삭제되었습니다.')
    router.replace(communityBoardPageUrl(post.boardId))
  }

  async function likePost() {
    if (!post) return

    try {
      const result = await eodiroRequest<
        ApiCommunityLikePostReqData,
        ApiCommunityLikePostResData
      >({
        url: apiCommunityLikePostUrl,
        method: 'POST',
        data: {
          postId: post.id,
        },
      })

      if (result) {
        setLikedByMe(true)
        setLikesCount(result.count)

        if (result.alreadyLiked) {
          new EodiroDialog().alert('이미 좋아합니다 💕')
        } else {
          // TODO: Animate likes icon
        }
      }
    } catch (error) {
      console.error(error)
      new EodiroDialog().alert('좋아하는데 실패했습니다.')
    }
  }

  async function bookmarkPost() {
    if (!post) return

    const result = await eodiroRequest<
      ApiCommunityBookmarkPostReqData,
      ApiCommunityBookmarkPostResData
    >({
      url: apiCommunityBookmarkPostUrl,
      method: 'POST',
      data: {
        postId: post.id,
      },
    })

    if (result) {
      setBookmarkedByMe(result.isBookmarkedByMe)
      setBookmarksCount(result.count)

      new EodiroDialog().vagabond(
        result.isBookmarkedByMe
          ? '책갈피에 추가되었습니다.'
          : '책갈피가 취소되었습니다.'
      )
    }
  }

  return (
    <Body
      pageTitle={post?.title ?? '게시물이 없습니다.'}
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
              <Flex className={$['right-side']}>
                {post.isMine && (
                  // Show delete and edit buttons when the post is mine
                  <div className={$['its-mine']}>
                    <button
                      type="button"
                      className={$['delete']}
                      onClick={deletePost}
                    >
                      <i className="f7-icons">trash</i>
                    </button>
                    <Link href={postEditorPageUrl(post.boardId, post.id)}>
                      <button type="button" className={$['edit']}>
                        <i className="f7-icons">square_pencil</i>
                      </button>
                    </Link>
                  </div>
                )}
                <span className={$['time']}>
                  {yyyymmddhhmm(post.postedAt, true)}
                </span>
              </Flex>
            </div>

            {/* Post title and body */}
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
              {post.hasBeenEdited && (
                <span className={$['has-been-edited-mark']}>(수정됨)</span>
              )}
            </article>

            {/* Likes and bookmarks */}
            <Flex row justifyCenter className={$['likes-and-bookmarks']}>
              <Flex
                className={classNames($['action-btn'], $['likes'], {
                  [$['active']]: likedByMe,
                })}
                onClick={likePost}
              >
                <Icon name="hand_thumbsup_fill" />
                <span>{likesCount}</span>
              </Flex>
              <Flex
                className={classNames($['action-btn'], $['bookmarks'], {
                  [$['active']]: bookmarkedByMe,
                })}
                onClick={bookmarkPost}
              >
                <Icon name="bookmark_fill" />
                <span>{bookmarksCount}</span>
              </Flex>
            </Flex>
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
          <Information title="삭제되었거나 없는 게시물입니다." />
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

  const { user } = req

  const post = await apiCommunityPost({
    postId: Number(query.postId),
    userId: user.id,
  })

  return {
    props: { post },
  }
}
