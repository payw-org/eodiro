<template>
  <div id="eodiro-banner" :class="{ mini: isMini }">
    <div class="banner">
      <transition v-for="hamletName in $store.state.hamletList" :key="`bg-${hamletName}`" name="bg-fade">
        <div
          v-if="hamletName === $route.meta.hamletName"
          class="background"
          :class="`background--${hamletName}`"
        />
      </transition>
      <HomeBgTile v-if="$route.meta.hamletName === 'home' && !isMini" />
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
        <div class="dummy" />
        <transition name="icon-change">
          <div v-if="isMini" class="nav-icon-wrapper">
            <transition v-for="hamletName in $store.state.hamletList" :key="`nav-${hamletName}`" name="fade">
              <div
                v-if="hamletName === $route.meta.hamletName"
                class="nav-icon hamlet-icon hamlet--home"
                :class="[
                  `hamlet--${hamletName}`,
                ]"
              >
                <span class="icon" />
              </div>
            </transition>
          </div>
        </transition>
        <div class="dummy" />
      </nav>
    </div>
  </div>
</template>

<script>
import HomeBgTile from '~/components/home/HomeBgTile.vue'

export default {
  components: { HomeBgTile },
  data () {
    return {
      isMini: false,
      observer: null,
      sentinel: null
    }
  },
  watch: {
    isMini (bool) {
      if (bool) {
        document.dispatchEvent(new CustomEvent('bannerminified'))
      } else {
        document.dispatchEvent(new CustomEvent('bannerspreaded'))
      }
    }
  },
  created () {
    if (this.$route.meta.depth > 1) {
      this.isMini = true
    }
  },
  mounted () {
    // Sentinel for banner
    this.sentinel = document.querySelector('#banner-observer-sentinel')
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target.isSameNode(this.sentinel)) {
          if (this.$route.meta.depth > 1) {
            this.isMini = true
          } else if (entry.isIntersecting) {
            this.isMini = false
          } else {
            this.isMini = true
          }
        }
      })
    })

    // Start observing
    this.observer.observe(this.sentinel)

    // When route changes(page move),
    // after scroll position restoration
    // reobserve the sentinel
    document.addEventListener('scrollrestored', () => {
      this.observer.observe(this.sentinel)
    })

    // Before page leaves, unobserve sentinel
    // to prevent unexpected error
    document.addEventListener('beforepageleave', () => {
      this.observer.unobserve(this.sentinel)
    })
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/main.scss';

#eodiro-banner {
  position: fixed;
  z-index: 6666;
  top: 0;
  width: 100%;
  height: $banner-height;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  transform: translateY(0px);
  transition: all 400ms cubic-bezier(0.34, 0.23, 0, 1);

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
      border-radius: $border-radius;

      .background {
        border-radius: $border-radius !important;
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
      &.background--inquiry {
        background-image: linear-gradient(to bottom, #ffcf26, #ff9922);
      }
      &.background--donation {
        background-image: linear-gradient(to bottom, #e751ff, #b221f6);
      }
      &.background--clubs {
        background-image: linear-gradient(to bottom, #00e3d6, #00b5dd);
      }
      &.background--search-class {
        background-image: linear-gradient(to bottom, #56f23d, #00d749);
      }
      &.background--community {
        background-image: linear-gradient(to bottom, #ff79b9, #ff3e78);
      }
    }

    .logo-wrapper {
      position: relative;
      z-index: 1;
      $logo-size: 7rem;
      width: $logo-size;
      height: $logo-size;
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
          width: $nav-height;
          height: $nav-height;
          transform: scaleX(-1);
          @include bgImg('~assets/images/arrow_right_white.svg', center, '20%');

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

    &.hamlet--clubs {
      .icon {
        @include bgImg('~assets/images/three-white.svg', center, '75%');

        @include dark-mode {
          @include bgImg('~assets/images/three-black.svg', center, '75%');
        }
      }
    }

    &.hamlet--search-class {
      .icon {
        @include bgImg('~assets/images/magnifier-white.svg', center, '75%');

        @include dark-mode {
          @include bgImg('~assets/images/magnifier-black.svg', center, '75%');
        }
      }
    }

    &.hamlet--community {
      .icon {
        @include bgImg('~assets/images/community-white.svg', center, '75%');

        @include dark-mode {
          @include bgImg('~assets/images/community.svg', center, '75%');
        }
      }
    }
  }
}

#banner-observer-sentinel {
  position: absolute;
  top: calc(#{$banner-height} - #{$nav-height});
  top: $banner-height / 4;
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
