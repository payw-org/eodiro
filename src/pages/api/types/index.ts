import { CommunityPost } from '@prisma/client'

export type CommunityPostWithCommentsAndLikesCount = CommunityPost & {
  communityCommentsCount: number
  communityPostLikesCount: number
  communityPostBookmarksCount: number
}
