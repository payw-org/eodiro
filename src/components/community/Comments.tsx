import { eodiroRequest } from '@/modules/eodiro-request'
import {
  ApiCommunityCreateCommentReqData,
  apiCommunityCreateCommentUrl,
} from '@/pages/api/community/comment'
import {
  ApiCommunityCommentsResData,
  apiCommunityCommentsUrl,
} from '@/pages/api/community/comments'
import { Dispatcher } from '@/types/react-helper'
import { CommunityComment } from '@prisma/client'
import React, { useState } from 'react'
import { ArrowBlock } from '../ui'
import $ from './Comments.module.scss'

const CommentItem: React.FC<{
  comment: CommunityComment
}> = ({ comment }) => {
  return (
    <div className={$['comment-item']}>
      <h3 className={$['author']}>{comment.randomNickname}</h3>
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

    if (body.length > 100) {
      alert('댓글은 100자까지만 입력할 수 있습니다.')
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
      <input
        type="text"
        className={$['new-comment']}
        placeholder="댓글을 입력하세요."
        value={newComment}
        onChange={(e) => setNewComment(e.currentTarget.value)}
        onKeyUp={onKeyUp}
      />
    </section>
  )
}
