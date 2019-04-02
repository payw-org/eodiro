<template>
  <div id="eodiro-app">
    <AppNav />
    <div class="ea-content">
      <transition
        name="fade"
      >
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import AppNav from './AppNav'

export default {
  components: { AppNav }
}
</script>

<style lang="scss">
@import '../scss/global-variables.scss';

.ea-content {
  position: relative;

  .content-item {
    padding: 2rem 1.2rem;
    // position: absolute;
    left: 0;
    top: 0;

    &.fade-enter-active, &.fade-leave-active {
      transition: all 300ms $eodiro-cb;
      opacity: 1;
      position: absolute;
    }
    &.fade-enter, &.fade-leave-to {
      opacity: 0;
    }
  }
}
</style>
