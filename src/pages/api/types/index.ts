import { CommunityPost } from '@prisma/client'

export type CommunityPostWithCounts = CommunityPost & {
  communityCommentsCount: number
  communityPostLikesCount: number
  communityPostBookmarksCount: number
}
