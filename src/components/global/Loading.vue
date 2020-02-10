<template>
  <div class="loading" :class="{ visible: visible }">
    {{ `🚀 ${$t('global.loading')}...` }}
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/main';

.loading {
  text-align: center;
  font-size: b(4);
  margin-top: s(10);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;

  &.visible {
    opacity: 1;
  }
}
</style>
