import {
  CommunityBoard,
  CommunityComment,
  CommunityPost,
  CommunitySubcomment,
} from '@prisma/client'

export type SafeCommunityBoard = Omit<
  CommunityBoard,
  'isDeleted' | 'priority' | 'activeAt' | 'createdBy'
>

export type SafeCommunityPost = Omit<
  CommunityPost,
  'userId' | 'isDeleted' | 'editedAt'
> & {
  isMine: boolean
  hasBeenEdited: boolean
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
