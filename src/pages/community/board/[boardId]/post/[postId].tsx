import { Comments } from '@/components/community/Comments'
import Information from '@/components/global/Information'
import { Spinner } from '@/components/global/Spinner'
import { withRequireAuth } from '@/components/hoc/with-require-auth'
import { ArrowBlock } from '@/components/ui'
import { Icon } from '@/components/ui/Icon'
import { Flex } from '@/components/ui/layouts/Flex'
import { eodiroConst } from '@/constants'
import Body from '@/layouts/BaseLayout/Body'
import ApiHost from '@/modules/api-host'
import EodiroDialog from '@/modules/client/eodiro-dialog'
import EodiroMarkup from '@/modules/client/eodiro-markup'
import { eodiroRequest } from '@/modules/eodiro-request'
import { yyyymmddhhmm } from '@/modules/time'
import { Dispatcher } from '@/types/react-helper'
import { communityBoardPageUrl, postEditorPageUrl } from '@/utils/page-urls'
import {
  ApiCommunityBookmarkPostReqBody,
  ApiCommunityBookmarkPostResData,
} from '@payw/eodiro-server-types/api/community/bookmark-post'
import { ApiCommunityGetCommentsResData } from '@payw/eodiro-server-types/api/community/comment'
import {
  ApiCommunityLikePostReqBody,
  ApiCommunityLikePostResData,
} from '@payw/eodiro-server-types/api/community/like-post'
import {
  ApiCommunityDeletePostReqBody,
  ApiCommunityGetPostResData,
} from '@payw/eodiro-server-types/api/community/post'
import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import $ from './post-page.module.scss'

function PostPage() {
  const router = useRouter()
  const { postId } = router.query
  const {
    data: post,
    error: getPostError,
  } = useSWR<ApiCommunityGetPostResData>(
    ApiHost.resolve(`/community/post?postId=${postId}`)
  )
  const {
    data: comments,
    error: getCommentsError,
    mutate: setComments,
  } = useSWR<ApiCommunityGetCommentsResData>(
    ApiHost.resolve(`/community/comments?postId=${postId}`)
  )

  const [likes, setLikes] = useState({
    count: 0,
    byMe: false,
  })
  const [bookmarks, setBookmarks] = useState({
    count: 0,
    byMe: false,
  })

  useEffect(() => {
    if (!post) return

    setLikes({
      count: post.likesCount,
      byMe: post.likedByMe,
    })
    setBookmarks({
      count: post.bookmarksCount,
      byMe: post.bookmarkedByMe,
    })
  }, [post])

  /**
   * https://github.com/facebookexperimental/Recoil/issues/12
   */
  // useEffect(() => {
  //   setComments(post?.communityComments ?? [])
  // }, [setComments, post?.communityComments])

  async function deletePost() {
    if (!post || !(await new EodiroDialog().confirm('정말 삭제하시겠습니까?')))
      return

    await eodiroRequest<ApiCommunityDeletePostReqBody>({
      url: ApiHost.resolve('/community/post'),
      method: 'DELETE',
      data: { postId: post.id },
    })

    new EodiroDialog().alert('삭제되었습니다.')
    router.replace(
      communityBoardPageUrl({
        boardId: post.boardId,
      })
    )
  }

  async function likePost() {
    if (!post) return

    try {
      const result = await eodiroRequest<
        ApiCommunityLikePostReqBody,
        ApiCommunityLikePostResData
      >({
        url: ApiHost.resolve('/community/like-post'),
        method: 'POST',
        data: {
          postId: post.id,
        },
      })

      if (result) {
        setLikes({
          count: result.count,
          byMe: true,
        })

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
      ApiCommunityBookmarkPostReqBody,
      ApiCommunityBookmarkPostResData
    >({
      url: ApiHost.resolve('/community/bookmark-post'),
      method: 'POST',
      data: {
        postId: post.id,
      },
    })

    if (result) {
      setBookmarks({
        count: result.count,
        byMe: result.isBookmarkedByMe,
      })

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
      {post === undefined ? (
        <ArrowBlock
          flat
          className={`${eodiroConst.OVERLAY_SENTINEL_SPOT} ${eodiroConst.TITLE_SENTINEL_SPOT}`}
        >
          <div className="flex items-center justify-center">
            <Spinner />
          </div>
        </ArrowBlock>
      ) : getPostError ? (
        <div
          className={classNames(
            eodiroConst.OVERLAY_SENTINEL_SPOT,
            eodiroConst.TITLE_SENTINEL_SPOT
          )}
        >
          <Information title="삭제되었거나 없는 게시물입니다." />
        </div>
      ) : (
        <>
          <ArrowBlock
            className={classNames(
              $['post-container'],
              eodiroConst.OVERLAY_SENTINEL_SPOT
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
                  eodiroConst.TITLE_SENTINEL_SPOT
                )}
              >
                {post.title}
              </h1>
              <div
                className={$['body']}
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: EodiroMarkup.parse(post.body ?? ''),
                }}
              />
              {post.hasBeenEdited && (
                <span className={$['has-been-edited-mark']}>(수정됨)</span>
              )}
            </article>

            {/* Likes and bookmarks */}
            <Flex row justifyCenter className={$['likes-and-bookmarks']}>
              <Flex
                className={classNames($['action-btn'], $['likes'], {
                  [$['active']]: likes.byMe,
                })}
                onClick={likePost}
              >
                <Icon name="hand_thumbsup_fill" />
                <span>{likes.count}</span>
              </Flex>
              <Flex
                className={classNames($['action-btn'], $['bookmarks'], {
                  [$['active']]: bookmarks.byMe,
                })}
                onClick={bookmarkPost}
              >
                <Icon name="bookmark_fill" />
                <span>{bookmarks.count}</span>
              </Flex>
            </Flex>
          </ArrowBlock>

          <Link href={`/community/board/${post.boardId}`}>
            <a className="default mt-4 block">
              <ArrowBlock flat customHeight noPadding>
                <div className="flex items-center justify-center p-3">
                  <span className="font-medium">
                    {post.communityBoard.name}
                  </span>
                  &nbsp;더보기
                </div>
              </ArrowBlock>
            </a>
          </Link>

          {comments === undefined ? (
            <ArrowBlock>
              <div className="flex items-center justify-center">
                <Spinner />
              </div>
            </ArrowBlock>
          ) : getCommentsError ? (
            <Information title="댓글을 불러올 수 없습니다." />
          ) : (
            <Comments
              comments={comments}
              setComments={
                setComments as Dispatcher<ApiCommunityGetCommentsResData>
              }
              postId={post.id}
            />
          )}
        </>
      )}
    </Body>
  )
}

export default withRequireAuth(PostPage)
