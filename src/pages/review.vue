<i18n>
{
  "kr": {
    "title": "리뷰"
  },
  "en": {
    "title": "Review"
  }
}
</i18n>
<template>
  <div id="review">
    <div class="page-content">
      <div class="write">a</div>
      <div class="send">a</div>
    </div>
  </div>
</template>

<script>
import EodiroPageBase from '~/components/EodiroPageBase.vue'
import Cookies from 'js-cookie'
import Cushion from '~/components/Cushion.vue'

export default {
  name: 'review',
  extends: EodiroPageBase,
  meta: {
    depth: 1,
    appName: 'review'
  },
  components: { Cushion },
  head() {
    return {
      title: this.$t('title')
    }
  },
  data() {
    return {
      autoDarkModeSupport: false
    }
  },
  methods: {
    switchLang(lang) {
      Cookies.set('i18n_lang', lang, { expires: 99999 })
      location.reload()
    },
    switchColorScheme(mode) {
      this.$store.commit('setColorScheme', mode)
    }
  },
  mounted() {
    // check if the browser supports 'prefers-color-scheme' media query
    // if the autoDarkModeSupport is true,
    // dark mode option will appear in the color scheme settings
    if (window.matchMedia('(prefers-color-scheme: dark)').media != 'not all') {
      this.autoDarkModeSupport = true
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/global-mixins.scss';

#review {
  text-align: center;

  @keyframes rotatingGear {
  }

  .page-content {
    padding: 2rem 0;
    width: calc(100% - 2rem);
    max-width: 30rem;
    margin: auto;

    display: flex;

    .write {
      flex: 5;
      border: 1rem;
    }
    .send {
      flex: 1;
      border: 1rem;
    }
  }
}
</style>
