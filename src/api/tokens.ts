import EodiroHttpCookie from '@/modules/eodiro-http-cookie'
import dayjs from 'dayjs'
import { IncomingMessage, ServerResponse } from 'http'

export type TokensPack = {
  accessToken: string | null
  refreshToken: string | null
}

export class Tokens {
  static async get(req?: IncomingMessage | null): Promise<TokensPack> {
    const cookies = await EodiroHttpCookie.get(req)

    return {
      accessToken: (cookies?.accessToken as string) ?? null,
      refreshToken: (cookies?.refreshToken as string) ?? null,
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
    if (!accessToken || !refreshToken) {
      return false
    }

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

/**
 * Shortcut function for `(await Tokens.get(req?)).accessToken`
 */
export const getAccessToken = async (req?: IncomingMessage) =>
  (await Tokens.get(req)).accessToken
