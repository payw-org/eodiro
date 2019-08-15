<template>
  <div id="eodiro-vacant">
    <nuxt-child keep-alive :keep-alive-props="{ include: $store.state.cachedComponents }" />
  </div>
</template>

<script>
export default {
  name: 'vacant-parent',
  meta: {
    appName: 'vacant'
  }
}
</script>
