/* ApiUrl
 * (c) 2019 Jang Haemin
 * @license MIT
 */

const localHost = 'http://localhost:4000'
const serverHost = 'https://api2.eodiro.com'
const useServer = false

if (useServer) {
  console.warn('api-url.js: eodiro is forcedly connecting to the remote server')
}

/** @type {string} */
let host = localHost

if (process.env.NODE_ENV === 'development' && !useServer) {
  host = localHost
} else {
  host = serverHost
}

export default {
  user: {
    signIn: {
      method: 'post',
      url: `${host}/auth/sign-in`,
    },
    signUp: {
      method: 'post',
      url: `${host}/auth/sign-up`,
    },
    signOut: {
      method: 'post',
      usl: `${host}/auth/sign-out`,
    },
    verify: {
      method: 'post',
      url: `${host}/auth/verify`,
    },
    validatePi: {
      method: 'post',
      url: `${host}/auth/validate/portal-id`,
    },
    validateNn: {
      method: 'post',
      url: `${host}/auth/validate/nickname`,
    },
    validatePw: {
      method: 'post',
      url: `${host}/auth/validate/password`,
    },
    isSignedIn: {
      method: 'post',
      url: `${host}/auth/is-signed-in`,
    },
    information: {
      method: 'get',
      url: `${host}/auth/information`,
    },
    refreshToken: {
      method: 'post',
      url: `${host}/auth/refresh-token`,
    },
    clearToken: {
      method: 'delete',
      url: `${host}/auth/refresh-token`,
    },
  },
  peperoSquare: {
    getPosts: {
      method: 'get',
      url: `${host}/pepero-square/posts`,
    },
    getRecentPosts: {
      method: 'get',
      url: `${host}/pepero-square/posts/recent`,
    },
    getAPost: {
      method: 'get',
      url: `${host}/pepero-square/post`,
    },
    uploadPost: {
      method: 'post',
      url: `${host}/pepero-square/post`,
    },
    getComments: {
      method: 'get',
      url: `${host}/pepero-square/posts/comments`,
    },
    uploadComment: {
      method: 'post',
      url: `${host}/pepero-square/posts/comment`,
    },
  },
}
