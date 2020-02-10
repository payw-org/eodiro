<template>
  <div
    class="accordion"
    :class="{
      collapsed: isCollapsed,
      'will-collapse': willCollapse,
      collapsing: isCollapsing,
      elastic: elastic,
    }"
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
  props: {
    elastic: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isCollapsing: false,
      willCollapse: true,
      isCollapsed: true,
      contentContainerHeight: 0,
    }
  },
  methods: {
    toggleCollapse() {
      if (this.isCollapsing) {
        return
      } else {
        this.isCollapsing = true
      }

      if (this.isCollapsed) {
        this.willCollapse = false
        const container = this.$refs.accContentContainer
        container.style.height = `${container.firstElementChild.getBoundingClientRect()
          .height + 1}px`

        // eslint-disable-next-line no-unused-expressions
        container.getBoundingClientRect().height

        let f
        container.addEventListener(
          'transitionend',
          (f = () => {
            container.style.height = 'auto'
            // eslint-disable-next-line no-unused-expressions
            container.getBoundingClientRect().height
            container.removeEventListener('transitionend', f)
            this.isCollapsed = false
            this.isCollapsing = false
          })
        )
      } else {
        this.willCollapse = true
        const container = this.$refs.accContentContainer
        container.style.height = `${container.firstElementChild.getBoundingClientRect()
          .height + 1}px`

        // eslint-disable-next-line no-unused-expressions
        container.getBoundingClientRect().height

        setTimeout(() => {
          container.style.height = 0

          let f
          container.addEventListener(
            'transitionend',
            (f = () => {
              container.removeEventListener('transitionend', f)
              this.isCollapsed = true
              this.isCollapsing = false
            })
          )
        }, 0)
      }
    },
  },
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/main';

.accordion {
  $accordion: &;
  @include block-style;
  flex-wrap: wrap;
  position: relative;
  cursor: pointer;

  &.elastic {
    min-height: unset !important;

    .acc-face-container {
      min-height: unset !important;
    }
  }

  .acc-face-container {
    width: 100%;
    min-height: 5.5rem;
    display: flex;
    align-items: center;
    padding: $gentle-gap 0;
    word-break: break-all;

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
        transition: transform 150ms ease;

        @at-root #{$accordion}.will-collapse .acc-arrow {
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
    transition: all 150ms ease;

    @at-root #{$accordion}.will-collapse .acc-content-container {
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
