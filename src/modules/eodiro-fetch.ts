/**
 * @deprecated
 */

import fetch from 'isomorphic-unfetch'

type UseFetchError = any
type UseFetchStatusCode = number

async function eodiroFetch<T = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<[UseFetchError, T, UseFetchStatusCode]> {
  try {
    const res = await fetch(input, init)
    try {
      try {
        const data = (await res.json()) as T
        return [null, data, res.status]
      } catch (err) {
        return [null, null, res.status]
      }
    } catch (err) {
      console.error(err)
      return [err, null, res.status]
    }
  } catch (err) {
    console.error(err)
    return [err, null, null]
  }
}

export default eodiroFetch
