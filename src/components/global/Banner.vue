<template>
  <div id="eodiro-banner-wrapper">
    <BannerCore v-if="bannerSwitch" />
    <BannerCore v-if="!bannerSwitch" />
  </div>
</template>

<script>
import BannerCore from './BannerCore'

export default {
  components: { BannerCore },
  data() {
    return {
      bannerSwitch: 0,
    }
  },
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/main';

$banner-transition-time: 300ms;
$banner-bezier: cubic-bezier(0.34, 0.23, 0, 1);

#eodiro-banner-wrapper {
  position: absolute;
  z-index: 8888;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  user-select: none;
  pointer-events: none;
}

#banner-observer-sentinel {
  position: absolute;
  // top: calc(#{$banner-height} - #{$nav-height});
  top: calc(#{$banner-height / 2} + 2rem);
  // top: $banner-height;
  right: 0;
  left: 0;
  height: 1px;
  pointer-events: none;
  background: none;
  visibility: hidden;
}

$icon-change-transition: opacity 150ms ease, transform 300ms ease;

.icon-change-enter-active {
  transition: $icon-change-transition;
  transition-delay: 200ms;
  opacity: 1;
  transform: scale(1);
}
.icon-change-enter {
  opacity: 0;
  transform: scale(0.8);
}
.icon-change-leave-active {
  transition: $icon-change-transition;
  opacity: 1;
  transform: scale(1);
}
.icon-change-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
