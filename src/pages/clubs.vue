<template>
  <div id="eodiro-clubs">
    <nuxt-child keep-alive :keep-alive-props="{ include: $store.state.cachedComponents }"></nuxt-child>
  </div>
</template>

<script>
export default {
  name: 'clubs-parent',
  meta: {
    appName: 'clubs'
  }
}
</script>
