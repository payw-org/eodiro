<template>
  <div class="eodiro-block-container">
    <slot></slot>
  </div>
</template>

<style lang="scss">
@import '~/assets/styles/scss/variables/all.scss';
@import '~/assets/styles/scss/global-mixins.scss';

.eodiro-block-container {
  display: grid !important;
  grid-gap: $posh-gap !important;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr)) !important;
}
</style>
