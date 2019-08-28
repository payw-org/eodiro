<template>
  <img src="~assets/images/arrow_right_gray.svg" />
</template>

<script lang="ts">
import Vue from 'vue'
import icon from '~/mixins/icon'

export default Vue.extend({
  mixins: [icon]
})
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
