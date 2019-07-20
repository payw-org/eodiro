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
$cushion-revival-time: 700ms;

.cushion {
  display: inline-block;
  border: 1px solid rgba(0, 0, 0, 0.07);
  // box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.07);
  border-radius: 0.7rem;
  transition: background-color $cushion-revival-time ease,
    box-shadow $cushion-revival-time ease, border $cushion-revival-time ease;

  @include dark-mode {
    border: 1px solid rgba(255, 255, 255, 0.1);
    // box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  }

  & > * {
    display: block;
    width: 100%;
    height: 100%;
    transition: transform $cushion-revival-time ease;
  }

  &.active {
    background-color: rgba(0, 0, 0, 0.01);
    border: 1px solid rgba(0, 0, 0, 0);
    box-shadow: inset 0 0 0.3rem rgba(0, 0, 0, 0.2);
    transition: background-color $cushion-push-time ease,
      box-shadow $cushion-push-time ease;

    @include dark-mode {
      background-color: rgba(255, 255, 255, 0.07);
      box-shadow: inset 0 0 0.3rem #000;
    }

    & > * {
      transform: scale(0.97);
      transition: transform $cushion-push-time ease;
    }
  }
}
</style>
