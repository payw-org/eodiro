/**
 * Pass --use-prod-api to use stable production API version
 * published on the server
 *
 * Pass --use-dev-api to use dev version of API
 * It requires local API server running
 *
 * Use these arguments only for the purpose of tests
 */

import { isClient } from './utils/is-client'
import { isDev } from './utils/is-dev'

// TODO: refactor the class name for universal usage
export default class ApiHost {
  static apiHost: string
  static cdnHost: string

  private static setHost(host: string, cdn = false): string {
    if (cdn) {
      this.cdnHost = host
    } else {
      this.apiHost = host
    }

    return host
  }

  public static getHost(cdn = false): string {
    if (cdn && this.cdnHost) {
      return this.cdnHost
    } else if (!cdn && this.apiHost) {
      return this.apiHost
    }

    const port = cdn ? 5020 : 4020
    const sub = cdn ? 'cdn' : 'api2'

    // Forced to use production API
    // distributed on eodiro.com server
    if (
      process.env.npm_config_use_prod_api ||
      (isClient() && document.documentElement.hasAttribute('data-use-prod-api'))
    ) {
      return this.setHost(`https://${sub}.eodiro.com`, cdn)
    }

    // Forced to use dev API
    if (
      process.env.npm_config_use_dev_api ||
      (isClient() && document.documentElement.hasAttribute('data-use-dev-api'))
    ) {
      if (isClient()) {
        return this.setHost(`http://${location.hostname}:${port}`, cdn)
      } else {
        return this.setHost(`http://localhost:${port}`, cdn)
      }
    }

    // Dev mode
    // Use local machine's IP address
    if (isDev() && isClient()) {
      return this.setHost(`http://${location.hostname}:${port}`, cdn)
    }

    // General, including server side call
    const host =
      process.env.NODE_ENV === 'development'
        ? `http://localhost:${port}`
        : `https://${sub}.eodiro.com`

    return this.setHost(host, cdn)
  }
}
