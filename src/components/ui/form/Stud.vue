<template>
  <button class="stud" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script>
export default {}
</script>

<style lang="scss">
@import '~/assets/styles/scss/main.scss';

.stud {
  @include elm-fill;
  color: $base-black;
  width: 100%;
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
}
</style>
