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

  switch (method) {
    case 'GET':
      if (handler.get) {
        await handler.get({ req, res })
      }
      break
    case 'POST':
      if (handler.post) {
        await handler.post({ req, res })
      }
      break
    default:
      break
  }
}

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
