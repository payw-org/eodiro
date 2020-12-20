import type { NextApiRequest, NextApiResponse } from 'next'

type HandlerFunction = (ctx: {
  req: NextApiRequest
  res: NextApiResponse
}) => void | Promise<void>

export const nextApi = (handler: {
  get?: HandlerFunction
  post?: HandlerFunction
}) => async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method?.toUpperCase()

  switch (method) {
    case 'GET':
      await handler.get({ req, res })
      break
    case 'POST':
      await handler.post({ req, res })
      break
    default:
      break
  }
}
