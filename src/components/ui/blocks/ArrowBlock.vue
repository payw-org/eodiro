<template>
  <div class="arrow-block" @click="$emit('click')">
    <!-- only visible when icon slot is set -->
    <div class="arrb-icon-wrapper" v-if="$slots.icon">
      <slot name="icon"></slot>
    </div>

    <div class="arrb-content-container">
      <slot name="content"></slot>
    </div>

    <div class="arrb-arrow-wrapper" v-if="!noArrow">
      <span class="arrb-arrow"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    noArrow: {
      type: Boolean,
      required: false
    }
  }
}
</script>


<style lang="scss">
@import '~/assets/styles/scss/main.scss';

.arrow-block {
  @include block-style;

  .arrb-icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;

    .icon {
      $icon-size: 2.3rem;
      margin-right: $gentle-gap;
      width: $icon-size;
      height: $icon-size;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
    }
  }

  .arrb-content-container {
    flex: 1;
    padding: 1rem 0;
  }

  .arrb-arrow-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 1rem;

    .arrb-arrow {
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
