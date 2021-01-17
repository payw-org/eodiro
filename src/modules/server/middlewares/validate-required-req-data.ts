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

type QueryTestDetailOption = {
  required: boolean
  dataType: 'number' | 'string' | 'boolean'
}

function isQueryTestDetailOption(
  value: string | QueryTestDetailOption
): value is QueryTestDetailOption {
  if (
    typeof value === 'object' &&
    typeof value.required === 'boolean' &&
    typeof value.dataType === 'string'
  ) {
    return true
  }

  return false
}

export const validateRequiredReqDataMiddleware = <
  T extends Record<string, unknown>
>({
  body: testBody,
  query: testQuery,
}: {
  body?: Record<keyof T, DataType | QueryTestDetailOption>
  query?: Record<
    keyof T,
    'number' | 'string' | 'boolean' | QueryTestDetailOption
  >
}) =>
  initMiddleware<NextApi>(async (req, res, next) => {
    if (testQuery) {
      const requestQuery = req.query || {}

      for (const key in testQuery) {
        if (Object.prototype.hasOwnProperty.call(testQuery, key)) {
          const option = testQuery[key]
          const exist = key in requestQuery

          let required = true
          let dataType = option

          if (isQueryTestDetailOption(option)) {
            required = option.required
            dataType = option.dataType
          }

          const queryValue = requestQuery[key] as string

          if (required && !exist) {
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
                  message: `Data type of query field '${key}' should be number.`,
                },
              })

              return
            }
          } else if (dataType === 'boolean') {
            if (queryValue === 'true' || queryValue === 'false') {
              requestQuery[key] =
                queryValue === 'true'
                  ? ((true as unknown) as string)
                  : ((false as unknown) as string)
            } else if (exist) {
              res.status(400).json({
                error: {
                  message: `Data type of query field '${key}' should be boolean.`,
                },
              })

              return
            }
          } else if (
            required &&
            (queryValue === null || typeof queryValue !== dataType)
          ) {
            res.status(400).json({
              error: {
                message: `Data type of query field '${key}' should be string.`,
              },
            })

            return
          }
        }
      }
    }

    if (testBody) {
      const requestBody = req.body || {}

      for (const key in testBody) {
        if (Object.prototype.hasOwnProperty.call(testBody, key)) {
          const option = testBody[key]
          const exist = key in requestBody

          let required = true
          let dataType = option

          if (isQueryTestDetailOption(option)) {
            required = option.required
            dataType = option.dataType
          }

          const bodyValue = requestBody[key]

          if (required && !exist) {
            res
              .status(400)
              .json({ error: { message: `Body field '${key}' is missing` } })

            return
          }

          if (
            required &&
            (bodyValue === null || typeof bodyValue !== dataType)
          ) {
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
