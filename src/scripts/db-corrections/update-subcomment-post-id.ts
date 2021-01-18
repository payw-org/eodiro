import { prisma } from '@/modules/prisma'

async function updateSubcommentPostId() {
  const subcomments = await prisma.communitySubcomment.findMany({
    include: {
      communityComment: true,
    },
  })

  subcomments.forEach((subcomment) => {
    prisma.communitySubcomment
      .update({
        where: { id: subcomment.id },
        data: {
          communityPost: {
            connect: { id: subcomment.communityComment.postId },
          },
        },
      })
      .then((updatedSubcomment) => {
        console.info(`✅ subcomment #${updatedSubcomment.id}`)
      })
  })
}

updateSubcommentPostId()
