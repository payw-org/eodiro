import EodiroHttpCookie from '@/modules/eodiro-http-cookie'
import dayjs from 'dayjs'
import { IncomingMessage, ServerResponse } from 'http'

export type TokensPack = {
  accessToken: string
  refreshToken: string
}

export class Tokens {
  static async get(req?: IncomingMessage): Promise<TokensPack> {
    const cookies = await EodiroHttpCookie.get(req)

    return {
      accessToken: cookies?.accessToken as string,
      refreshToken: cookies?.refreshToken as string,
    }
  }

  static async set(
    tokens: TokensPack,
    http?: {
      req: IncomingMessage
      res: ServerResponse
    }
  ): Promise<boolean> {
    const { accessToken, refreshToken } = tokens
    const succeeded = await EodiroHttpCookie.set(
      [
        {
          name: 'accessToken',
          value: accessToken,
          expires: dayjs().add(1, 'd').toDate().toUTCString(),
        },
        {
          name: 'refreshToken',
          value: refreshToken,
          expires: dayjs().add(14, 'd').toDate().toUTCString(),
        },
      ],
      http
    )
    if (!succeeded) {
      return false
    }

    return true
  }

  static async clear(): Promise<boolean> {
    const succeeded = await EodiroHttpCookie.set([
      {
        name: 'accessToken',
        value: '',
        expires: dayjs('1970-01-01').toDate().toUTCString(),
      },
      {
        name: 'refreshToken',
        value: '',
        expires: dayjs('1970-01-01').toDate().toUTCString(),
      },
    ])

    return succeeded
  }
}
