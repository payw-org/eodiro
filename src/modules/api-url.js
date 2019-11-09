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
    signIn: {
      method: 'post',
      url: `${host}/auth/sign-in`
    },
    signUp: {
      method: 'post',
      url: `${host}/auth/sign-up`
    },
    signOut: {
      method: 'post',
      usl: `${host}/auth/sign-out`
    },
    verify: {
      method: 'post',
      url: `${host}/auth/verify`
    },
    validatePi: {
      method: 'post',
      url: `${host}/auth/validate/portal-id`
    },
    validateNn: {
      method: 'post',
      url: `${host}/auth/validate/nickname`
    },
    validatePw: {
      method: 'post',
      url: `${host}/auth/validate/password`
    },
    isSignedIn: {
      method: 'post',
      url: `${host}/auth/is-signed-in`
    },
    refreshToken: {
      method: 'post',
      url: `${host}/auth/refresh-token`
    }
  },
  peperoSquare: {
    getPosts: {
      method: 'get',
      url: `${host}/pepero-square/posts`
    },
    uploadPost: {
      method: 'post',
      url: `${host}/pepero-square/posts`
    }
  }
}
