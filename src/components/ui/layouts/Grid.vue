<template>
  <div
    class="grid-layout"
    :class="proportion"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    proportion: {
      type: String,
      required: false,
      default: 'medium',
      validator(value) {
        return ['small', 'medium', 'large'].includes(value)
      }
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/main.scss';

.grid-layout {
  display: grid;
  grid-gap: s(5);
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));

  @include smaller-than(400px) {
    grid-template-columns: 1fr !important;
  }

  &.small {
    grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
  }

  &.large {
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  }
}
</style>
