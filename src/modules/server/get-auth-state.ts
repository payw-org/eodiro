import { AuthApi, Tokens } from '@/api'
import { IncomingMessage, ServerResponse } from 'http'
import ApiHost from '../api-host'
import eodiroAxios from '../eodiro-axios'
import { reload } from './reload'

export type AuthState = {
  isSigned: boolean
  isAdmin: boolean
  userId: number
  accessToken: string
}

/**
 * Return auth information using AuthApi internally.
 * Also automatically refresh the tokens if needed.
 */
export async function getAuthState(
  ctx: {
    req: IncomingMessage | null | undefined
    res: ServerResponse | null | undefined
  } = { req: null, res: null }
): Promise<AuthState> {
  const { req, res } = ctx
  const tokens = await Tokens.get(req)
  let authState: AuthState = {
    isSigned: false,
    isAdmin: false,
    userId: 0,
    accessToken: '',
  }

  async function refresh() {
    const newTokens = await AuthApi.refresh(req)

    if (newTokens) {
      const [err, authCheck] = await eodiroAxios({
        method: 'POST',
        url: `${ApiHost.getHost()}/auth/is-signed-in`,
        headers: {
          accessToken: newTokens.accessToken,
        },
      })

      if (!err) {
        await Tokens.set(newTokens, { req, res })
        authState = authCheck
        reload(req, res)
      }
    }
  }

  // Verify token
  if (tokens.accessToken) {
    const authCheck = await AuthApi.isSigned(req)

    if (authCheck.isSigned) {
      // Token is signed and available to be used with
      authState = authCheck as AuthState
    } else {
      // The access token has been expired and
      // needs to be refresehd with the refresh token

      await refresh()
    }
  } else if (tokens.refreshToken) {
    // Access token has expired and refresh token is available

    await refresh()
  }

  return authState
}
