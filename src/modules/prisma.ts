import { PrismaClient } from '@prisma/client'
import { prismaTimeMode } from './time'

export const prisma = new PrismaClient()

if (prisma.$use) {
  prisma.$use(async (params, next) => {
    const result = await next(params)

    // Subtract 9 hours from UTC
    return prismaTimeMode(result)
  })
}
