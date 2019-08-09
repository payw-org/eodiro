<template>
  <div class="accordion" :style="{ height: totalHeight }">
    <div class="acc-face-container">
      <slot name="face"></slot>
    </div>
    <div class="acc-content-container">
      <slot name="content"></slot>
    </div>
    <div class="acc-arrow-wrapper"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      totalHeight: 'auto'
    }
  }
}
</script>


<style lang="scss">
@import '~/assets/styles/scss/main.scss';

.accordion {
  @include block-style;
  position: relative;

  .acc-face-container {
  }

  .acc-content-container {
    position: absolute;
    padding: $posh-gap;
    top: 100%;
    left: 0;
    width: 100%;
    padding: $posh-gap;
  }
}
</style>
