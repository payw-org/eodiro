import Axios from 'axios'
import apiUrl from '~/modules/api-url'

function check(info, api, data) {
  if (info.timeout) {
    clearTimeout(info.timeout)
  }

  info.timeout = setTimeout(() => {
    Axios({
      ...api,
      data
    })
      .then(() => {
        info.isValid = true
      })
      .catch(() => {
        info.isValid = false
      })
      .finally(() => {
        const key = Object.keys(data)[0]
        if (data[key].length === 0) {
          info.isValid = true
        }
      })
  }, 300)
}

/**
 * @type {Vue.ComponentOptions}
 */
const options = {
  data() {
    return {
      piInfo: {
        timeout: 0,
        isValid: true
      },
      nnInfo: {
        timeout: 0,
        isValid: true
      },
      pwInfo: {
        timeout: 0,
        isValid: true
      }
    }
  },
  methods: {
    validatePi() {
      if (this.isSignUp) {
        check(this.piInfo, apiUrl.user.validatePi, {
          portalId: this.inputs.portalId
        })
      }
    },
    validateNn() {
      if (this.isSignUp) {
        check(this.nnInfo, apiUrl.user.validateNn, {
          nickname: this.inputs.nickname
        })
      }
    },
    validatePw() {
      if (this.isSignUp) {
        check(this.pwInfo, apiUrl.user.validatePw, {
          password: this.inputs.password
        })
      }
    }
  }
}

export default options
