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
@import '~/assets/styles/scss/global-variables.scss';

$cushion-time: 500ms;

.cushion {
  // border: 1px solid $gray;
  border-radius: 0.7rem;
  transition: background-color $cushion-time ease, box-shadow $cushion-time ease,
    border $cushion-time ease;

  & > * {
    display: block;
    width: 100%;
    height: 100%;
    transition: transform $cushion-time ease;
  }

  &.active {
    background-color: $light-gray;
    // border: 1px solid transparent;
    box-shadow: inset 0 0 0.25rem rgba(0, 0, 0, 0.2);
    transition: background-color 0ms ease, box-shadow 0ms ease;

    & > * {
      transform: scale(0.98);
      transition: transform 0ms ease;
    }
  }
}
</style>
