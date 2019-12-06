<template>
  <div
    class="arrow-block"
    :class="{ pressed: isPressed, hovered: isHovered }"
    @click="$emit('click')"
  >
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
      required: false
    },
    link: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      isPressed: false,
      isHovered: false,
      pressTimeout: null
    }
  },
  mounted() {
    /** @type {HTMLElement} */
    const btn = this.$el

    if (window.isTouchDevice) {
      let touchmoveCallback, touchendCallback

      btn.addEventListener('touchstart', () => {
        this.pressTimeout = window.setTimeout(() => {
          this.isPressed = true
        }, 150)

        btn.addEventListener(
          'touchmove',
          (touchmoveCallback = () => {
            btn.removeEventListener('touchend', touchendCallback)
            this.isPressed = false
            window.clearTimeout(this.pressTimeout)
          })
        )

        btn.addEventListener(
          'touchend',
          (touchendCallback = () => {
            btn.removeEventListener('touchmove', touchmoveCallback)
            btn.removeEventListener('touchend', touchendCallback)

            window.clearTimeout(this.pressTimeout)
            this.isPressed = true
            window.setTimeout(() => {
              this.isPressed = false
            }, 500)
          })
        )
      })
    } else {
      let mousedownCallback,
        mouseupCallback,
        mousemoveCallback,
        mouseleaveCallback

      btn.addEventListener('mouseenter', () => {
        this.isHovered = true

        btn.addEventListener(
          'mousedown',
          (mousedownCallback = (e) => {
            e.preventDefault()
            this.isPressed = true

            btn.addEventListener(
              'mousemove',
              (mousemoveCallback = (e) => {
                btn.removeEventListener('mousedown', mousedownCallback)
                btn.removeEventListener('mousemove', mousemoveCallback)
                btn.removeEventListener('mouseup', mouseupCallback)
                this.isPressed = false
              })
            )

            btn.addEventListener(
              'mouseup',
              (mouseupCallback = () => {
                btn.removeEventListener('mouseup', mouseupCallback)
                btn.removeEventListener('mousedown', mousedownCallback)
                btn.removeEventListener('mousemove', mousemoveCallback)
                setTimeout(() => {
                  this.isPressed = false
                }, 500)
              })
            )
          })
        )

        btn.addEventListener(
          'mouseleave',
          (mouseleaveCallback = () => {
            btn.removeEventListener('mouseleave', mouseleaveCallback)
            this.isHovered = false
          })
        )
      })
    }
  },
  methods: {}
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/main';

.arrow-block {
  @include block-style;
  cursor: pointer;

  &.hovered {
    background: darken($base-white-blue, 3%);

    @include dark-mode {
      background: lighten($base-black-soft, 3%);
    }
  }

  &.pressed {
    background: darken($base-white-blue, 10%);

    @include dark-mode {
      background: lighten($base-black-soft, 10%);
    }
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
    flex: 1;
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
