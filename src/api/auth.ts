import { Tokens, TokensPack } from './tokens'

import ApiHost from '@/modules/api-host'
import { IncomingMessage } from 'http'
import eodiroAxios from '@/modules/eodiro-axios'

export type UserInfo = {
  id: number
  portal_id: string
  registered_at: string
  nickname: string
  random_nickname: string
}

export class AuthApi {
  static async isSigned(
    req?: IncomingMessage
  ): Promise<{
    isSigned: boolean
    isAdmin?: boolean
    userId?: number
  }> {
    const [err, data] = await eodiroAxios<{
      isSigned: boolean
      isAdmin?: boolean
      userId?: number
    }>(
      {
        url: ApiHost.getHost() + `/auth/is-signed-in`,
        method: 'POST',
      },
      {
        access: true,
        req,
      }
    )

    return err
      ? {
          isSigned: false,
        }
      : data
  }

  static async signIn(
    portalId: string,
    password: string
  ): Promise<false | TokensPack> {
    const [err, data] = await eodiroAxios({
      method: 'POST',
      url: ApiHost.getHost() + `/auth/sign-in`,
      data: {
        portalId,
        password,
      },
    })

    return err ? false : data
  }

  static async signOutFromAll(): Promise<boolean> {
    const [err] = await eodiroAxios(
      {
        method: 'DELETE',
        url: ApiHost.getHost() + `/auth/refresh-token`,
      },
      {
        access: true,
      }
    )

    if (err) return false

    const tokensCleared = await Tokens.clear()

    return tokensCleared
  }

  static async signUp(
    portalId: string,
    nickname: string,
    password: string
  ): Promise<
    | {
        portalId: boolean
        nickname: boolean
        password: boolean
      }
    | false
  > {
    portalId = portalId.toLowerCase().trim()
    if (!portalId.includes('@')) {
      portalId += '@cau.ac.kr'
    }
    nickname = nickname.trim().replace(' ', '')

    const [err, data] = await eodiroAxios<{
      portalId: boolean
      nickname: boolean
      password: boolean
    }>({
      method: 'POST',
      url: ApiHost.getHost() + `/auth/sign-up`,
      data: {
        portalId,
        nickname,
        password,
      },
    })

    return err ? false : data
  }

  static async verify(token: string): Promise<boolean> {
    const [err] = await eodiroAxios({
      method: 'POST',
      url: ApiHost.getHost() + `/auth/verify`,
      data: {
        token,
      },
    })

    return !err
  }

  // TODO: move to Tokens class
  static async refresh(req?: IncomingMessage): Promise<false | TokensPack> {
    const [err, data] = await eodiroAxios<TokensPack>(
      {
        method: 'POST',
        url: ApiHost.getHost() + `/auth/refresh-token`,
      },
      {
        refresh: true,
        req,
      }
    )

    return err ? false : data
  }

  /**
   * Pass with/without email host
   * @param portalId
   */
  static async validatePortalId(
    portalId: string,
    existence = false
  ): Promise<boolean> {
    const [err, data] = await eodiroAxios<boolean>({
      method: 'POST',
      url: ApiHost.getHost() + `/auth/validate/portal-id`,
      data: {
        portalId,
        existence,
      },
    })

    return err ? false : data
  }

  static async validateNickname(nickname: string): Promise<boolean> {
    const [err, data] = await eodiroAxios<boolean>({
      method: 'POST',
      url: ApiHost.getHost() + `/auth/validate/nickname`,
      data: {
        nickname,
      },
    })

    return err ? false : data
  }

  static async validatePassword(password: string): Promise<boolean> {
    const [err, data] = await eodiroAxios<boolean>({
      method: 'POST',
      url: ApiHost.getHost() + `/auth/validate/password`,
      data: {
        password,
      },
    })

    return err ? false : data
  }

  static async info(req?: IncomingMessage): Promise<UserInfo | false> {
    const [err, data] = await eodiroAxios<UserInfo>(
      {
        method: 'GET',
        url: ApiHost.getHost() + `/auth/information`,
      },
      {
        access: true,
        req,
      }
    )

    return err ? false : data
  }

  /**
   * Request password change.
   *
   * @param portalId
   * @returns `false`: server error
   */
  static async requestPasswordChange(portalId: string): Promise<boolean> {
    const [err] = await eodiroAxios({
      method: 'POST',
      url: ApiHost.getHost() + `/auth/change-password`,
      data: {
        portalId,
      },
    })

    return err ? false : true
  }

  static async checkPasswordChange(token: string): Promise<boolean> {
    const [err, data] = await eodiroAxios<boolean>({
      method: 'GET',
      url: ApiHost.getHost() + `/auth/change-password`,
      data: {
        token,
      },
    })

    return err ? false : data
  }

  static async changePassword(
    token: string,
    newPassword: string
  ): Promise<boolean> {
    const [err, data] = await eodiroAxios<boolean>({
      method: 'PATCH',
      url: ApiHost.getHost() + `/auth/change-password`,
      data: {
        token,
        newPassword,
      },
    })

    return err ? false : data
  }
}
