<template>
  <div id="eodiro-community">
    <p>community</p>
  </div>
</template>

<script>
import pageBase from '~/mixins/page-base'

export default {
  name: 'community-index',
  mixins: [pageBase],
  head () {
    return {
      title: this.$t('community.title')
    }
  },
  meta: {
    depth: 1,
    hamletName: 'community'
  }
}
</script>
