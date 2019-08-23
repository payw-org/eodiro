<template>
  <div
    id="app"
    :class="[
      $store.state.currentHamletName,
      { 'is-banner-forced-mini': isBannerForcedMini }
    ]"
  >
    <div v-if="!isValidPage" id="banner-observer-sentinel" />
    <Banner v-if="!isValidPage" />
    <Nuxt
      keep-alive
      :keep-alive-props="{ include: $store.state.cachedComponents }"
      :class="{ 'master-content': !isValidPage }"
    />
    <GoBack />
  </div>
</template>

<script>
import Banner from '~/components/global/Banner'
import GoBack from '~/components/global/GoBack'

export default {
  components: { Banner, GoBack },
  head() {
    return {
      title: this.$t('global.head.title'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('global.head.description')
        },
        {
          property: 'og:title',
          content: this.$t('global.head.title')
        },
        {
          property: 'og:description',
          content: this.$t('global.head.description')
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
      isBannerForcedMini: false
    }
  },
  computed: {
    isValidPage() {
      return !this.$store.state.hamletList.includes(this.$route.meta.hamletName)
    }
  },
  watch: {
    $route(to, from) {
      // When route changes
      // cache or remove components from keep-alive
      if (from.meta.depth < to.meta.depth) {
        // Route direction: forward
        // Cache components included in the destination route
        to.matched.forEach((matched) => {
          const compName = matched.components.default.options.name
          this.$store.commit('CACHE_COMPONENT', compName)
        })
      } else if (from.meta.depth > to.meta.depth) {
        // Route direction: backward

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
    document.addEventListener('beforepageenter', () => {
      this.identifyBannerForcedMini()
    })
  },
  methods: {
    identifyBannerForcedMini() {
      this.isBannerForcedMini = this.$route.meta.depth > 1
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/main.scss';

#app {
  .master-content {
    min-height: 100vh;
    padding-bottom: $master-content-bottom-gap;
    width: calc(100% - #{2 * $posh-gap});
    padding-top: calc(#{$banner-height} + #{$master-content-top-gap});
    max-width: $master-content-max-width;
    margin: auto;
  }

  &.is-banner-forced-mini {
    .master-content {
      padding-top: calc(#{$nav-height} + #{$master-content-top-gap});
    }
  }
}
</style>
