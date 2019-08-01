<template>
  <button class="eodiro-button" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script>
export default {}
</script>

<style lang="scss">
@import '~/assets/styles/scss/global-variables.scss';
@import '~/assets/styles/scss/global-mixins.scss';
@import '~/assets/styles/scss/eodiro-ui.scss';

.eodiro-button {
  @include background-colored;
  color: $base-black;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 1.5rem;
  border-radius: $radius;

  @include dark-mode {
    color: $base-white;
  }
}
</style>
