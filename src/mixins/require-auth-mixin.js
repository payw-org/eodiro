import EodiroDialog from '~/modules/eodiro-dialog'

// TODO: window.alert() or eodiro dialog are bypassed without any errors

/**
 * @type {Vue.ComponentOptions}
 */
const options = {
  async beforeMount() {
    if (!this.$store.state.auth.isSignedIn) {
      await new EodiroDialog().alert(this.$t('global.requireAuth'))
      this.$router.replace(this.localePath('sign-in'))
    }
  }
}

export default options
