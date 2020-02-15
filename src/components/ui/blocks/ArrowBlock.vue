<template>
  <div class="arrow-block" :class="{ fit: fit }" @click="$emit('click')">
    <NuxtLink v-if="link !== ''" :to="link" class="absolute-link" />

    <!-- only visible when icon slot is set -->
    <div v-if="$slots.icon" class="arrb-icon-wrapper">
      <slot name="icon" />
    </div>

    <div class="arrb-content-container">
      <slot name="content" />
    </div>

    <div v-if="!noArrow" class="arrb-arrow-wrapper">
      <span class="arrb-arrow" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    noArrow: {
      type: Boolean,
      required: false,
    },
    link: {
      type: String,
      required: false,
      default: '',
    },
    fit: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/main';

.arrow-block {
  @include block-style;
  cursor: pointer;

  &.fit {
    min-height: unset !important;
  }

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
      background-size: $icon-size $icon-size;
    }
  }

  .arrb-content-container {
    // flex: 1;
    width: calc(100% - #{s(4) * 2});
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
      background-image: url('~assets/images/arrow_right_gray.svg');
      background-position: center;
      background-repeat: no-repeat;
      background-size: 0.6rem auto;

      @include dark-mode {
        background-image: url('~assets/images/arrow_right_dark.svg');
      }
    }
  }
}
</style>
