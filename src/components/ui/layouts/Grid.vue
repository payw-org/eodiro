<template>
  <div class="grid-layout" :class="this.proportion">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    proportion: {
      type: String,
      required: false,
      validator: function(value) {
        return ['small', 'medium', 'large'].indexOf(value) !== -1
      }
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/main.scss';

.grid-layout {
  display: grid;
  grid-gap: $posh-gap;
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
