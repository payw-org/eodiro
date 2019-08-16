<template>
  <div
    id="app"
    :class="[
      $store.state.currentAppName,
      { 'is-banner-forced-mini': $store.state.banner.mcBannerMiniFlag }
    ]"
  >
    <div v-if="!isValidPage" id="banner-observer-sentinel" />
    <banner v-if="!isValidPage" />
    <nuxt
      keep-alive
      :keep-alive-props="{ include: $store.state.cachedComponents }"
      :class="{ 'master-content': !isValidPage }"
    />
    <go-back />
  </div>
</template>

<script>
import Banner from '~/components/global/Banner.vue'
import GoBack from '~/components/global/GoBack.vue'

export default {
  components: { Banner, GoBack },
  computed: {
    isValidPage () {
      return !this.$store.state.appList.includes(
        this.$store.state.currentAppName
      )
    }
  },
  created () {
    if (this.$store.state.banner.isForcedMini) {
      this.$store.commit('banner/setMcBannerMiniFlag', true)
    } else {
      this.$store.commit('banner/setMcBannerMiniFlag', false)
    }
  },
  head () {
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
