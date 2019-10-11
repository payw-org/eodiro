<template>
  <div id="eodiro-community">
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
      title: this.$t('community.title')
    }
  },
  name: 'community',
  components: { EodiroChild },
  mixins: [pageBase]
})
</script>

<style lang="scss">
#eodiro-community {
  max-width: 40rem !important;
}
</style>
