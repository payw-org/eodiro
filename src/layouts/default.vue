<template>
  <div class="wrapper">
    <nuxt></nuxt>
  </div>
</template>

<script>
export default {
  head() {
    return {
      htmlAttrs: {
        class: this.$store.state.colorSchemeClassName
      }
    }
  }
}
</script>
