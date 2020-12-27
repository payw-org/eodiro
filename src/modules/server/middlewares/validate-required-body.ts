import initMiddleware, { NextApi } from '@/modules/next-api-routes-helpers'

type DataType =
  | 'string'
  | 'number'
  | 'bigint'
  | 'boolean'
  | 'symbol'
  | 'undefined'
  | 'object'
  | 'function'

export const validateRequiredBodyMiddleware = (
  requiredBodyStructure: Record<string, DataType>
) =>
  initMiddleware<NextApi>(async (req, res, next) => {
    const actualBody = req.body

    for (const key in requiredBodyStructure) {
      if (Object.prototype.hasOwnProperty.call(requiredBodyStructure, key)) {
        const dataType = requiredBodyStructure[key]
        const bodyValue = actualBody[key]

        if (bodyValue === undefined) {
          res
            .status(400)
            .json({ error: { message: `Field '${key}' is missing` } })

          return
        }

        if (bodyValue === null || typeof actualBody[key] !== dataType) {
          res.status(400).json({
            error: { message: `Data type of field '${key}' is wrong` },
          })

          return
        }
      }
    }

    next()
  })
