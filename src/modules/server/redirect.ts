import { ServerResponse } from 'http'

export const redirect = (res: ServerResponse, to = '/'): void => {
  res.writeHead(302, {
    Location: to,
  })
  res.end()
}
