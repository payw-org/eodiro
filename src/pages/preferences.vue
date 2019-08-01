<i18n>
{
  "kr": {
    "title": "설정",
    "color_scheme": {
      "title": "색상 모드",
      "light": "라이트",
      "dark": "다크",
      "auto": "적응형"
    },
    "lang": "언어"
  },
  "en": {
    "title": "Preferences",
    "color_scheme": {
      "title": "Color Scheme",
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
          <eodiro-button class="opt" @click="switchLang('kr')">한국어</eodiro-button>
          <eodiro-button class="opt" @click="switchLang('en')">English</eodiro-button>
        </div>
      </section>

      <!-- color scheme -->
      <section class="pref-section">
        <h2 class="name">{{ $t('color_scheme.title') }}</h2>
        <div class="options">
          <eodiro-button
            class="opt"
            @click="switchColorScheme('light')"
          >{{ $t('color_scheme.light') }}</eodiro-button>
          <eodiro-button
            class="opt"
            @click="switchColorScheme('dark')"
          >{{ $t('color_scheme.dark') }}</eodiro-button>
          <eodiro-button
            class="opt"
            v-if="autoDarkModeSupport"
            @click="switchColorScheme('auto')"
          >{{ $t('color_scheme.auto') }}</eodiro-button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { EodiroButton, EodiroInput, EodiroTextarea } from '~/components/ui'
import EodiroPageBase from '~/components/EodiroPageBase.vue'
import Cookies from 'js-cookie'

export default {
  name: 'preferences',
  extends: EodiroPageBase,
  meta: {
    depth: 1,
    appName: 'preferences'
  },
  components: { EodiroButton, EodiroInput, EodiroTextarea },
  head() {
    return {
      title: this.$t('title')
    }
  },
  data() {
    return {
      autoDarkModeSupport: false,
      inputText: 'hello world',
      areaText: 'hello textarea'
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
@import '~/assets/styles/scss/eodiro-ui.scss';

#app.preferences {
  @keyframes rotatingGear {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .app-icon .icon {
    animation: rotatingGear 5s linear 0s infinite normal forwards;
  }
}

#preferences {
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
        text-align: center;
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
