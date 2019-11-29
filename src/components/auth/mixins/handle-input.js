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
    /**
     * @param {InputEvent} e
     */
    validatePi(e) {
      const unavailableChars = /[@ ]/g
      if (e && !e.data) {
        setTimeout(() => {
          this.inputs.portalId = this.inputs.portalId.replace(
            unavailableChars,
            ''
          )
        }, 0)
      }
      if (this.isSignUp) {
        check(this.piInfo, apiUrl.user.validatePi, {
          portalId: `${this.inputs.portalId}@cau.ac.kr`
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
    /**
     * @param {InputEvent} e
     */
    validatePw(e) {
      if (e && e.data && e.data.match(/[ㄱ-힣]/)) {
        this.$refs.passwordInput.value = ''
        alert(this.$t('auth.noHangulInPw'))
      }

      if (this.isSignUp) {
        check(this.pwInfo, apiUrl.user.validatePw, {
          password: this.inputs.password
        })
      }
    }
  }
}

export default options
