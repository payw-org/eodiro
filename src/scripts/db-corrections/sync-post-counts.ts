// Sync community post's likes, comments, subcomments, bookmarks count.

import { prisma } from '@/modules/prisma'

async function sync() {
  const posts = await prisma.communityPost.findMany()

  posts.forEach((post) => {
    prisma.communityComment
      .findMany({
        where: {
          postId: post.id,
        },
        include: {
          communitySubcomments: true,
        },
      })
      .then((comments) => {
        // Comments count including subcomments
        const commentsCount = comments.reduce((accum, comment) => {
          accum += 1
          accum += comment.communitySubcomments.length

          return accum
        }, 0)

        prisma.communityPostLike
          .count({
            where: { postId: post.id },
          })
          .then((likesCount) => {
            prisma.communityPostBookmark
              .count({
                where: { postId: post.id },
              })
              .then((bookmarksCount) => {
                prisma.communityPost
                  .update({
                    where: { id: post.id },
                    data: {
                      likesCount,
                      bookmarksCount,
                      commentsCount,
                    },
                  })
                  .then((updatedPost) => {
                    console.info(`✅ Post #${updatedPost.id}`)
                  })
              })
          })
      })
  })
}

sync()
