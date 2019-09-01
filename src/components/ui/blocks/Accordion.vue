<template>
  <div
    class="accordion"
    :class="{ collapsed: isCollapsed }"
    :style="{ height: totalHeight }"
    @click="toggleCollapse"
  >
    <div class="acc-face-container">
      <div class="acc-face-content">
        <slot name="face" />
      </div>
      <div class="acc-arrow-wrapper">
        <span class="acc-arrow" />
      </div>
    </div>
    <div ref="accContentContainer" class="acc-content-container">
      <div class="wrapper">
        <slot name="content" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      totalHeight: 'auto',
      isCollapsed: true,
      contentContainerHeight: 0
    }
  },
  methods: {
    toggleCollapse() {
      if (this.isCollapsed) {
        this.isCollapsed = false
        this.$refs.accContentContainer.style.height =
          this.$refs.accContentContainer.firstElementChild.clientHeight +
          1 +
          'px'

        let f
        this.$refs.accContentContainer.addEventListener(
          'transitionend',
          (f = () => {
            this.contentContainerHeight = 'auto'
            this.$refs.accContentContainer.removeEventListener(
              'transitionend',
              f
            )
          })
        )
      } else {
        this.isCollapsed = true
        this.$refs.accContentContainer.style.height =
          this.$refs.accContentContainer.firstElementChild.clientHeight +
          1 +
          'px'
        this.$refs.accContentContainer.getBoundingClientRect()
        this.$refs.accContentContainer.style.height = 0
      }
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/main';

.accordion {
  $accordion: &;
  @include block-style;
  flex-wrap: wrap;
  position: relative;

  .acc-face-container {
    width: 100%;
    min-height: 5.5rem;
    display: flex;
    align-items: center;
    padding: $gentle-gap 0;

    .acc-face-content {
      flex: 1;
    }

    .acc-arrow-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 1rem;

      .acc-arrow {
        display: block;
        width: 0.6rem;
        height: 2rem;
        background-image: url('~assets/images/arrow_right_gray.svg');
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        transform: rotate(270deg);
        transition: transform 200ms ease;

        @at-root #{$accordion}.collapsed .acc-arrow {
          transform: rotate(90deg) !important;
        }

        @include dark-mode {
          background-image: url('~assets/images/arrow_right_dark.svg');
        }
      }
    }
  }

  .acc-content-container {
    overflow: hidden;
    width: 100%;
    border-top: 1px solid;
    @include separator;
    transition: height 200ms ease, padding 200ms ease, border 200ms ease;

    @at-root #{$accordion}.collapsed .acc-content-container {
      padding: 0;
      height: 0;
      border-top: 1px solid transparent;
    }

    .wrapper {
      padding: $gentle-gap 0;
    }
  }
}
</style>
