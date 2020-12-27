import { IncomingMessage, ServerResponse } from 'http'
import type { NextApiRequest, NextApiResponse } from 'next'

type HandlerFunction = (
  req: NextApiRequest,
  res: NextApiResponse
) => void | Promise<void>

export const nextApi = (handler: {
  get?: HandlerFunction
  post?: HandlerFunction
}) => async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method?.toUpperCase()

  try {
    switch (method) {
      case 'GET':
        if (handler.get) {
          await handler.get(req, res)
        } else if (process.env.NODE_ENV === 'development') {
          res.json({ isDevMode: true })
        } else {
          res.end()
        }
        break
      case 'POST':
        if (handler.post) {
          await handler.post(req, res)
        }
        break
      default:
        break
    }
  } catch (error) {
    console.info(error.message)
  }
}

export const createHandler = <T = any>(
  handler: (
    req: NextApiRequest,
    res: NextApiResponse<T>
  ) => Promise<void> | void
) => handler

type DataType =
  | 'string'
  | 'number'
  | 'bigint'
  | 'boolean'
  | 'symbol'
  | 'undefined'
  | 'object'
  | 'function'

export function validateRequiredBody(
  req: NextApiRequest,
  res: NextApiResponse,
  requiredBodyStructure: Record<string, DataType>
) {
  const actualBody = req.body

  for (const key in requiredBodyStructure) {
    if (Object.prototype.hasOwnProperty.call(requiredBodyStructure, key)) {
      const dataType = requiredBodyStructure[key]
      const bodyValue = actualBody[key]

      if (
        bodyValue === undefined ||
        bodyValue === null ||
        typeof actualBody[key] !== dataType
      ) {
        const message = `Field ${key} is wrong`
        res.json({ error: { message } })

        return false
      }
    }
  }

  return true
}

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
export default function initMiddleware(
  middleware: (
    req: IncomingMessage,
    res: ServerResponse,
    next: (err?: any) => any
  ) => void
) {
  return (req: IncomingMessage, res: ServerResponse) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result)
        }
        return resolve(result)
      })
    })
}
