<template>
  <div id="donation">
    <div class="page-content">
      a
    </div>
  </div>
</template>

<script>
import pageBase from '~/mixins/page-base'
// import { Button, Textarea } from '~/components/ui'
// import Dialog from '~/plugins/eodiro-dialog'

export default {
  name: 'donation',
  // components: { Button, Textarea },
  mixins: [pageBase],
  head () {
    return {
      title: this.$t('donation.title')
    }
  },
  data () {
    return {}
  },
  mounted () {},
  methods: {}
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/main.scss';

#donation {
  max-width: 30rem !important;
  text-align: center;
  width: 100%;
  height: 100%;

  .page-content {
    height: 100%;
  }
}
</style>
