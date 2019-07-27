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
  <div id="app" :class="$store.state.currentAppName">
    <banner-fax />
    <banner />
    <nuxt
      keep-alive
      :keep-alive-props="{ include: $store.state.cachedComponents }"
      class="master-content"
    ></nuxt>
  </div>
</template>

<script>
import Banner from '~/components/Banner.vue'
import BannerFax from '~/components/BannerFax.vue'

export default {
  components: { Banner, BannerFax },
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
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/global-variables.scss';

#app {
  .master-content {
    padding-bottom: 4rem;
  }
}
</style>
