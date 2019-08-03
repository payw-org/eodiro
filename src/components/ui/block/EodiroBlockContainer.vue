<template>
  <div class="eodiro-block-container">
    <slot></slot>
  </div>
</template>

<style lang="scss">
@import '~/assets/styles/scss/global-variables.scss';
@import '~/assets/styles/scss/global-mixins.scss';

.eodiro-block-container {
  display: grid !important;
  grid-gap: 1.2rem 1.5rem !important;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr)) !important;
}
</style>
