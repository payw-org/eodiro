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

export const validateRequiredReqDataMiddleware = <
  T extends Record<string, unknown>
>({
  body: testBody,
  query: testQuery,
}: {
  body?: Record<keyof T, DataType>
  query?: Record<keyof T, 'number' | 'string'>
}) =>
  initMiddleware<NextApi>(async (req, res, next) => {
    if (testQuery) {
      const requestQuery = req.query

      for (const key in testQuery) {
        if (Object.prototype.hasOwnProperty.call(testQuery, key)) {
          const exist = key in requestQuery
          const dataType = testQuery[key]
          const queryValue = requestQuery[key] as string

          if (exist && queryValue === undefined) {
            res
              .status(400)
              .json({ error: { message: `Query field '${key}' is missing` } })

            return
          }

          if (dataType === 'number') {
            const parsed = parseInt(queryValue, 10)

            if (queryValue === parsed.toString()) {
              requestQuery[key] = (parsed as unknown) as string
            } else if (exist) {
              res.status(400).json({
                error: {
                  message: `Data type of query field '${key}' is wrong`,
                },
              })

              return
            }
          } else if (
            exist &&
            (queryValue === null || typeof queryValue !== dataType)
          ) {
            res.status(400).json({
              error: {
                message: `Data type of query field '${key}' is wrong`,
              },
            })

            return
          }
        }
      }
    }

    if (testBody) {
      const requestBody = req.body

      for (const key in testBody) {
        if (Object.prototype.hasOwnProperty.call(testBody, key)) {
          const exist = key in requestBody
          const dataType = testBody[key]
          const bodyValue = requestBody[key]

          if (exist && bodyValue === undefined) {
            res
              .status(400)
              .json({ error: { message: `Body field '${key}' is missing` } })

            return
          }

          if (exist && (bodyValue === null || typeof bodyValue !== dataType)) {
            res.status(400).json({
              error: { message: `Data type of body field '${key}' is wrong` },
            })

            return
          }
        }
      }
    }

    next()
  })
