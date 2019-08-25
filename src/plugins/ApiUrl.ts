/* ApiUrl
 * (c) 2019 Jang Haemin
 * @license MIT
 */

type AvailableChannels = 'alpha' | 'beta'

export default class ApiUrl {
  static get(channel: AvailableChannels, version: number, location: string) {
    if (channel === undefined) {
      console.error('ApiUrl: No channel specified')
      return ''
    }

    if (version === undefined) {
      console.error('ApiUrl: No version specified')
      return ''
    }

    const protocol = 'https'
    const host = 'api.eodiro.com'

    // Trim starting '/' if possible
    location = location.replace(/^\//g, '')

    if (channel === 'alpha') {
      return `${protocol}://alpha.${host}/v${version}/${location}`
    } else {
      return `${protocol}://${host}/v${version}/${location}`
    }
  }
}
