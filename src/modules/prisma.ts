import { PrismaClient } from '@prisma/client'
import { prismaTimeMod } from './time'

// eslint-disable-next-line import/no-mutable-exports
let prisma: PrismaClient

function timeMod(prismaInstance: PrismaClient) {
  if (prismaInstance.$use) {
    prismaInstance.$use(async (params, next) => {
      const result = await next(params)

      // Subtract 9 hours from UTC
      return prismaTimeMod(result)
    })
  }
}

// Fix endless prisma client re-initialization on every HMR
// Related issue https://github.com/prisma/prisma/issues/1983#issuecomment-620621213
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
  timeMod(prisma)
} else {
  if (!(global as any).prisma) {
    ;(global as any).prisma = new PrismaClient()
    timeMod((global as any).prisma)
  }

  prisma = (global as any).prisma
}

export { prisma }
