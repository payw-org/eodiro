<template>
  <div
    id="app"
    :class="[
      $store.state.currentHamletName,
      { 'is-banner-forced-mini': isBannerForcedMini },
      { transitioning: isPointerEventsPrevented },
    ]"
  >
    <div id="scroll-end-point" />
    <div id="banner-observer-sentinel" />
    <!-- <Banner v-if="!isErrorPage" /> -->
    <NewBanner v-if="!isErrorPage" />
    <div id="master-content-wrapper">
      <Nuxt
        keep-alive
        :keep-alive-props="{ include: $store.state.cachedComponents }"
        class="master-content"
      />
    </div>
    <GoBack />
  </div>
</template>

<script>
import { CEM } from '~/modules/custom-event-manager'
// import Banner from '~/components/global/Banner'
import NewBanner from '~/components/global/NewBanner'
import GoBack from '~/components/global/GoBack'
import autoHead from '~/modules/auto-head'
import cleanPathName from '~/modules/clean-path-name'

export default {
  components: { NewBanner, GoBack },
  data() {
    return {
      // If this is true
      // master content's padding-top will be narrower
      isBannerForcedMini: false,
      isPointerEventsPrevented: false,
    }
  },
  computed: {
    isErrorPage() {
      return !this.$route.name
    },
  },
  watch: {
    $route(to, from) {
      this.$store.commit('SET_IS_FIRST_LOAD', false)
      this.isPointerEventsPrevented = true

      // When route changes
      // cache or remove components from keep-alive

      if (from.meta.hamletName === to.meta.hamletName) {
        // Clear jump history
        this.$store.dispatch('clearJump', from.meta.hamletName)

        if (from.meta.depth < to.meta.depth) {
          // Route direction: forward
          // Cache components included in the destination route
          this.pushRoute(to)
        } else if (from.meta.depth >= to.meta.depth) {
          // Route direction: backward or same level

          this.popRoute(from)

          // Cache destination components if not cached
          this.pushRoute(to)
        }
      } else {
        // Redirect to different hamlet
        // We call it 'Jump'

        // Cache destination
        this.pushRoute(to)

        // TODO: Add a jump button to the previous hamlet route
        if (from.meta.hamletName !== 'home' && to.meta.hamletName !== 'home') {
          const jumpHistory = this.$store.state.jumpHistory
          if (
            jumpHistory.length > 0 &&
            jumpHistory[jumpHistory.length - 1] === cleanPathName(to.name)
          ) {
            // Jump back
            this.$store.dispatch('popJump', from.meta.hamletName)
            this.popRoute(from)
          } else {
            // Jump forward
            this.$store.dispatch('pushJump', cleanPathName(from.name))
          }
        }

        // When go to home, clear the cache and jump history
        if (to.meta.hamletName === 'home') {
          this.$store.dispatch('clearJump')
          this.$store.dispatch('clearComponent')
          this.pushRoute(to)
        }
      }

      // console.log(JSON.stringify(this.$store.state.cachedComponents, null, 2))
      // console.log(
      //   JSON.stringify(this.$store.state.hamletCachedComponents, null, 2)
      // )
    },
  },
  created() {
    // Cache components on the first load
    this.$route.matched.forEach((matched) => {
      const componentName = matched.components.default.options.name
      this.$store.commit('CACHE_ROUTE', {
        componentName,
        depth: this.$route.meta.depth,
        hamletName: this.$route.meta.hamletName,
      })
    })

    this.identifyBannerForcedMini()
  },
  mounted() {
    // Before page enters
    CEM.addEventListener('beforepageenter', this.$el, () => {
      this.identifyBannerForcedMini()
    })

    CEM.addEventListener('scrollrestored', this.$el, () => {
      observer.observe(document.getElementById('scroll-end-point'))
      setTimeout(() => {
        this.isPointerEventsPrevented = false
      }, 300)
    })

    CEM.addEventListener('beforepageleave', this.$el, () => {
      observer.unobserve(document.getElementById('scroll-end-point'))
    })

    CEM.addEventListener('bannertransitionended', this.$el, () => {
      this.isPointerEventsPrevented = false
    })

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Reach scroll end
          CEM.dispatchEvent('scrollended')
        }
      })
    })

    observer.observe(document.getElementById('scroll-end-point'))
  },
  methods: {
    identifyBannerForcedMini() {
      this.isBannerForcedMini = this.$route.meta.depth > 1 || this.isErrorPage
    },
    /**
     * @param {import('vue-router/types').Route} route
     */
    pushRoute(route) {
      route.matched.forEach((matched) => {
        const componentName = matched.components.default.options.name
        this.$store.dispatch('pushComponent', {
          hamletName: route.meta.hamletName,
          componentName,
          depth: route.meta.depth,
        })
      })
    },
    /**
     * @param {import('vue-router/types').Route} route
     */
    popRoute(route) {
      route.matched.forEach((matched) => {
        const componentName = matched.components.default.options.name
        this.$store.dispatch('popComponent', {
          hamletName: route.meta.hamletName,
          componentName,
          depth: route.meta.depth,
        })
      })
    },
  },
  head() {
    return {
      title: this.$t('global.head.title'),
      meta: [
        ...autoHead(
          this.$t('global.head.title'),
          this.$t('global.head.description')
        ),
        {
          property: 'og:image',
          content: 'https://eodiro.com/assets/images/open-graph/open_graph.png',
        },
      ],
      htmlAttrs: {
        class: this.$store.state.colorSchemeClassName,
        lang: this.$store.state.lang,
      },
    }
  },
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/main';

#app {
  position: relative;
  min-height: 100vh;
  // overflow-x: hidden;

  &.transitioning {
    pointer-events: none;
  }

  #scroll-end-point {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 1px;
  }

  .master-content {
    // min-height: 100vh;
    padding-top: 2rem;
    padding-bottom: $master-content-bottom-gap;
    width: calc(100% - #{2 * s(5)});
    // padding-top: calc(#{$banner-height} + #{s(5)});
    max-width: $master-content-max-width;
    margin: auto;

    &.without-banner {
      // padding-top: s(6);
    }
  }

  &.is-banner-forced-mini .master-content {
    // padding-top: calc(#{$nav-height} + #{s(5)});
  }
}
</style>
