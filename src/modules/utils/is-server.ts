import { isClient } from './is-client'

export function isServer() {
  return !isClient()
}
