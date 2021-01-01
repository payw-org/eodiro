import { User } from '@prisma/client'

declare module 'http' {
  interface IncomingMessage {
    user: User
  }
}
