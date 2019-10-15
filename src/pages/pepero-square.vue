<template>
  <div id="eodiro-pepero-square">
    <EodiroChild />
  </div>
</template>

<script>
import Vue from 'vue'
import pageBase from '~/mixins/page-base'
import EodiroChild from '~/components/global/EodiroChild'

export default Vue.extend({
  head() {
    return {
      title: this.$t('peperoSquare.title')
    }
  },
  name: 'pepero-square',
  components: { EodiroChild },
  mixins: [pageBase]
})
</script>

<style lang="scss">
#eodiro-pepero-square {
  max-width: 40rem !important;
}
</style>
