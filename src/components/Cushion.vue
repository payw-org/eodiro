<template>
  <div
    class="cushion"
    :class="{active: pressed}"
    @mousedown="press"
    @mouseup="clearPress"
    @mouseleave="clearPress"
    @touchstart="press"
    @touchend="clearPress"
    @touchmove="clearPress"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pressed: false
    }
  },
  methods: {
    press() {
      this.pressed = true
    },
    clearPress() {
      this.pressed = false
    }
  }
}
</script>


<style lang="scss">
@import '~/assets/styles/scss/cushion-ui.scss';
</style>
