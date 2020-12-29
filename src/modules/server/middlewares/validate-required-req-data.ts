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
  dataType: 'number' | 'string'
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
  body: bodyTest,
  query: queryTest,
}: {
  body?: { [K in keyof T]: DataType }
  query?: Record<keyof T, 'number' | 'string' | QueryTestDetailOption>
}) =>
  initMiddleware<NextApi>(async (req, res, next) => {
    if (queryTest) {
      const actualQuery = req.query

      for (const key in queryTest) {
        if (Object.prototype.hasOwnProperty.call(queryTest, key)) {
          const value = queryTest[key]
          let required = true
          let dataType = value

          if (isQueryTestDetailOption(value)) {
            required = value.required
            dataType = value.dataType
          }

          const queryValue = actualQuery[key] as string

          if (required && queryValue === undefined) {
            res
              .status(400)
              .json({ error: { message: `Query field '${key}' is missing` } })

            return
          }

          if (dataType === 'number') {
            const parsed = parseInt(queryValue, 10)

            if (queryValue === parsed.toString()) {
              actualQuery[key] = (parsed as unknown) as string
            } else if (required) {
              res.status(400).json({
                error: {
                  message: `Data type of query field '${key}' is wrong`,
                },
              })

              return
            }
          } else if (
            required &&
            (queryValue === null || typeof actualQuery[key] !== dataType)
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

    if (bodyTest) {
      const actualBody = req.body

      for (const key in bodyTest) {
        if (Object.prototype.hasOwnProperty.call(bodyTest, key)) {
          const dataType = bodyTest[key]
          const bodyValue = actualBody[key]

          if (bodyValue === undefined) {
            res
              .status(400)
              .json({ error: { message: `Body field '${key}' is missing` } })

            return
          }

          if (bodyValue === null || typeof actualBody[key] !== dataType) {
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
