<template>
  <div id="eodiro-meals">
    <NuxtChild
      keep-alive
      :keep-alive-props="{ include: $store.state.cachedComponents }"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import pageBase from '~/mixins/page-base'

export default Vue.extend({
  mixins: [pageBase]
})
</script>

<style lang="scss">
#eodiro-meals {
  max-width: 40rem !important;
}
</style>
