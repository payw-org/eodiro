<template>
  <div id="eodiro-banner-wrapper">
    <div id="eodiro-banner" :class="{ mini: appearMini }">
      <div class="banner">
        <transition name="bg-fade">
          <div
            v-if="!routeSwitch"
            :class="`background background--${hamlet0}`"
          />
        </transition>
        <transition name="bg-fade">
          <div
            v-if="routeSwitch"
            :class="`background background--${hamlet1}`"
          />
        </transition>
        <transition name="global-soft-fade">
          <HomeBgTile v-if="$route.meta.hamletName === 'home' && !isNavMode" />
        </transition>
        <div class="logo-wrapper">
          <transition name="icon-change">
            <div
              v-if="!routeSwitch"
              class="logo hamlet-icon"
              :class="`hamlet--${hamlet0}`"
            >
              <span class="icon" />
            </div>
          </transition>
          <transition name="icon-change">
            <div
              v-if="routeSwitch"
              class="logo hamlet-icon"
              :class="`hamlet--${hamlet1}`"
            >
              <span class="icon" />
            </div>
          </transition>
        </div>

        <nav class="eodiro-navigation">
          <transition name="icon-change">
            <div class="nav-icon-wrapper">
              <transition name="icon-change">
                <div
                  v-if="!routeSwitch"
                  class="nav-icon hamlet-icon"
                  :class="`hamlet--${hamlet0}`"
                >
                  <span class="icon" />
                </div>
              </transition>
              <transition name="icon-change">
                <div
                  v-if="routeSwitch"
                  class="nav-icon hamlet-icon"
                  :class="`hamlet--${hamlet1}`"
                >
                  <span class="icon" />
                </div>
              </transition>
            </div>
          </transition>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import disableScroll from 'disable-scroll'
import { CEM } from '~/modules/custom-event-manager'
import HomeBgTile from '~/components/home/HomeBgTile.vue'

