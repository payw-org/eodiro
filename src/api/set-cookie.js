import EodiroCookie, { defaultCookieOptions } from '../modules/cookie'

/**
 * @param {import('http').IncomingMessage} req
 * @param {import('http').ServerResponse} res
 */
export default function(req, res) {
  let body = ''
  req.on('data', (chunk) => {
    body += chunk
    body = JSON.parse(body)
    const options = body.options ? body.options : defaultCookieOptions
    if (body.options.expires) {
      body.options.expires = new Date(body.options.expires)
    }
    const eodiroCookie = new EodiroCookie({ req, res })
    eodiroCookie.set(body.name, body.value, options)

    res.end()
  })
}
