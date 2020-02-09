/**
 * @type {Vue.ComponentOptions}
 */
const options = {
  created() {
    if (this.$store.state.auth.isSignedIn) {
      location.replace('/')
    }
  },
}

export default options
