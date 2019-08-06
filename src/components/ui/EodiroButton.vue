<template>
  <button class="eodiro-button" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script>
export default {}
</script>

<style lang="scss">
@import '~/assets/styles/scss/variables/all.scss';
@import '~/assets/styles/scss/mixins/all.scss';
@import '~/assets/styles/scss/eodiro-ui.scss';

.eodiro-button {
  @include background-colored;
  color: $base-black;
  width: 100%;
  height: $btn-height !important;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1.5rem !important;
  border-radius: $radius !important;

  @include dark-mode {
    color: $base-white;
  }

  &,
  & * {
    cursor: pointer;
  }
}
</style>
