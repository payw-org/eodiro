<template>
  <div class="folder-block" :style="{ height: totalHeight }">
    <div class="face">
      <slot name="face"></slot>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
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

.folder-block {
  .face {
  }

  .content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: $posh-gap;
  }
}
</style>
