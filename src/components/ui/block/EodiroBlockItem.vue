<template>
  <div class="eodiro-block-item" @click="$emit('click')">
    <!-- only visible when icon slot is set -->
    <div class="icon-wrapper" v-if="$slots.icon">
      <slot name="icon"></slot>
    </div>

    <div class="content-wrapper">
      <slot name="content"></slot>
    </div>

    <div class="arrow-wrapper">
      <span class="arrow"></span>
    </div>
  </div>
</template>

<script>
export default {}
</script>


<style lang="scss">
@import '~/assets/styles/scss/global-mixins.scss';
@import '~/assets/styles/scss/eodiro-ui.scss';

.eodiro-block-item {
  @include background-colored;
  border-radius: $radius;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem 0 1.2rem;
  min-height: 5.5rem;

  &,
  & * {
    cursor: pointer !important;
  }

  .icon-wrapper {
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

  .content-wrapper {
    flex: 1;
    padding: 1rem 0;

    &,
    & * {
      font-weight: 500;
      font-size: 1.2rem;
    }
  }

  .arrow-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 1rem;

    .arrow {
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
