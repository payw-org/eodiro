import { Tokens } from '@/api'
import ApiHost from '@/modules/api-host'
import { useAuth } from '@/pages/_app'
import { oneAPIClient } from '@payw/eodiro-one-api'
import _ from 'lodash'
import { useRouter } from 'next/router'
import React, { useContext, useRef, useState } from 'react'
import CommentsContext from '../comments-context'
import './style.scss'

const NewComment: React.FC = () => {
  const router = useRouter()
  const [value, setValue] = useState('')
  const { comments, setComments } = useContext(CommentsContext)
  const inputRef = useRef<HTMLInputElement>(null)
  const auth = useAuth()

  async function done() {
    // Blur input
    inputRef.current.blur()

    const uploadPayload = await oneAPIClient(ApiHost.getHost(), {
      action: 'uploadComment',
      data: {
        postId: Number(router.query.postId),
        body: value,
        accessToken: (await Tokens.get()).accessToken,
      },
    })

    if (uploadPayload.err) {
      if (uploadPayload.err === 'No Body') {
        alert('내용을 입력하세요.')
        return
      }
    }

    // Upload success

    // Reset the input value
    setValue('')

    // Refresh recent comments
    const newCommentsPyld = await oneAPIClient(ApiHost.getHost(), {
      action: 'getComments',
      data: {
        accessToken: auth.tokens.accessToken,
        postId: Number(router.query.postId),
        mostRecentCommentId: comments.length > 0 ? _.last(comments).id : 0,
      },
    })

    setComments([...comments, ...newCommentsPyld.data])
  }

  return (
    <div className="new-comment position-relative">
      <input
        tabIndex={-1}
        type="text"
        style={{
          visibility: 'hidden',
          pointerEvents: 'none',
          position: 'absolute',
        }}
      />
      <input
        maxLength={500}
        ref={inputRef}
        className="nc-input"
        type="text"
        placeholder="이 곳에 댓글을 입력하세요"
        spellCheck="false"
        autoComplete="off"
        value={value}
        onChange={(e): void => setValue(e.target.value)}
        onKeyUp={async (e): Promise<void> => {
          if (e.key !== 'Enter') return

          e.preventDefault()

          done()
        }}
      />

      <button className="done position-absolute done" onClick={done}>
        완료
      </button>
    </div>
  )
}

export default NewComment
