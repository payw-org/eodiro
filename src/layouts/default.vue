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
    <Banner v-if="!isErrorPage" />
    <Nuxt
      keep-alive
      :keep-alive-props="{ include: $store.state.cachedComponents }"
      class="master-content"
    />
    <GoBack />
  </div>
</template>

<script>
import { CEM } from '~/modules/custom-event-manager'
import Banner from '~/components/global/Banner'
import GoBack from '~/components/global/GoBack'
import autoHead from '~/modules/auto-head'
import cleanPathName from '~/modules/clean-path-name'

export default {
  components: { Banner, GoBack },
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
      this.isPointerEventsPrevented = true

      // When route changes
      // cache or remove components from keep-alive

      if (from.meta.hamletName === to.meta.hamletName) {
        // Clear jump history
        this.$store.dispatch('clearJump')

        if (from.meta.depth < to.meta.depth) {
          // Route direction: forward
          // Cache components included in the destination route
          to.matched.forEach((matched) => {
            const componentName = matched.components.default.options.name
            this.$store.commit('CACHE_ROUTE', {
              componentName,
              depth: to.meta.depth,
              hamletName: to.meta.hamletName,
            })
          })
        } else if (from.meta.depth >= to.meta.depth) {
          // Route direction: backward or same level

          // When redirect to different hamlet,
          // clear cached routes from other hamlets
          // let clearDepth = to.meta.depth
          // if (from.meta.hamletName !== to.meta.hamletName) {
          //   clearDepth = 0
          // }

          // this.$store.commit('CLEAR_ROUTE', {
          //   destinationDepth: clearDepth,
          // })

          // Cache destination components if not cached
          to.matched.forEach((matched) => {
            const componentName = matched.components.default.options.name
            this.$store.commit('CACHE_ROUTE', {
              componentName,
              depth: to.meta.depth,
              hamletName: to.meta.hamletName,
            })
          })
        }
      } else {
        // Redirect to different hamlet
        // We call it 'Jump'

        // TODO: Add a jump button to the previous hamlet route
        if (from.meta.hamletName !== 'home' && to.meta.hamletName !== 'home') {
          const jumpHistory = this.$store.state.jumpHistory
          if (
            jumpHistory.length > 0 &&
            jumpHistory[jumpHistory.length - 1] === cleanPathName(to.name)
          ) {
            this.$store.dispatch('popJump')
          } else {
            this.$store.dispatch('pushJump', cleanPathName(from.name))
          }
        }

        // When go to home, clear the cache
        if (to.meta.hamletName === 'home') {
          this.$store.dispatch('clearJump')

          this.$store.commit('CLEAR_ROUTE', {
            destinationDepth: to.meta.depth,
          })
        }

        // Cache the destination route components
        to.matched.forEach((matched) => {
          const componentName = matched.components.default.options.name
          this.$store.commit('CACHE_ROUTE', {
            componentName,
            depth: to.meta.depth,
            hamletName: to.meta.hamletName,
          })
        })
      }
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
    min-height: 100vh;
    padding-bottom: $master-content-bottom-gap;
    width: calc(100% - #{2 * s(5)});
    padding-top: calc(#{$banner-height} + #{s(5)});
    max-width: $master-content-max-width;
    margin: auto;

    &.without-banner {
      padding-top: s(6);
    }
  }

  &.is-banner-forced-mini .master-content {
    padding-top: calc(#{$nav-height} + #{s(5)});
  }
}
</style>
