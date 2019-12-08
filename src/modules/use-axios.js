/* use-axios.js
 * A simple asynchronous hook for Axios.
 * (c) 2019 Jang Haemin
 * @license MIT
 */

import Axios from 'axios'

/**
 * @param {import('axios').AxiosRequestConfig} config
 * @returns {Promise<[any, import('axios').AxiosResponse]>}
 */
export default function useAxios(config) {
  return new Promise((resolve) => {
    Axios(config)
      .then((res) => {
        resolve([null, res])
      })
      .catch((err) => {
        if (err) {
          console.error(err)
        }

        // Network error
        // Perhaps our server is closed
        if (!err.response) {
          console.error('Network Error')

          // Client side alert
          if (typeof window !== 'undefined') {
            window.alert('Network Error')
          }
        }
        resolve([err, null])
      })
  })
}
