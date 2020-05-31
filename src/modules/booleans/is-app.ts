import { isClient } from '../utils/is-client'

/**
 * Server side doesn't know the request is from a web browser or a web view
 * So use this module only from the client side
 */
export const isApp = () => {
  return isClient() && 'ReactNativeWebView' in window
}
