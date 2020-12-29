import { EodiroApiRequest, EodiroApiResponse } from '@/types/next'
import { IncomingMessage, ServerResponse } from 'http'

type HandlerFunction = (
  req: EodiroApiRequest,
  res: EodiroApiResponse
) => void | Promise<void>

export const nextApi = (handler: {
  get?: HandlerFunction
  post?: HandlerFunction
}) => async (req: EodiroApiRequest, res: EodiroApiResponse) => {
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
    req: EodiroApiRequest,
    res: EodiroApiResponse<T>
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
  req: EodiroApiRequest,
  res: EodiroApiResponse,
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

type MiddlewareNodeRequestTypes = {
  nodeApi: IncomingMessage
  nextApi: EodiroApiRequest
}

type MiddlewareNextRequestTypes = {
  nodeApi: ServerResponse
  nextApi: EodiroApiResponse
}

type NodeApi = 'nodeApi'
export type NextApi = 'nextApi'
type ApiType = NodeApi | NextApi

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
export default function initMiddleware<T extends ApiType>(
  middleware: (
    req: MiddlewareNodeRequestTypes[T],
    res: MiddlewareNextRequestTypes[T],
    next: (err?: any) => any
  ) => void
) {
  return (
    req: MiddlewareNodeRequestTypes[T],
    res: MiddlewareNextRequestTypes[T]
  ) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result)
        }
        return resolve(result)
      })
    })
}

export const typeQuery = <T = any>(query: any): T => query as T
