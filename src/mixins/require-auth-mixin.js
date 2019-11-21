/**
 * @type {Vue.ComponentOptions}
 */
const options = {
  beforeMount() {
    if (!this.$store.state.auth.isSignedIn) {
      alert(this.$t('global.requireAuth'))
      this.$router.replace(this.localePath('sign-in'))
    }
  }
}

export default options
