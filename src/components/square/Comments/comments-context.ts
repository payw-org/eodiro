import { Dispatcher } from '@/types/react-helper'
import { CommentAttrs } from '@payw/eodiro-one-api/database/models/comment'
import { createContext } from 'react'

const CommentsContext = createContext(
  {} as {
    comments: CommentAttrs[]
    setComments: Dispatcher<CommentAttrs[]>
  }
)

export default CommentsContext
