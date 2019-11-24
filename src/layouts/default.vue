<template>
  <div
    id="app"
    :class="[
      $store.state.currentHamletName,
      { 'is-banner-forced-mini': isBannerForcedMini },
      { transitioning: isPointerEventsPrevented }
    ]"
  >
    <div id="scroll-end-point" />
    <div v-if="!hasOwnBannerDesign" id="banner-observer-sentinel" />
    <Banner v-if="!hasOwnBannerDesign" />
    <Nuxt
      keep-alive
      :keep-alive-props="{ include: $store.state.cachedComponents }"
      :class="['master-content', { 'without-banner': hasOwnBannerDesign }]"
    />
    <GoBack />
  </div>
</template>

<script>
import { CEM } from '~/modules/custom-event-manager'
import Banner from '~/components/global/Banner'
import GoBack from '~/components/global/GoBack'
import autoHead from '~/modules/auto-head'

export default {
  components: { Banner, GoBack },
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
          content: 'https://eodiro.com/assets/images/open-graph/open_graph.png'
        }
      ],
      htmlAttrs: {
        class: this.$store.state.colorSchemeClassName
      }
    }
  },
  data() {
    return {
      // If this is true
      // master content's padding-top will be narrower
      isBannerForcedMini: false,
      isPointerEventsPrevented: false
    }
  },
  computed: {
    hasOwnBannerDesign() {
      return !this.$store.state.hamletList.includes(this.$route.meta.hamletName)
    }
  },
  watch: {
    $route(to, from) {
      this.isPointerEventsPrevented = true

      // When route changes
      // cache or remove components from keep-alive
      if (from.meta.depth < to.meta.depth) {
        // Route direction: forward
        // Cache components included in the destination route
        to.matched.forEach((matched) => {
          const compName = matched.components.default.options.name
          this.$store.commit('CACHE_COMPONENT', compName)
        })
      } else if (from.meta.depth >= to.meta.depth) {
        // Route direction: backward or same level

        // Cache destination components if not cached
        to.matched.forEach((matched) => {
          const compName = matched.components.default.options.name
          this.$store.commit('CACHE_COMPONENT', compName)
        })

        // Remove components included in the current route
        from.matched.forEach((matched) => {
          if (!to.matched.includes(matched)) {
            const compName = matched.components.default.options.name
            this.$store.commit('POP_COMPONENT', compName)
          }
        })
      }
    }
  },
  created() {
    // Cache components on first load
    this.$route.matched.forEach((matched) => {
      const compName = matched.components.default.options.name
      this.$store.commit('CACHE_COMPONENT', compName)
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
      this.isBannerForcedMini = this.$route.meta.depth > 1
    }
  }
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
