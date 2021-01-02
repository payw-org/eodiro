import { isClient } from './utils/is-client'
import { isDev } from './utils/is-dev'

/**
 * Browser location when dev, https://eodiro.com when prod.
 * Only use on the client side.
 */
let eodiroHost: string

if (isClient()) {
  eodiroHost = `${window.location.protocol}//${window.location.host}`
} else if (isDev()) {
  eodiroHost = 'http://localhost:3020'
} else {
  eodiroHost = 'https://eodiro.com'
}

export { eodiroHost }
