<template>
  <div id="eodiro-banner" :class="{ mini: isMini }">
    <div class="banner">
      <transition name="bg-fade" v-for="appName in $store.state.appList" :key="`bg-${appName}`">
        <div
          v-if="appName === $store.state.currentAppName"
          class="background"
          :class="`background--${appName}`"
        ></div>
      </transition>
      <transition name="global-soft-fade">
        <HomeBgTile v-if="$store.state.currentAppName === 'home' && !isMini" />
      </transition>
      <div class="logo-wrapper">
        <transition
          name="icon-change"
          v-for="appName in $store.state.appList"
          :key="`banner-${appName}`"
        >
          <div
            v-if="appName === $store.state.currentAppName"
            class="logo app-icon"
            :class="`app--${appName}`"
          >
            <span class="icon"></span>
          </div>
        </transition>
      </div>

      <nav class="eodiro-navigation">
        <div class="prev-wrapper" v-if="$store.state.prevPath">
          <nuxt-link class="prev-link" :to="localePath($store.state.prevPath)">
            <button class="prev"></button>
          </nuxt-link>
        </div>
        <div class="dummy" v-if="!$store.state.prevPath"></div>
        <transition name="icon-change">
          <nuxt-link class="nav-icon-link" :to="localePath('index')" v-if="isMini">
            <div class="nav-icon-wrapper">
              <transition
                name="fade"
                v-for="appName in $store.state.appList"
                :key="`nav-${appName}`"
              >
                <div
                  v-if="appName === $store.state.currentAppName"
                  class="nav-icon app-icon app--home"
                  :class="[
                  `app--${appName}`,
                ]"
                >
                  <span class="icon"></span>
                </div>
              </transition>
            </div>
          </nuxt-link>
        </transition>
        <div class="dummy"></div>
      </nav>
    </div>
  </div>
</template>

<script>
import HomeBgTile from '~/components/home/HomeBgTile.vue'

export default {
  components: { HomeBgTile },
  data() {
    return {
      isMini: false,
      observer: null,
      sentinel: null
    }
  },
  watch: {
    $route(to, from) {
      // stop observing when the route is still changing
      this.observer.unobserve(this.sentinel)

      // after page load and scroll to the proper position,
      // observe again
      window.$nuxt.$once('triggerScroll', () => {
        this.observer.observe(this.sentinel)
      })
    }
  },
  created() {
    // for the first time,
    // check if the page requires Banner mini mode
    if (this.$store.state.banner.isForcedMini) {
      this.isMini = true
    }
  },
  mounted() {
    // middle sentinel for navigation app icon transition effect
    this.sentinel = document.querySelector('#banner-observer-sentinel')
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.target.isSameNode(this.sentinel)) {
          if (this.$store.state.banner.isForcedMini) {
            this.isMini = true
          } else if (entry.isIntersecting) {
            this.isMini = false
          } else {
            this.isMini = true
          }
        }
      })
    })

    // start observing
    this.observer.observe(this.sentinel)
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/variables/all.scss';
@import '~/assets/styles/scss/mixins/all.scss';

