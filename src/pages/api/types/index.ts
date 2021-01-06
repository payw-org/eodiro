import { SafeCommunityPost } from '@/types/schema'

export type CommunityPostWithCounts = SafeCommunityPost & {
  communityCommentsCount: number
  communityPostLikesCount: number
  communityPostBookmarksCount: number
}
