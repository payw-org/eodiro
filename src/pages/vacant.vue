<template>
  <div id="eodiro-vacant">
    <nuxt-child keep-alive :keep-alive-props="{ include: $store.state.cachedComponents }" />
  </div>
</template>

<script>
import pageBase from '~/mixins/page-base'

export default {
  name: 'vacant-parent',
  mixins: [pageBase]
}
</script>
