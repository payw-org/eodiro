<template>
  <button class="btn" :class="{ full: full }" @click="$emit('click')">
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    full: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/main';

.btn {
  @include elm-fill;
  color: $base-black;
  min-height: $btn-height !important;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem !important;
  border-radius: r(4) !important;
  cursor: pointer;

  @include dark-mode {
    color: $base-white;
  }

  &.full {
    width: 100%;
  }
}
</style>