export default {
  components: { HomeBgTile },
  data() {
    return {
      appearMini: false,
      isMini: false,
      isNavMode: false,
      observer: null,
      sentinel: null,
      routeSwitch: 0,
      zIndexSwitch: 0,
      hamlet0: '',
      hamlet1: '',
    }
  },
  computed: {
    currentHamlet() {
      return this.$route.meta.hamletName
    },
  },
  watch: {
    isMini(bool) {
      if (bool) {
        CEM.dispatchEvent('bannerminified')
      } else {
        CEM.dispatchEvent('bannerspreaded')
      }
    },
    currentHamlet(next, previous) {
      if (!this.routeSwitch) {
        this.hamlet0 = previous
        this.hamlet1 = next
      } else {
        this.hamlet1 = previous
        this.hamlet0 = next
      }

      this.routeSwitch = !this.routeSwitch
    },
  },
  created() {
    // Initialize hamlet0 on server side
    this.hamlet0 = this.currentHamlet

    if (this.$route.meta.depth > 1) {
      this.appearMini = true
    }
  },
  mounted() {
    // Sentinel for banner
    this.sentinel = document.querySelector('#banner-observer-sentinel')
    const bannerElm = document.getElementById('eodiro-banner')
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target.isSameNode(this.sentinel)) {
          if (this.$route.meta.depth > 1) {
            this.isMini = true
            this.isNavMode = true
            this.$nextTick(() => {
              bannerElm.classList.add('mini')
              bannerElm.classList.add('nav-mode')
            })
          } else if (entry.isIntersecting) {
            this.isNavMode = false
            this.$nextTick(() => {
              bannerElm.classList.remove('nav-mode')
            })
          } else {
            this.isNavMode = true
            this.$nextTick(() => {
              bannerElm.classList.add('nav-mode')
            })
          }
        }
      })
    })

    // Start observing
    this.observer.observe(this.sentinel)

    // When route changes(page move),
    // after scroll position restoration
    // reobserve the sentinel
    CEM.addEventListener('scrollrestored', this.$el, (e) => {
      // Reobserve sentinel
      this.observer.observe(this.sentinel)
      const bannerElm = document.getElementById('eodiro-banner')
      const scrollTop = e.detail.scrollPosition // Always positive
      const pageDepth = e.detail.pageDepth
      const bannerRect = bannerElm.getBoundingClientRect()
      const bannerTop = Math.abs(bannerRect.top) // Convert to positive
      const distance = bannerTop - scrollTop
      const bannerHeight = bannerRect.height
      const navHeight = this.$el
        .querySelector('.eodiro-navigation')
        .getBoundingClientRect().height
      const bannerHeightWithoutNav = bannerHeight - navHeight
      let newBannerTop = bannerTop - distance
      if (pageDepth > 1) {
        newBannerTop = bannerHeightWithoutNav
        bannerElm.classList.add('mini')
      } else {
        bannerElm.classList.remove('mini')
      }
      if (newBannerTop > bannerHeightWithoutNav) {
        newBannerTop = bannerHeightWithoutNav
      }
      bannerElm.classList.add('transitioning')
      bannerElm.style.transform = `translateY(${-newBannerTop}px)`
      setTimeout(() => {
        bannerElm.style.cssText = ''
        bannerElm.classList.remove('transitioning')
        disableScroll.off()
        CEM.dispatchEvent('bannertransitionended')
      }, 300)
    })

    // Before page leaves, unobserve sentinel
    // to prevent unexpected error
    CEM.addEventListener('beforepageleave', this.$el, () => {
      this.observer.unobserve(this.sentinel)
      const bannerElm = document.getElementById('eodiro-banner')
      const top = bannerElm.getBoundingClientRect().top
      bannerElm.style.cssText = `transform: translateY(${top}px); position: fixed; top: 0;`
      disableScroll.on()
    })
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

  #eodiro-banner {
    pointer-events: all;
    z-index: 9999;
    position: sticky;
    top: 0;
    top: calc(#{$nav-height} - #{$banner-height});
    width: 100%;
    height: $banner-height;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    transform: translateY(0px);
    @include bg; // Fill rounded corner with the same background color

    &.transitioning {
      transition: transform $banner-transition-time $banner-bezier !important;
    }

    &.mini {
      transform: translateY(calc(#{$nav-height} - #{$banner-height}));
      top: 0;

      .banner {
        transition: height $banner-transition-time $banner-bezier;
        transition-delay: 100ms;

        @include larger-than($width-step--1) {
          border-radius: 0 0 r(5) r(5);
        }
      }
    }

    &.nav-mode {
      .banner {
        // box-shadow: 0 0.2rem 0.5rem rgba(#000, 0);
      }

      .logo-wrapper {
        opacity: 0 !important;
      }

      .nav-icon-wrapper {
        opacity: 1 !important;
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
      // box-shadow: 0 0.2rem 0.5rem rgba(#000, 0.2);
      transition: box-shadow 500ms ease;
      transform: translate3d(0, 0, 0);

      @include larger-than($width-step--1) {
        width: calc(100% - #{2 * s(4)});
        height: calc(100% - #{s(4)});
        max-width: $master-content-max-width;
        border-radius: r(5);

        .background {
          border-radius: 0 0 r(5) r(5) !important;
          border-radius: r(5) !important;
          height: calc(#{$banner-height} - #{s(4)}) !important;
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
        height: $banner-height;
        display: flex;
        align-items: center;
        justify-content: center;

        &.bg-fade-leave-active {
          transition: opacity 500ms ease;
          opacity: 1;
          z-index: 1;
        }
        &.bg-fade-leave-to {
          opacity: 0;
        }

        &.background--sign-in,
        &.background--sign-up,
        &.background--forgot,
        &.background--me {
          background-image: linear-gradient(to bottom, #7b5aff, #5f14be);
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
        &.background--inquiry {
          background-image: linear-gradient(to bottom, #ffcf26, #ff9922);
        }
        &.background--donation {
          background-image: linear-gradient(to bottom, #e751ff, #b221f6);
        }
        &.background--opensource {
          background-image: linear-gradient(to bottom, #e751ff, #b221f6);
        }
        &.background--clubs {
          background-image: linear-gradient(to bottom, #00e3d6, #00b5dd);
        }
        &.background--lectures {
          background-image: linear-gradient(to bottom, #56f23d, #00d749);
        }
        &.background--pepero-square {
          background-image: linear-gradient(to bottom, #ff79b9, #ff3e78);
        }
        &.background--cafeteria {
          background-image: linear-gradient(to bottom, #31a8ff, #305dff);
        }
        &.background--privacy {
          background-image: linear-gradient(to bottom, #33d9a7, #04ab65);
        }
      }

      .logo-wrapper {
        opacity: 1;
        position: relative;
        z-index: 10;
        $logo-size: 7rem;
        width: $logo-size;
        height: $logo-size;
        transition: opacity 300ms ease, transform 180ms ease;
      }
    }

    .eodiro-navigation {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: $nav-height;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10;

      .prev-wrapper {
        display: flex;

        .prev-link {
          display: flex;

          button.prev {
            width: $nav-height;
            height: $nav-height;
            transform: scaleX(-1);
            @include bgImg(
              '~assets/images/arrow_right_white.svg',
              center,
              '20%'
            );

            @include dark-mode {
              @include bgImg(
                '~assets/images/arrow_right_black.svg',
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
          transform: translateY(0px);
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
        opacity: 0;
        transition: opacity 200ms ease;
      }

      .dummy {
        width: $nav-height;
        height: $nav-height;
      }
    }

    .hamlet-icon {
      display: flex;
      position: absolute;
      width: 100%;
      height: 100%;

      .icon {
        display: block;
        width: 100%;
        height: 100%;
        background-position: center;
        background-size: 4.5rem;
        background-repeat: no-repeat;
      }

      &.nav-icon {
        .icon {
          background-size: 2.5rem !important;
        }
      }

      &.hamlet--home {
        .icon {
          background-image: url(~assets/images/icons/eodiro-arrow-white.svg);

          @include dark-mode {
            background-image: url(~assets/images/icons/eodiro-arrow.svg);
          }
        }
      }

      &.hamlet--sign-in,
      &.hamlet--sign-up,
      &.hamlet--forgot {
        .icon {
          background-image: url(~assets/images/key-white.svg);

          @include dark-mode {
            background-image: url(~assets/images/key.svg);
          }
        }
      }

      &.hamlet--me {
        .icon {
          background-image: url(~assets/images/man-white.svg);

          @include dark-mode {
            background-image: url(~assets/images/man.svg);
          }
        }
      }

      &.hamlet--vacant {
        .icon {
          background-image: url(~assets/images/door_white.svg);

          @include dark-mode {
            background-image: url(~assets/images/door_black.svg);
          }
        }
      }

      &.hamlet--preferences {
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
          background-image: url(~assets/images/gear_white.svg);

          @include dark-mode {
            background-image: url(~assets/images/gear_black.svg);
          }
        }
      }

      &.hamlet--inquiry {
        .icon {
          background-image: url(~assets/images/inquiry_white.svg);

          @include dark-mode {
            background-image: url(~assets/images/inquiry_black.svg);
          }
        }
      }

      &.hamlet--donation {
        .icon {
          background-image: url(~assets/images/heart_white.svg);

          @include dark-mode {
            background-image: url(~assets/images/heart_black.svg);
          }
        }
      }
      &.hamlet--opensource {
        .icon {
          background-image: url(~assets/images/heart_white.svg);

          @include dark-mode {
            background-image: url(~assets/images/heart_black.svg);
          }
        }
      }

      &.hamlet--clubs {
        .icon {
          background-image: url(~assets/images/three-white.svg);

          @include dark-mode {
            background-image: url(~assets/images/three-black.svg);
          }
        }
      }

      &.hamlet--lectures {
        .icon {
          background-image: url(~assets/images/magnifier-white.svg);

          @include dark-mode {
            background-image: url(~assets/images/magnifier-black.svg);
          }
        }
      }

      &.hamlet--pepero-square {
        .icon {
          background-image: url(~assets/images/community-white.svg);

          @include dark-mode {
            background-image: url(~assets/images/community.svg);
          }
        }
      }

      &.hamlet--cafeteria {
        .icon {
          background-image: url(~assets/images/fork_knife_white.svg);

          @include dark-mode {
            background-image: url(~assets/images/fork_knife_black.svg);
          }
        }
      }

      &.hamlet--privacy {
        .icon {
          background-image: url(~assets/images/shield-white.svg);

          @include dark-mode {
            background-image: url(~assets/images/shield.svg);
          }
        }
      }
    }
  }
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
