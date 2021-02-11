import { eodiroConst } from '@/constants'
import {
  AuthData,
  JwtError,
  JwtErrorName,
  signAccessToken,
  verifyToken,
} from '@/modules/jwt'
import { createHandler, nextApi } from '@/modules/next-api-routes-helpers'
import { extractToken } from '@/modules/server/extract-token'
import { redirect } from '@/modules/server/redirect'
import { Cookies } from '@/pages/api/cookie'
import { getCookie, setCookie } from '../cookie'

export type ApiAuthRefreshResData = {
  accessToken: string
}

export default nextApi({
  post: createHandler<ApiAuthRefreshResData | { error: JwtError }>(
    async (req, res) => {
      const refreshToken = extractToken(req, res, 'refresh')

      if (!refreshToken) {
        res.status(401).end()

        return
      }

      const [err, authData] = await verifyToken(refreshToken, 'refresh')

      if (err) {
        res.status(401).json({ error: err })
      } else {
        // Sign new access token
        const newAccessToken = signAccessToken(authData as AuthData)

        // Set cookie
        setCookie(req, res, {
          name: eodiroConst.EDR_ACCESS_TOKEN_NAME,
          value: newAccessToken,
          expires: new Date('2038-01-01').toUTCString(),
        })

        res.json({ accessToken: newAccessToken })
      }
    }
  ),
  get: async (req, res) => {
    const accessToken = extractToken(req, res, 'access')
    const [accessErr] = await verifyToken(accessToken, 'access')

    if (accessErr && accessErr.name === JwtErrorName.TokenExpiredError) {
      // Access token has expired

      const refreshToken = extractToken(req, res, 'refresh')
      const [refreshErr, authData] = await verifyToken(refreshToken, 'refresh')

      if (refreshErr) {
        // Refresh token error
        // redirect to login page
        redirect(res, '/login-please')
        return
      }

      // Sign new access token
      const newAccessToken = signAccessToken(authData as AuthData)

      // Set access token to cookie
      setCookie(req, res, {
        name: eodiroConst.EDR_ACCESS_TOKEN_NAME,
        value: newAccessToken,
        expires: new Date('2038-01-01').toUTCString(),
      })

      const lastPath = getCookie(req, eodiroConst.LAST_PATH)
      redirect(res, lastPath)

      return
    }

    // No error
    // redirect to home
    // redirect(res, '/')
    res.send('')
  },
  delete: async (req, res) => {
    const refreshTokenPaths = ['/api/auth/refresh', '/api/auth/revoke']

    const cookies: Cookies = [
      {
        name: eodiroConst.EDR_ACCESS_TOKEN_NAME,
        expires: new Date('1997-01-01').toUTCString(),
        value: '',
        path: '/',
      },
      {
        name: eodiroConst.EDR_REFRESH_TOKEN_NAME,
        expires: new Date('1997-01-01').toUTCString(),
        value: '',
      },
      ...refreshTokenPaths.map((path) => ({
        name: eodiroConst.EDR_REFRESH_TOKEN_NAME,
        expires: new Date('1997-01-01').toUTCString(),
        value: '',
        path,
      })),
    ]

    setCookie(req, res, cookies)

    res.end()
  },
})
