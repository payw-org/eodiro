import Dialog from '~/plugins/eodiro-dialog'

/**
 * @type {Vue.ComponentOptions}
 */
const mixinOptions = {
  data() {
    return {
      hasError: false
    }
  },
  mounted() {
    if (this.hasError) {
      new Dialog().alert(this.$t('global.dataFetchError'))
    }
  }
}

export default mixinOptions
