<i18n>
{
  "kr": {
    "title": "설정",
    "color_scheme": {
      "title": "색상 모드 설정",
      "light": "라이트 모드",
      "dark": "다크 모드",
      "auto": "적응형 모드"
    },
    "lang": "언어"
  },
  "en": {
    "title": "Preferences",
    "color_scheme": {
      "title": "Set Color Scheme",
      "light": "Light Mode",
      "dark": "Dark Mode",
      "auto": "Adaptive Mode"
    },
    "lang": "Language"
  }
}
</i18n>

<template>
  <div id="preferences">
    <div class="page-icon"></div>

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
</template>

<script>
import Cookies from 'js-cookie'
import Cushion from '~/components/Cushion.vue'

export default {
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
  components: { Cushion },
  methods: {
    switchLang(lang) {
      Cookies.set('i18n_redirected', lang, { expires: 99999 })
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
  width: calc(100% - 2rem);
  max-width: 30rem;
  margin: auto;
  padding: 5rem 0;

  @keyframes rotatingGear {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .page-icon {
    padding-top: 5rem;
    width: 5rem;
    height: 5rem;
    @include bgImg('~assets/images/eodiro/gear_gray.svg');
    margin: auto;
    animation: rotatingGear 5s linear 0s infinite normal forwards;
  }

  section.pref-section {
    margin-top: 5rem;

    .name {
      font-weight: 700;
      font-size: 2rem;
    }

    .options {
      margin-top: 1.5rem;
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
</style>
