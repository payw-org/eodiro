<template>
  <button class="btn" :class="{ full: full }" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    full: {
      type: Boolean,
      required: false
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/main.scss';

.btn {
  @include elm-fill;
  color: $base-black;
  height: $btn-height !important;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1.5rem !important;
  border-radius: $border-radius !important;
  cursor: pointer;

  @include dark-mode {
    color: $base-white;
  }

  &.full {
    width: 100%;
  }
}
</style>
