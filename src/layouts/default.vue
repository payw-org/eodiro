<template>
  <div
    id="app"
    :class="[
      $store.state.currentAppName,
      { 'is-banner-forced-mini': isBannerForcedMini }
    ]"
  >
    <div id="banner-observer-sentinel" v-if="!isError"></div>
    <banner v-if="!isError" />
    <nuxt
      keep-alive
      :keep-alive-props="{ include: $store.state.cachedComponents }"
      :class="{ 'master-content': !isError }"
    ></nuxt>
    <go-back />
  </div>
</template>

<script>
import Banner from '~/components/Banner.vue'
import GoBack from '~/components/global/GoBack.vue'

export default {
  components: { Banner, GoBack },
  data() {
    return {
      isBannerForcedMini: false
    }
  },
  computed: {
    isError() {
      return this.$store.state.currentAppName === 'error'
    }
  },
  watch: {
    $route(to, from) {
      this.determineBannerIsForcedMini()
    }
  },
  methods: {
    determineBannerIsForcedMini() {
      // this method detects Banner's mini mode
      // and add a class 'is-banner-forced-mini'
      // to adjust padding-top of main content
      window.$nuxt.$once('triggerScroll', () => {
        if (this.$store.state.banner.isForcedMini) {
          this.isBannerForcedMini = true
        } else {
          this.isBannerForcedMini = false
        }
      })
    }
  },
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
  created() {
    if (this.$store.state.banner.isForcedMini) {
      this.isBannerForcedMini = true
    } else {
      this.isBannerForcedMini = false
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/variables/all.scss';
@import '~/assets/styles/scss/global-mixins.scss';

#app {
  .master-content {
    min-height: 100vh;
    padding-top: calc(#{$banner-height} + #{$master-content-top-gap});
    padding-bottom: $master-content-bottom-gap;
    width: calc(100% - #{2 * $posh-gap});
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
