<i18n>
{
  "kr": {
    "title": "어디로",
    "description": "중앙대학교 길잡이"
  },
  "en": {
    "title": "eodiro",
    "description": "CAU Guidance"
  }
}
</i18n>

<template>
  <div
    id="app"
    :class="[
      $store.state.currentAppName,
      { 'is-banner-forced-mini': isBannerForcedMini }
    ]"
  >
    <div id="banner-observer-sentinel"></div>
    <banner v-if="$store.state.appName !== 'error'" />
    <nuxt
      keep-alive
      :keep-alive-props="{ include: $store.state.cachedComponents }"
      class="master-content"
    ></nuxt>
  </div>
</template>

<script>
import Banner from '~/components/Banner.vue'

export default {
  components: { Banner },
  data() {
    return {
      isBannerForcedMini: false
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
      title: this.$t('title'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('description')
        },
        {
          property: 'og:title',
          content: this.$t('title')
        },
        {
          property: 'og:description',
          content: this.$t('description')
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
@import '~/assets/styles/scss/global-variables.scss';
@import '~/assets/styles/scss/global-mixins.scss';

#app {
  $master-content-top-gap: 2rem;
  $master-content-bottom-gap: 5rem;

  .master-content {
    padding-top: calc(#{$banner-height} + #{$master-content-top-gap});
    padding-bottom: 5rem;
    width: calc(100% - 2rem);
    max-width: 80rem;
    margin: auto;
  }

  &.is-banner-forced-mini {
    .master-content {
      padding-top: calc(#{$nav-height} + #{$master-content-top-gap});
    }
  }
}
</style>
