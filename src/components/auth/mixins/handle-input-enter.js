/**
 * @type {Vue.ComponentOptions}
 */
const options = {
  methods: {
    enterPortalId() {
      if (this.isSignIn) {
        /** @type {HTMLInputElement} */
        const passwordInput = this.$refs.passwordInput
        passwordInput.focus()
      } else if (this.isSignUp) {
        /** @type {HTMLInputElement} */
        const nicknameInput = this.$refs.nicknameInput
        nicknameInput.focus()
      }
    },
    enterNickname() {
      /** @type {HTMLInputElement} */
      const passwordInput = this.$refs.passwordInput
      passwordInput.focus()
    },
    enterPassword() {
      if (this.isSignIn) {
        /** @type {HTMLInputElement} */
        const passwordInput = this.$refs.passwordInput
        passwordInput.blur()

        /** @type {HTMLButtonElement} */
        const processButton = this.$el.querySelector('.process-btn')
        processButton.click()
      } else if (this.isSignUp) {
        /** @type {HTMLInputElement} */
        const passwordConfirmInput = this.$refs.passwordConfirmInput
        passwordConfirmInput.focus()
      }
    },
    enterPasswordConfirm() {
      /** @type {HTMLInputElement} */
      const passwordConfirmInput = this.$refs.passwordConfirmInput
      passwordConfirmInput.blur()

      /** @type {HTMLButtonElement} */
      const processButton = this.$el.querySelector('.process-btn')
      processButton.click()
    },
  },
}

export default options
