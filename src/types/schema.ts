import {
  CommunityBoard,
  CommunityComment,
  CommunityPost,
  CommunitySubcomment,
} from '@prisma/client'

type Supplement = {
  isMine: boolean
}

export type SafeCommunityBoard = Omit<CommunityBoard, 'isDeleted'>

export type SafeCommunityPost = Omit<CommunityPost, 'userId' | 'isDeleted'> &
  Supplement

export type SafeCommunityComment = Omit<
  CommunityComment,
  'userId' | 'isDeleted'
> &
  Supplement

export type SafeCommunitySubcomment = Omit<
  CommunitySubcomment,
  'userId' | 'isDeleted'
> &
  Supplement
