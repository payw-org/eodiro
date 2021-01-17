import {
  CommunityBoard,
  CommunityComment,
  CommunityPost,
  CommunitySubcomment,
} from '@prisma/client'

export type SafeCommunityBoard = Omit<
  CommunityBoard,
  | 'isDeleted'
  | 'priority'
  | 'activeAt'
  | 'createdBy'
  | 'description'
  | 'createdAt'
> & {
  description?: string | null
  createdAt?: Date
}

export type SafeCommunityPost = Omit<
  CommunityPost,
  'userId' | 'isDeleted' | 'editedAt' | 'body'
> & {
  isMine?: boolean
  hasBeenEdited?: boolean
  body?: string
}

export type SafeCommunityComment = Omit<
  CommunityComment,
  'userId' | 'isDeleted'
> & {
  isMine: boolean
}

export type SafeCommunitySubcomment = Omit<
  CommunitySubcomment,
  'userId' | 'isDeleted'
> & {
  isMine: boolean
}
