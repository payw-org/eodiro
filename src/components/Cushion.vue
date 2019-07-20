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
@import '~/assets/styles/scss/global-mixins.scss';

$cushion-push-time: 0ms;
$cushion-revival-time: 1200ms;

.cushion {
  display: inline-block;
  // border: 1px solid $gray;
  // box-shadow: inset 0 0 0 1px $gray;
  border-radius: 0.7rem;
  transition: background-color $cushion-revival-time ease,
    box-shadow $cushion-revival-time ease, border $cushion-revival-time ease;

  & > * {
    display: block;
    width: 100%;
    height: 100%;
    transition: transform $cushion-revival-time ease;
  }

  &.active {
    background-color: #fcfcfc;
    // border: 1px solid transparent;
    box-shadow: inset 0 0 0.3rem rgba(0, 0, 0, 0.2);
    transition: background-color $cushion-push-time ease,
      box-shadow $cushion-push-time ease;

    @include dark-mode {
      background-color: #252525;
      box-shadow: inset 0 0 0.3rem rgba(0, 0, 0, 0.9);
    }

    & > * {
      transform: scale(0.97);
      transition: transform $cushion-push-time ease;
    }
  }
}
</style>
