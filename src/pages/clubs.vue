<template>
  <div id="eodiro-clubs">
    <nuxt-child
      keep-alive
      :keep-alive-props="{ include: $store.state.cachedComponents }"
    />
  </div>
</template>

<script>
import pageBase from '~/mixins/page-base'

export default {
  name: 'clubs-parent',
  mixins: [pageBase],
}
</script>
