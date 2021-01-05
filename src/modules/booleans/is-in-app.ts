import { isClient } from '../utils/is-client'

export const isInApp = () => {
  return isClient() && (window as any).ReactNativeWebView
}
