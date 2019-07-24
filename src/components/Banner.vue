<template>
  <div class="banner-wrapper" :class="{sticky: isSticky, 'passed-middle': isPassedMiddle}">
    <div class="banner">
      <div class="tiles"></div>
      <div class="logo-wrapper">
        <div class="logo"></div>
      </div>
    </div>
    <nav class="navigation">
      <div class="prev-wrapper" @click="goBack" v-if="prevPath">
        <!-- <nuxt-link :to="getPrevPathName"> -->
        <button class="prev"></button>
        <!-- </nuxt-link> -->
      </div>
      <div class="dummy" v-if="!prevPath"></div>
      <nuxt-link :to="localePath('index')">
        <div class="eodiro-home"></div>
      </nuxt-link>
      <div class="dummy"></div>
    </nav>
    <div class="sentinel--middle"></div>
    <div class="sentinel--bottom"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSticky: false,
      isPassedMiddle: false,
      prevPath: '',
      show: false
    }
  },
  methods: {
    goBack() {
      // previous pathname
      // from custom historyStack in store
      // -> this is history based
      let storePrevPathName = this.$store.getters.getPreviousPathName

      // get previous pathname
      // using custom routeMap in store
      // -> this is real go back path
      let nuxtPrevPathName = this.localePath(
        this.$store.getters.getPreviousRoute(this.routeName, this.$route.name)
      )

      if (storePrevPathName === nuxtPrevPathName) {
        // if history is same as real back path
        history.back()
      } else {
        // if history is different from real back path,
        // force push that
        this.$router.push({ path: nuxtPrevPathName })
      }

      return ''
    }
  },
  props: ['routeName'],
  created() {
    this.prevPath = this.$store.getters.getPreviousRoute(
      this.routeName,
      this.$route.name
    )
  },
  mounted() {
    let sentinelMiddle = this.$el.querySelector('.sentinel--middle')
    let sentinelBottom = this.$el.querySelector('.sentinel--bottom')

    var observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.target.isSameNode(sentinelMiddle)) {
          if (entry.isIntersecting) {
            this.isPassedMiddle = false
          } else {
            this.isPassedMiddle = true
          }
        } else if (entry.target.isSameNode(sentinelBottom)) {
          if (entry.isIntersecting) {
            this.isSticky = false
          } else {
            this.isSticky = true
          }
        }
      })
    })

    observer.observe(sentinelMiddle)
    observer.observe(sentinelBottom)
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

.banner-wrapper {
  $banner-height: 40vh;
  $nav-height: 3.5rem;
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
      transition: opacity 300ms ease;
    }

    .navigation .eodiro-home {
      opacity: 1;
      pointer-events: all;
    }
  }

  &.sticky {
  }

  .banner {
    background-image: linear-gradient(to bottom, $c-step--3, $c-step--4);
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    @at-root #preferences & {
      background-image: linear-gradient(to bottom, #939393, #636363);
    }

    .logo-wrapper {
      opacity: 1;
      transition: opacity 300ms ease;

      .logo {
        display: block;
        width: 5rem;
        height: 5rem;

        @at-root #preferences & {
          animation: rotatingGear 5s linear 0s infinite normal forwards;
        }

        @include bgImg(
          '~assets/images/eodiro/eodiro_logo_arrow_white.svg',
          center,
          '70%'
        );

        @include dark-mode {
          @include bgImg(
            '~assets/images/eodiro/eodiro_logo_arrow_black.svg',
            center,
            '70%'
          );
        }

        @at-root #preferences & {
          @include bgImg(
            '~assets/images/eodiro/gear_white.svg',
            center,
            '100%'
          );

          @include dark-mode {
            @include bgImg(
              '~assets/images/eodiro/gear_black.svg',
              center,
              '100%'
            );
          }
        }
      }
    }
  }

  .navigation {
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

    .eodiro-home {
      transition: opacity 300ms ease;
      opacity: 0;
      pointer-events: none;
      width: $nav-height;
      height: $nav-height;

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

    .dummy {
      width: 4rem;
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
