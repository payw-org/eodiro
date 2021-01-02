import { useEffect, useRef } from 'react'
import _useSwr from 'swr'
import {
  ConfigInterface,
  keyInterface,
  responseInterface,
} from 'swr/dist/types'

/**
 * Patched version of SWR to work around bug where a key change is not detected when using initial data
 * @see https://github.com/vercel/swr/issues/284
 */
const useSWR = <Data, Error>(
  key: keyInterface,
  config?: ConfigInterface<Data, Error>
): responseInterface<Data, Error> => {
  const hasMounted = useRef(false)

  useEffect(() => {
    hasMounted.current = true
  }, [])

  return _useSwr<Data, Error>(key, {
    ...config,
    initialData: hasMounted.current ? undefined : config?.initialData,
  })
}

export default useSWR
