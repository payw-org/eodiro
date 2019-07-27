<template>
  <div
    id="eodiro-banner"
    :class="{
      'passed-middle': isPassedMiddle,

      'shifting': $store.state.banner.shiftAmount // only transition when shiftAmount available
    }"
    :style="[
      $store.state.banner.fixed ? { top: `${$store.state.banner.top}px` } : {},
      { transform: `translateY(${-$store.state.banner.shiftAmount}px)` }
    ]"
  >
    <div class="banner">
      <div class="logo-wrapper">
        <div class="logo app-icon app--home">
          <span class="icon"></span>
        </div>
        <div class="logo app-icon app--vacant">
          <span class="icon"></span>
        </div>
        <div class="logo app-icon app--preferences">
          <span class="icon"></span>
        </div>
      </div>
      <HomeBgTile />
    </div>
    <nav id="eodiro-navigation">
      <div class="prev-wrapper" v-if="$store.state.prevPath">
        <nuxt-link :to="$store.state.prevPath">
          <button class="prev"></button>
        </nuxt-link>
      </div>
      <div class="dummy" v-if="!$store.state.prevPath"></div>
      <nuxt-link :to="localePath('index')">
        <div class="nav-icon-wrapper">
          <div class="nav-icon app-icon app--home">
            <span class="icon"></span>
          </div>
          <div class="nav-icon app-icon app--vacant">
            <span class="icon"></span>
          </div>
          <div class="nav-icon app-icon app--preferences">
            <span class="icon"></span>
          </div>
        </div>
      </nuxt-link>
      <div class="dummy"></div>
    </nav>
    <div class="sentinel--middle"></div>
    <div class="sentinel--bottom"></div>
  </div>
</template>

<script>
import HomeBgTile from '~/components/home/HomeBgTile.vue'

export default {
  components: { HomeBgTile },
  data() {
    return {
      isPassedMiddle: false,
      hidden: false
    }
  },
  methods: {
    // goBack() {
    //   // previous pathname
    //   // from custom historyStack in store
    //   // -> this is history based
    //   let storePrevPathName = this.$store.getters.getPreviousPathName

    //   // get previous pathname
    //   // using custom routeMap in store
    //   // -> this is real go back path
    //   let nuxtPrevPathName = this.localePath(
    //     this.$store.getters.getPreviousRoute(this.routeName, this.$route.name)
    //   )

    //   if (storePrevPathName === nuxtPrevPathName) {
    //     // if history is same as real back path
    //     history.back()
    //   } else {
    //     // if history is different from real back path,
    //     // force push that
    //     this.$router.push({ path: nuxtPrevPathName })
    //   }

    //   return ''
    // },
    init() {
      // initialize the banner
      this.setSize()
      this.setTop()
    },
    setSize() {
      // store banner's size information
      this.$store.commit('banner/init', {
        height: this.$el.getBoundingClientRect().height,
        navHeight: this.$el
          .querySelector('#eodiro-navigation')
          .getBoundingClientRect().height
      })
    },
    setTop() {
      // store banner's top
      this.$store.commit('banner/setTop', this.$el.getBoundingClientRect().top)
    }
  },
  mounted() {
    // init
    this.init()

    // store size information when viewport changes
    window.addEventListener('resize', e => {
      this.setSize()
    })

    // store top when scroll
    window.addEventListener('scroll', e => {
      this.setTop()
    })

    // middle sentinel for navigation app icon transition effect
    let sentinelMiddle = this.$el.querySelector('.sentinel--middle')
    let observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.target.isSameNode(sentinelMiddle)) {
          if (entry.isIntersecting) {
            this.isPassedMiddle = false
          } else {
            this.isPassedMiddle = true
          }
        }
      })
    })
    observer.observe(sentinelMiddle) // observe middle sentinel
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/global-variables.scss';
@import '~/assets/styles/scss/global-mixins.scss';

@keyframes rotatingGear {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

#eodiro-banner {
  position: sticky;
  z-index: 9999;
  top: calc(-#{$banner-height} + #{$nav-height});
  width: 100%;
  height: $banner-height;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  &.passed-middle {
    .banner .logo-wrapper {
      opacity: 0;
      transform: translateY(-30%);
    }

    #eodiro-navigation .nav-icon-wrapper {
      opacity: 1;
      transform: translateY(0%);
      pointer-events: all;
    }
  }

  &.fixed {
    position: fixed;
  }

  &.shifting {
    transition: transform 200ms cubic-bezier(0.6, 0.15, 0.09, 1);
    transition: transform 200ms ease;
  }

  .banner {
    background-image: linear-gradient(to bottom, $c-step--3, $c-step--4);
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    @at-root #app.preferences & {
      background-image: linear-gradient(to bottom, #939393, #636363);
    }

    .logo-wrapper {
      position: relative;
      width: 7rem;
      height: 7rem;
      opacity: 1;
      transition: opacity 300ms ease, transform 300ms ease;
    }
  }

  #eodiro-navigation {
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

      button.prev {
        width: 4rem;
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

    .nav-icon-wrapper {
      position: relative;
      width: $nav-height;
      height: $nav-height;
      opacity: 0;
      transform: translateY(30%);
      transition: opacity 300ms ease, transform 300ms ease;
      pointer-events: none;
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
    opacity: 0;
    transform: translateY(10%);
    transition: opacity 150ms ease, transform 300ms ease;

    .icon {
      display: block;
      width: 100%;
      height: 100%;
    }

    @at-root #app.preferences & .icon {
      animation: rotatingGear 5s linear 0s infinite normal forwards;
    }

    &.app--home {
      @at-root #app.home & {
        opacity: 1;
        transform: translateY(0%);
      }

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
      @at-root #app.vacant & {
        opacity: 1;
        transform: translateY(0%);
      }

      .icon {
        @include bgImg('~assets/images/eodiro/door_white.svg', center, '75%');

        @include dark-mode {
          @include bgImg('~assets/images/eodiro/door_black.svg', center, '75%');
        }
      }
    }

    &.app--preferences {
      @at-root #app.preferences & {
        opacity: 1;
        transform: translateY(0%);
      }

      .icon {
        @include bgImg('~assets/images/eodiro/gear_white.svg', center, '75%');

        @include dark-mode {
          @include bgImg('~assets/images/eodiro/gear_black.svg', center, '75%');
        }
      }
    }
  }

  .sentinel--middle {
    position: absolute;
    left: 0;
    right: 0;
    bottom: calc(50% + #{$nav-height / 2});
    height: 1px;
    pointer-events: none;
    background: none;
    visibility: hidden;
  }

  .sentinel--bottom {
    position: absolute;
    left: 0;
    right: 0;
    bottom: calc(#{$nav-height} + 1px);
    height: 1px;
    pointer-events: none;
    background: none;
    visibility: hidden;
  }
}
</style>
