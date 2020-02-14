<template>
  <div
    class="grid-layout"
    :class="`proportion--${proportionClassName} gap--${gap}`"
  >
    <slot />
  </div>
</template>

<script>
import { camelToKebab } from '~/modules/string-utils'

export default {
  props: {
    proportion: {
      type: String,
      required: false,
      default: 'medium',
      validator(value) {
        return ['extraSmall', 'small', 'medium', 'large'].includes(value)
      },
    },
    gap: {
      type: String,
      required: false,
      default: 'medium',
      validator(value) {
        return ['small', 'medium', 'large'].includes(value)
      },
    },
  },
  computed: {
    proportionClassName() {
      return camelToKebab(this.proportion)
    },
  },
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/main.scss';

.grid-layout {
  display: grid;
  grid-gap: s(5);
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));

  &.proportion--extra-small {
    grid-template-columns: repeat(auto-fill, minmax(7rem, 1fr));
  }

  &.proportion--small {
    grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));

    @include smaller-than(300px) {
      grid-template-columns: 1fr !important;
    }
  }

  &.proportion--large {
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));

    @include smaller-than(400px) {
      grid-template-columns: 1fr !important;
    }
  }

  &.gap--small {
    grid-gap: s(3);
  }

  &.gap--large {
    grid-gap: s(7);
  }
}
</style>
