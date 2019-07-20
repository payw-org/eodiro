<template>
  <div class="wrapper">
    <nuxt></nuxt>
    <eodiro-modal></eodiro-modal>
  </div>
</template>

<script>
import EodiroModal from '~/plugins/eodiro-modal/EodiroModal'

export default {
  head() {
    return {
      htmlAttrs: {
        class: this.$store.state.colorSchemeClassName
      }
    }
  },
  components: { EodiroModal }
}
</script>
