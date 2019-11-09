<template>
  <div id="eodiro-banner-wrapper">
    <div id="eodiro-banner" ref="banner" :class="{ mini: appearMini }">
      <div class="banner">
        <transition
          v-for="hamletName in $store.state.hamletList"
          :key="`bg-${hamletName}`"
          name="bg-fade"
        >
          <div
            v-if="hamletName === $route.meta.hamletName"
            class="background"
            :class="`background--${hamletName}`"
          />
        </transition>
        <transition name="global-soft-fade">
          <HomeBgTile v-if="$route.meta.hamletName === 'home' && !isNavMode" />
        </transition>
        <div class="logo-wrapper">
          <transition
            v-for="hamletName in $store.state.hamletList"
            :key="`banner-${hamletName}`"
            name="icon-change"
          >
            <div
              v-if="hamletName === $route.meta.hamletName"
              class="logo hamlet-icon"
              :class="`hamlet--${hamletName}`"
            >
              <span class="icon" />
            </div>
          </transition>
        </div>

        <nav class="eodiro-navigation">
          <transition name="icon-change">
            <div class="nav-icon-wrapper">
              <transition
                v-for="hamletName in $store.state.hamletList"
                :key="`nav-${hamletName}`"
                name="fade"
              >
                <div
                  v-if="hamletName === $route.meta.hamletName"
                  class="nav-icon hamlet-icon"
                  :class="[`hamlet--${hamletName}`]"
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
      sentinel: null
    }
  },
  watch: {
    isMini(bool) {
      if (bool) {
        CEM.dispatchEvent('bannerminified')
      } else {
        CEM.dispatchEvent('bannerspreaded')
      }
    }
  },
  created() {
    if (this.$route.meta.depth > 1) {
      this.appearMini = true
    }
  },
  mounted() {
    // Sentinel for banner
    this.sentinel = document.querySelector('#banner-observer-sentinel')
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target.isSameNode(this.sentinel)) {
          if (this.$route.meta.depth > 1) {
            this.isMini = true
            this.isNavMode = true
            this.$refs.banner.classList.add('mini')
            this.$refs.banner.classList.add('nav-mode')
          } else if (entry.isIntersecting) {
            this.isNavMode = false
            this.$refs.banner.classList.remove('nav-mode')
          } else {
            this.isNavMode = true
            this.$refs.banner.classList.add('nav-mode')
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
      const scrollTop = e.detail.scrollPosition // Always positive
      const pageDepth = e.detail.pageDepth
      const bannerTop = Math.abs(this.$refs.banner.getBoundingClientRect().top) // Convert to positive
      const distance = bannerTop - scrollTop
      let newBannerTop = bannerTop - distance
      const bannerHeight = this.$refs.banner.getBoundingClientRect().height
      const navHeight = this.$refs.banner
        .querySelector('.eodiro-navigation')
        .getBoundingClientRect().height
      if (pageDepth > 1) {
        newBannerTop = bannerHeight - navHeight
        this.$refs.banner.classList.add('mini')
      } else {
        this.$refs.banner.classList.remove('mini')
      }
      if (newBannerTop > bannerHeight - navHeight) {
        newBannerTop = bannerHeight - navHeight
      }
      this.$refs.banner.classList.add('transitioning')
      this.$refs.banner.style.transform = `translateY(${-newBannerTop}px)`
      setTimeout(() => {
        this.$refs.banner.style.cssText = ''
        this.$refs.banner.classList.remove('transitioning')
        disableScroll.off()
        CEM.dispatchEvent('bannertransitionended')
      }, 300)
    })

    // Before page leaves, unobserve sentinel
    // to prevent unexpected error
    CEM.addEventListener('beforepageleave', this.$el, () => {
      this.observer.unobserve(this.sentinel)
      const top = this.$refs.banner.getBoundingClientRect().top
      this.$refs.banner.style.cssText = `transform: translateY(${top}px); position: fixed; top: 0;`
      disableScroll.on()
    })
  }
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

        &.background--sign-in,
        &.background--sign-up {
          background-image: linear-gradient(to bottom, #987eff, #5f14be);
        }
        &.background--me {
          background-image: linear-gradient(to bottom, #987eff, #5f14be);
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
      }

      &.hamlet--home {
        .icon {
          @include bgImg(
            '~assets/images/eodiro_logo_arrow_white.svg',
            center,
            '50%'
          );

          @include dark-mode {
            @include bgImg(
              '~assets/images/eodiro_logo_arrow_black.svg',
              center,
              '50%'
            );
          }
        }
      }

      &.hamlet--sign-in,
      &.hamlet--sign-up {
        .icon {
          @include bgImg('~assets/images/key-white.svg', center, '75%');

          @include dark-mode {
            @include bgImg('~assets/images/key.svg', center, '75%');
          }
        }
      }

      &.hamlet--me {
        .icon {
          @include bgImg('~assets/images/man-white.svg', center, '75%');

          @include dark-mode {
            @include bgImg('~assets/images/man.svg', center, '75%');
          }
        }
      }

      &.hamlet--vacant {
        .icon {
          @include bgImg('~assets/images/door_white.svg', center, '75%');

          @include dark-mode {
            @include bgImg('~assets/images/door_black.svg', center, '75%');
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

          @include bgImg('~assets/images/gear_white.svg', center, '75%');

          @include dark-mode {
            @include bgImg('~assets/images/gear_black.svg', center, '75%');
          }
        }
      }

      &.hamlet--inquiry {
        .icon {
          @include bgImg('~assets/images/inquiry_white.svg', center, '75%');

          @include dark-mode {
            @include bgImg('~assets/images/inquiry_black.svg', center, '75%');
          }
        }
      }

      &.hamlet--donation {
        .icon {
          @include bgImg('~assets/images/heart_white.svg', center, '75%');

          @include dark-mode {
            @include bgImg('~assets/images/heart_black.svg', center, '75%');
          }
        }
      }
      &.hamlet--opensource {
        .icon {
          @include bgImg('~assets/images/heart_white.svg', center, '75%');

          @include dark-mode {
            @include bgImg('~assets/images/heart_black.svg', center, '75%');
          }
        }
      }

      &.hamlet--clubs {
        .icon {
          @include bgImg('~assets/images/three-white.svg', center, '75%');

          @include dark-mode {
            @include bgImg('~assets/images/three-black.svg', center, '75%');
          }
        }
      }

      &.hamlet--lectures {
        .icon {
          @include bgImg('~assets/images/magnifier-white.svg', center, '75%');

          @include dark-mode {
            @include bgImg('~assets/images/magnifier-black.svg', center, '75%');
          }
        }
      }

      &.hamlet--pepero-square {
        .icon {
          @include bgImg('~assets/images/community-white.svg', center, '75%');

          @include dark-mode {
            @include bgImg('~assets/images/community.svg', center, '75%');
          }
        }
      }

      &.hamlet--cafeteria {
        .icon {
          @include bgImg('~assets/images/fork_knife_white.svg', center, '75%');

          @include dark-mode {
            @include bgImg(
              '~assets/images/fork_knife_black.svg',
              center,
              '75%'
            );
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
