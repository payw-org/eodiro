import { RefinedUser } from '@/modules/server/middlewares/require-auth'

declare module 'http' {
  interface IncomingMessage {
    user: RefinedUser
  }
}
