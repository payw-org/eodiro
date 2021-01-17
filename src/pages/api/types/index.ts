import { SafeCommunityPost } from '@/types/schema'

/**
 * @deprecated Use count fields directly inside post records.
 */
export type CommunityPostWithCounts = SafeCommunityPost & {
  communityCommentsCount?: number
  communityPostLikesCount?: number
  communityPostBookmarksCount?: number
}
