import { eodiroConsts } from '@/constants'
import { JwtErrorName, verifyToken } from '@/modules/jwt'
import initMiddleware from '@/modules/next-api-routes-helpers'
import { setCookie } from '@/pages/api/cookie'
import { IncomingMessage, ServerResponse } from 'http'
import { extractToken } from '../extract-token'
import { redirect } from '../redirect'

export const nextRequireAuthMiddleware = initMiddleware(
  async (req: IncomingMessage, res: ServerResponse, next) => {
    // Store last path
    setCookie(req, res, {
      name: eodiroConsts.LAST_PATH,
      value: req.url as string,
      httpOnly: false,
    })

    const accessToken = extractToken(req, res, 'access')
    const [err, authData] = await verifyToken(accessToken, 'access')

    if (err?.name === JwtErrorName.TokenExpiredError) {
      console.log('next middleware - access jwt expired')

      // Access token has expired

      redirect(res, '/api/auth/refresh')

      return
    }

    if (err) {
      redirect(res, '/login-please')

      return
    }

    if (authData) {
      console.log('next middleware - access authenticated')
      next()
    }
  }
)
