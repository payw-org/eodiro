import EodiroDialog from '~/modules/eodiro-dialog'

/**
 * @type {Vue.ComponentOptions}
 */
const options = {
  beforeMount() {
    if (!this.$store.state.auth.isSignedIn) {
      new EodiroDialog().alert(this.$t('global.requireAuth'))
      this.$router.replace(this.localePath('sign-in'))
    }
  }
}

export default options
