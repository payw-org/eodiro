<template>
  <div class="menu-block" @click="$emit('click')">
    <!-- only visible when icon slot is set -->
    <div class="mb-icon-wrapper" v-if="$slots.icon">
      <slot name="icon"></slot>
    </div>

    <div class="mb-content-container">
      <slot name="content"></slot>
    </div>

    <div class="mb-arrow-wrapper">
      <span class="mb-arrow"></span>
    </div>
  </div>
</template>

<script>
export default {}
</script>


<style lang="scss">
@import '~/assets/styles/scss/main.scss';

.menu-block {
  @include block-style;

  .mb-icon-wrapper {
    margin-right: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;

    .icon {
      $icon-size: 2.3rem;
      width: $icon-size;
      height: $icon-size;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
    }
  }

  .mb-content-container {
    flex: 1;
    padding: 1rem 0;
  }

  .mb-arrow-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 1rem;

    .mb-arrow {
      display: block;
      width: 0.6rem;
      height: 2rem;
      background-image: url('~assets/images/eodiro/arrow_right_gray.svg');
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;

      @include dark-mode {
        background-image: url('~assets/images/eodiro/arrow_right_dark.svg');
      }
    }
  }
}
</style>
