import { ArrowBlock } from '@/components/ui'
import { Flex } from '@/components/ui/layouts/Flex'
import { eodiroRequest } from '@/modules/eodiro-request'
import { friendlyTime } from '@/modules/time'
import {
  ApiCommunityCreateCommentReqData,
  apiCommunityCreateCommentUrl,
  ApiCommunityDeleteCommentReqData,
  apiCommunityDeleteCommentUrl,
} from '@/pages/api/community/comment'
import {
  ApiCommunityCommentsResData,
  apiCommunityCommentsUrl,
  CommunityCommentWithSubcomments,
} from '@/pages/api/community/comments'
import {
  ApiCommunityDeleteSubcommentReqData,
  apiCommunityDeleteSubcommentUrl,
} from '@/pages/api/community/subcomment'
import { commentsState } from '@/pages/community/board/[boardId]/post/[postId]'
import { Dispatcher } from '@/types/react-helper'
import produce from 'immer'
import React, { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import $ from './style.module.scss'

async function deleteComment(commentId: number): Promise<boolean> {
  try {
    await eodiroRequest<ApiCommunityDeleteCommentReqData>({
      url: apiCommunityDeleteCommentUrl,
      method: 'DELETE',
      data: {
        commentId,
      },
    })

    return true
  } catch (error) {
    if (error.response?.status === 404) {
      window.alert('이미 삭제된 댓글입니다.')

      return false
    }
  }

  return false
}

async function deleteSubcomment(subcommentId: number): Promise<boolean> {
  try {
    await eodiroRequest<ApiCommunityDeleteSubcommentReqData>({
      url: apiCommunityDeleteSubcommentUrl,
      method: 'DELETE',
      data: {
        subcommentId,
      },
    })

    return true
  } catch (error) {
    if (error.response?.status === 404) {
      window.alert('이미 삭제된 댓글입니다.')

      return false
    }
  }

  return false
}

const CommentItem: React.FC<{
  comment: CommunityCommentWithSubcomments
}> = ({ comment }) => {
  const setComments = useSetRecoilState(commentsState)

  async function onDeleteComment() {
    if (!window.confirm('정말 삭제하시겠습니까?')) return

    const result = await deleteComment(comment.id)

    if (result) {
      setComments((prevComments) => {
        const nextComments = produce(prevComments, (draftComments) => {
          const index = draftComments.findIndex((c) => c.id === comment.id)

          draftComments.splice(index, 1)
        })

        return nextComments
      })
    }
  }

  async function onDeleteSubcomment(subcommentId: number) {
    if (!window.confirm('정말 삭제하시겠습니까?')) return

    const result = await deleteSubcomment(subcommentId)

    if (result) {
      setComments((prevComments) => {
        const nextComments = produce(prevComments, (draftComments) => {
          const commentIndex = draftComments.findIndex(
            (c) => c.id === comment.id
          )
          const subCommentIndex = draftComments[
            commentIndex
          ].communitySubcomments.findIndex(
            (subcomment) => subcomment.id === subcommentId
          )

          draftComments[commentIndex].communitySubcomments.splice(
            subCommentIndex,
            1
          )
        })

        return nextComments
      })
    }
  }

  return (
    <div className={$['comment-item']}>
      <div className={$['comment-header']}>
        <h3 className={$['author']}>{comment.randomNickname}</h3>
        <Flex className={$['right-side']}>
          {comment.isMine && (
            <button
              type="button"
              className={$['delete']}
              onClick={onDeleteComment}
            >
              <i className="f7-icons">trash</i>
            </button>
          )}
          <span className={$['commented-at']}>
            {friendlyTime(comment.commentedAt)}
          </span>
        </Flex>
      </div>
      <p className={$['body']}>{comment.body}</p>

      {comment.communitySubcomments.length > 0 && (
        <div className={$['subcomments']}>
          {comment.communitySubcomments.map((subcomment) => (
            <div key={subcomment.id} className={$['subcomment-item']}>
              <div className={$['comment-header']}>
                <h3 className={$['author']}>{subcomment.randomNickname}</h3>
                <Flex className={$['right-side']}>
                  {subcomment.isMine && (
                    <button
                      type="button"
                      className={$['delete']}
                      onClick={() => onDeleteSubcomment(subcomment.id)}
                    >
                      <i className="f7-icons">trash</i>
                    </button>
                  )}
                  <span className={$['commented-at']}>
                    {friendlyTime(subcomment.subcommentedAt)}
                  </span>
                </Flex>
              </div>
              <p className={$['body']}>{subcomment.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export const Comments: React.FC<{
  comments: CommunityCommentWithSubcomments[]
  setComments: Dispatcher<CommunityCommentWithSubcomments[]>
  postId: number
}> = ({ comments, setComments, postId }) => {
  const [newComment, setNewComment] = useState('')

  async function onKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== 'Enter') return

    const body = e.currentTarget.value.trim()

    if (body.length === 0) {
      window.alert('내용을 입력하세요.')
      return
    }

    if (body.length > 100) {
      window.alert('댓글은 100자까지만 입력할 수 있습니다.')
      return
    }

    e.currentTarget.blur()
    setNewComment('')

    try {
      await eodiroRequest<ApiCommunityCreateCommentReqData>({
        method: 'POST',
        url: apiCommunityCreateCommentUrl,
        data: {
          body,
          postId,
        },
      })

      const latestComments = await eodiroRequest<
        null,
        ApiCommunityCommentsResData
      >({
        method: 'GET',
        url: apiCommunityCommentsUrl({
          postId,
          cursor:
            comments.length > 0 ? comments[comments.length - 1].id : undefined,
        }),
      })

      setComments((prevComments) => {
        const refreshedComments = [...prevComments, ...latestComments]
        return refreshedComments
      })
    } catch (error) {
      alert(error)
    }
  }

  return (
    <section className={$['comments-section']}>
      <h1 className={$['comments-headline']}>댓글</h1>
      <ArrowBlock className={$['comments']} flat>
        {comments.length > 0 ? (
          <>
            {comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </>
        ) : (
          <h1 className={$['no-comments-yet']}>아직 댓글이 없습니다.</h1>
        )}
      </ArrowBlock>
      <div>
        <input
          type="text"
          className={$['new-comment']}
          spellCheck={false}
          autoComplete="off"
          placeholder="댓글을 입력하세요."
          value={newComment}
          onChange={(e) => setNewComment(e.currentTarget.value)}
          onKeyUp={onKeyUp}
        />
      </div>
    </section>
  )
}
