import dayjs from 'dayjs'

/**
 * @param {import('http').IncomingMessage} req
 * @param {import('http').ServerResponse} res
 */
export default function(req, res) {
  let body = ''
  req.on('data', (chunk) => {
    body += chunk
    body = JSON.parse(body)
    const options = body.options
      ? body.options
      : {
          expires: dayjs('2500-12-31').toDate(),
          path: '/',
        }
    if (body.options.expires) {
      body.options.expires = new Date(body.options.expires)
    }

    const cookie = generateCookieString(body.name, body.value, options)
    res.setHeader('Set-Cookie', cookie)

    res.end()
  })
}

function generateCookieString(name, value, options) {
  // If the value is an object
  // convert to JSON string
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }

  // Initialize a cookie string with the value
  let cookie = `${name}=${value};`

  // Append expires
  if (options && options.expires) {
    cookie += `Expires=${options.expires.toUTCString()};`
  }

  // Append cookie path
  if (options && options.path) {
    // Clean the path
    cookie += `Path=${options.path.replace(/'/g, '')};`
  }

  return cookie
}
