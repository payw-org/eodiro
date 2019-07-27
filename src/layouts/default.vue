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
    <banner />
  </div>
</template>

<script>
import Banner from '~/components/Banner.vue'

export default {
  components: { Banner },
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
