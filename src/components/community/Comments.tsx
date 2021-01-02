import { useUserId } from '@/atoms/auth'
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
} from '@/pages/api/community/comments'
import { commentsState } from '@/pages/community/board/[boardId]/post/[postId]'
import { Dispatcher } from '@/types/react-helper'
import { CommunityComment } from '@prisma/client'
import React, { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { ArrowBlock } from '../ui'
import { Flex } from '../ui/layouts/Flex'
import $ from './Comments.module.scss'

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

const CommentItem: React.FC<{
  comment: CommunityComment
}> = ({ comment }) => {
  const userId = useUserId()
  const setComments = useSetRecoilState(commentsState)

  async function onDelete() {
    if (!window.confirm('정말 삭제하시겠습니까?')) return

    const result = await deleteComment(comment.id)

    if (result) {
      setComments((prevComments) => {
        const nextComments = [...prevComments]
        const index = nextComments.findIndex((c) => c.id === comment.id)

        nextComments.splice(index, 1)

        return nextComments
      })
    }
  }

  return (
    <div className={$['comment-item']}>
      <div className={$['comment-header']}>
        <h3 className={$['author']}>{comment.randomNickname}</h3>
        <Flex className={$['right-side']}>
          {comment.userId === userId && (
            <button type="button" className={$['delete']} onClick={onDelete}>
              <i className="f7-icons">trash</i>
            </button>
          )}
          <span className={$['commented-at']}>
            {friendlyTime(comment.commentedAt)}
          </span>
        </Flex>
      </div>
      <p className={$['body']}>{comment.body}</p>
    </div>
  )
}

export const Comments: React.FC<{
  comments: CommunityComment[]
  setComments: Dispatcher<CommunityComment[]>
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
