<template>
  <div id="eodiro-community">
    <NuxtChild
      keep-alive
      :keep-alive-props="{ include: $store.state.cachedComponents }"
    />
  </div>
</template>

<script>
import pageBase from '~/mixins/page-base'

export default {
  name: 'community',
  mixins: [pageBase]
}
</script>

<style lang="scss">
#eodiro-community {
  max-width: 40rem !important;
}
</style>
