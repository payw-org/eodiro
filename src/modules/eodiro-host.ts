import { isClient } from './utils/is-client'

/**
 * Browser location when dev, https://eodiro.com when prod.
 * Only use on the client side.
 */
let eodiroHost: string

if (process.env.NODE_ENV === 'development') {
  if (isClient()) {
    eodiroHost = `${window.location.protocol}//${window.location.host}`
  } else {
    eodiroHost = 'http://localhost:3020'
  }
} else {
  eodiroHost = 'https://eodiro.com'
}

export { eodiroHost }
