import { isClient } from '../utils/is-client'

export const isApp = () => {
  return isClient() && window.isApp
}
