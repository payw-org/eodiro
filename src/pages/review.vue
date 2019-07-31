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
      <div class="content-container">
        <div class="write"></div>
        <cushion class="send">
          <button @click="None">send</button>
        </cushion>
      </div>
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
  position: absolute;
  width: 100%;
  height: 100%;

  .page-content {
    width: calc(100% - 2rem);
    height: 100%;
    max-width: 30rem;
    margin: auto;


    .content-container{
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;

    .write {
      flex-grow: 1;
      border: 2px solid #f0f0f0;
      border-radius: 0.7rem;
      margin: 1rem 0;
    }

    .send {
      height: 3rem;
      width: 8rem;

      border: 1px solid #f0f0f0;
      border-radius: 0.7rem;
      margin: auto;
    }
    }


    

  }
}
</style>
