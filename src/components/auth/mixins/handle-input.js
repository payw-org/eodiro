import { AuthApi } from '~/modules/eodiro-api'

/**
 * @type {Vue.ComponentOptions}
 */
const options = {
  data() {
    return {
      piInfo: {
        timeout: 0,
        isValid: true,
      },
      nnInfo: {
        timeout: 0,
        isValid: true,
      },
      pwInfo: {
        timeout: 0,
        isValid: true,
      },
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
        if (this.piInfo.timeout) {
          window.clearTimeout(this.piInfo.timeout)
        }
        this.piInfo.timeout = window.setTimeout(async () => {
          this.piInfo.isValid = await new AuthApi().validatePortalId(
            this.inputs.portalId
          )
        }, 300)
      }
    },
    validateNn() {
      if (this.isSignUp) {
        if (this.nnInfo.timeout) {
          window.clearTimeout(this.nnInfo.timeout)
        }
        this.nnInfo.timeout = window.setTimeout(async () => {
          this.nnInfo.isValid = await new AuthApi().validateNickname(
            this.inputs.nickname
          )
        }, 300)
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
        if (this.pwInfo.timeout) {
          window.clearTimeout(this.pwInfo.timeout)
        }
        this.pwInfo.timeout = window.setTimeout(async () => {
          this.pwInfo.isValid = await new AuthApi().validatePassword(
            this.inputs.password
          )
        }, 300)
      }
    },
  },
}

export default options
