<template>
  <img src="~assets/images/arrow_right_gray.svg" />
</template>

<script>
import icon from '~/components/ui/icons/icon'

export default {
  mixins: [icon],
}
</script>

<style lang="scss">
.eodiro-icon {
  display: inline-block;
  &.arrow-top {
  }
  &.arrow-right {
  }
  &.arrow-bottom {
  }
  &.arrow-left {
  }
}
</style>
