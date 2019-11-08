/* ApiUrl
 * (c) 2019 Jang Haemin
 * @license MIT
 */

const localHost = 'http://localhost:4000'
const serverHost = 'https://api2.eodiro.com'

/** @type {string} */
let host = localHost

if (process.env.NODE_ENV === 'development') {
  host = localHost
} else {
  host = serverHost
}

export default {
  user: {
    signIn: `${host}/auth/sign-in`,
    signUp: `${host}/auth/sign-up`,
    signOut: `${host}/auth/sign-out`,
    verify: `${host}/auth/verify`
  }
}