#eodiro-banner {
  position: fixed;
  z-index: 9999;
  top: 0;
  width: 100%;
  height: $banner-height;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background-color: #fff;
  transition: transform 400ms cubic-bezier(0.34, 0.23, 0, 1),
    background-color $color-scheme-transition-time ease;

  @include dark-mode {
    background-color: #000;
  }

  &.mini {
    // transform: translateY(calc(#{$nav-height * 2} - #{$banner-height}));
    transform: translateY(calc(#{$nav-height} - #{$banner-height}));

    .logo-wrapper {
      opacity: 0;
      // transform: translateY(-30%);
    }
  }

  .banner {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    box-shadow: 0 0.2rem 1rem rgba(#000, 0.25);

    @include larger-than($width-step--1) {
      width: calc(100% - #{2 * $posh-gap});
      height: calc(100% - #{$posh-gap});
      max-width: $master-content-max-width;
      border-radius: $radius;

      .background {
        border-radius: $radius !important;
        overflow: hidden;
      }
    }

    .background {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      background-image: linear-gradient(to bottom, $c-step--3, $c-step--4);
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      // &.bg-fade-enter-active {
      //   transition: opacity 500ms ease;
      //   opacity: 1;
      //   z-index: 0;
      // }
      // &.bg-fade-enter {
      //   opacity: 1;
      // }
      &.bg-fade-leave-active {
        transition: opacity 600ms ease;
        opacity: 1;
        z-index: 1;
      }
      &.bg-fade-leave-to {
        opacity: 0;
      }

      &.background--home {
        background-image: linear-gradient(to bottom, $c-step--3, $c-step--4);
      }
      &.background--vacant {
        background-image: linear-gradient(to bottom, $c-step--3, $c-step--4);
      }
      &.background--preferences {
        background-image: linear-gradient(to bottom, #939393, #636363);
      }
      &.background--review {
        background-image: linear-gradient(to bottom, #ffc700, #ff8a00);
      }
      &.background--clubs {
        background-image: linear-gradient(to bottom, #00e3d6, #00b5dd);
      }
    }

    .logo-wrapper {
      position: relative;
      z-index: 1;
      width: 7rem;
      height: 7rem;
      transition: opacity 300ms ease, transform 300ms ease;
    }
  }

  .eodiro-navigation {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: $nav-height;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .prev-wrapper {
      display: flex;

      .prev-link {
        display: flex;

        button.prev {
          width: 4rem;
          width: 50px;
          height: $nav-height;
          transform: scaleX(-1);
          @include bgImg(
            '~assets/images/eodiro/arrow_right_white.svg',
            center,
            '20%'
          );

          @include dark-mode {
            @include bgImg(
              '~assets/images/eodiro/arrow_right_black.svg',
              center,
              '20%'
            );
          }
        }
      }
    }

    .nav-icon-link {
      &.nav-icon-fade-enter-active,
      &.nav-icon-fade-leave-active {
        transition: opacity 300ms ease, transform 200ms ease;
        opacity: 1;
        transform: translateY(0%);
      }
      &.nav-icon-fade-enter,
      &.nav-icon-fade-leave-to {
        opacity: 0;
        transform: translateY(30%);
      }
    }

    .nav-icon-wrapper {
      position: relative;
      width: $nav-height;
      height: $nav-height;
    }

    .dummy {
      width: 4rem;
    }
  }

  .app-icon {
    display: flex;
    position: absolute;
    width: 100%;
    height: 100%;

    .icon {
      display: block;
      width: 100%;
      height: 100%;
    }

    &.app--home {
      .icon {
        @include bgImg(
          '~assets/images/eodiro/eodiro_logo_arrow_white.svg',
          center,
          '50%'
        );

        @include dark-mode {
          @include bgImg(
            '~assets/images/eodiro/eodiro_logo_arrow_black.svg',
            center,
            '50%'
          );
        }
      }
    }

    &.app--vacant {
      .icon {
        @include bgImg('~assets/images/eodiro/door_white.svg', center, '75%');

        @include dark-mode {
          @include bgImg('~assets/images/eodiro/door_black.svg', center, '75%');
        }
      }
    }

    &.app--preferences {
      @keyframes rotatingGear {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }

      .icon {
        animation: rotatingGear 5s linear 0s infinite normal forwards;

        @include bgImg('~assets/images/eodiro/gear_white.svg', center, '75%');

        @include dark-mode {
          @include bgImg('~assets/images/eodiro/gear_black.svg', center, '75%');
        }
      }
    }

    &.app--review {
      .icon {
        @include bgImg('~assets/images/eodiro/review_white.svg', center, '75%');

        @include dark-mode {
          @include bgImg(
            '~assets/images/eodiro/review_black.svg',
            center,
            '75%'
          );
        }
      }
    }

    &.app--clubs {
      .icon {
        @include bgImg('~assets/images/eodiro/clubs_white.svg', center, '75%');

        @include dark-mode {
          @include bgImg(
            '~assets/images/eodiro/clubs_black.svg',
            center,
            '75%'
          );
        }
      }
    }
  }
}

#banner-observer-sentinel {
  position: absolute;
  top: calc(#{$banner-height} - #{$nav-height});
  top: $banner-height / 3;
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
