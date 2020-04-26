import { IncomingMessage, ServerResponse } from 'http'

export const reload = (req: IncomingMessage, res: ServerResponse): void => {
  res.writeHead(302, {
    Location: req.url,
  })
  res.end()
}
