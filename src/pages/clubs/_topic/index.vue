<template>
  <div id="clubs-topic-index-dummy" />
</template>

<script>
import pageBase from '~/mixins/page-base'

export default {
  name: 'clubs-topic-index',
  transition: 'clubs-to-index',
  mixins: [pageBase],
}
</script>

<style lang="scss">
#clubs-topic-index-dummy {
  pointer-events: none;
  visibility: hidden;
}
</style>
