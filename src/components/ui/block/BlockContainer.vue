<template>
  <div class="block-container">
    <slot></slot>
  </div>
</template>

<style lang="scss">
@import '~/assets/styles/scss/main.scss';

.block-container {
  display: grid !important;
  grid-gap: $posh-gap !important;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr)) !important;
}
</style>
