import { prisma } from '@/modules/prisma'
import dayjs from 'dayjs'

async function clearPendingUsers() {
  const pendingUsers = await prisma.pendingUser.findMany()

  const deletions: Promise<any>[] = []

  pendingUsers.forEach((pendingUser) => {
    if (dayjs().diff(pendingUser.joinedAt, 'minute') > 30) {
      deletions.push(
        prisma.pendingUser.delete({
          where: { id: pendingUser.id },
        })
      )

      console.info(`Delete pending user at ${pendingUser.id}`)
    }
  })

  await Promise.all(deletions)

  await prisma.$disconnect()
  process.exit()
}

clearPendingUsers()
