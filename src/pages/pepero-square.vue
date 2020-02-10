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
  name: 'pepero-square',
  components: { EodiroChild },
  mixins: [pageBase],
  head() {
    return {
      title: this.$t('peperoSquare.title'),
    }
  },
})
</script>

<style lang="scss">
#eodiro-pepero-square {
  max-width: 40rem !important;
}
</style>
