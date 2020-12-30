import { PrismaClient } from '@prisma/client'
import { prismaTimeMode } from './time'

// eslint-disable-next-line import/no-mutable-exports
let prisma: PrismaClient

// Fix endless prisma client re-initialization on every HMR
// Related issue https://github.com/prisma/prisma/issues/1983#issuecomment-620621213
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!(global as any).prisma) {
    ;(global as any).prisma = new PrismaClient()
  }

  prisma = (global as any).prisma
}

if (prisma.$use) {
  prisma.$use(async (params, next) => {
    const result = await next(params)

    // Subtract 9 hours from UTC
    return prismaTimeMode(result)
  })
}

export { prisma }
