<i18n>
{
  "kr": {
    "title": "설정",
    "color_scheme": {
      "title": "색상 모드 설정",
      "light": "라이트",
      "dark": "다크",
      "auto": "적응형"
    },
    "lang": "언어"
  },
  "en": {
    "title": "Preferences",
    "color_scheme": {
      "title": "Set Color Scheme",
      "light": "Light",
      "dark": "Dark",
      "auto": "Adaptive"
    },
    "lang": "Language"
  }
}
</i18n>

<template>
  <div id="preferences">
    <div class="page-content">
      <!-- language -->
      <section class="pref-section">
        <h2 class="name">{{ $t('lang') }}</h2>
        <div class="options">
          <cushion class="opt">
            <button @click="switchLang('kr')">한국어</button>
          </cushion>
          <cushion class="opt">
            <button @click="switchLang('en')">English</button>
          </cushion>
        </div>
      </section>

      <!-- color scheme -->
      <section class="pref-section">
        <h2 class="name">{{ $t('color_scheme.title') }}</h2>
        <div class="options">
          <cushion class="opt">
            <button @click="switchColorScheme('light')">{{ $t('color_scheme.light') }}</button>
          </cushion>
          <cushion class="opt">
            <button @click="switchColorScheme('dark')">{{ $t('color_scheme.dark') }}</button>
          </cushion>
          <cushion class="opt" v-if="autoDarkModeSupport">
            <button @click="switchColorScheme('auto')">{{ $t('color_scheme.auto') }}</button>
          </cushion>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import EodiroPageBase from '~/components/EodiroPageBase.vue'
import Cookies from 'js-cookie'
import Cushion from '~/components/Cushion.vue'

export default {
  name: 'preferences',
  extends: EodiroPageBase,
  meta: {
    depth: 1,
    appName: 'preferences'
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

#preferences {
  text-align: center;

  @keyframes rotatingGear {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  // .page-icon {
  //   padding-top: 5rem;
  //   width: 5rem;
  //   height: 5rem;
  //   @include bgImg('~assets/images/eodiro/gear_gray.svg');
  //   margin: auto;
  //   animation: rotatingGear 5s linear 0s infinite normal forwards;
  // }

  .page-content {
    padding: 2rem 0;
    width: calc(100% - 2rem);
    max-width: 30rem;
    margin: auto;

    section.pref-section {
      margin-bottom: 5rem;

      &:last-child {
        margin-bottom: 0;
      }

      .name {
        font-weight: 700;
        font-size: 2rem;
      }

      .options {
        margin-top: 2rem;
        display: flex;

        .opt {
          flex: 1;
          margin-right: 1rem;

          &:last-child {
            margin-right: 0;
          }

          button {
            padding: 1rem;
          }
        }
      }
    }
  }
}
</style>
