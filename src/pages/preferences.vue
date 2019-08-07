<template>
  <div id="preferences">
    <div class="page-content">
      <!-- language -->
      <section class="pref-section">
        <h2 class="name">{{ $t('pref.lang') }}</h2>
        <div class="options">
          <stud class="opt" @click="switchLang('kr')">한국어</stud>
          <stud class="opt" @click="switchLang('en')">English</stud>
        </div>
      </section>

      <!-- color scheme -->
      <section class="pref-section">
        <h2 class="name">{{ $t('pref.colorScheme.title') }}</h2>
        <div class="options">
          <stud class="opt" @click="switchColorScheme('light')">{{ $t('pref.colorScheme.light') }}</stud>
          <stud class="opt" @click="switchColorScheme('dark')">{{ $t('pref.colorScheme.dark') }}</stud>
          <stud
            class="opt"
            v-if="autoDarkModeSupport"
            @click="switchColorScheme('auto')"
          >{{ $t('pref.colorScheme.auto') }}</stud>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { Stud, Feed, MultiFeed } from '~/components/ui'
import EodiroPageBase from '~/components/global/EodiroPageBase.vue'
import Cookies from 'js-cookie'
import EodiroDialog from '~/plugins/eodiro-dialog'

export default {
  name: 'preferences',
  extends: EodiroPageBase,
  meta: {
    depth: 1,
    appName: 'preferences'
  },
  components: { Stud, Feed, MultiFeed },
  head() {
    return {
      title: this.$t('pref.title')
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
@import '~/assets/styles/scss/mixins/all.scss';
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
    max-width: 30rem;
    margin: auto;

    section.pref-section {
      margin-bottom: 2rem;
      padding-bottom: 2rem;
      border-bottom: 1px solid;
      @include separator;

      &:last-child {
        margin-bottom: 0;
        padding-bottom: 0;
        border-bottom: none;
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
          margin-right: $posh-gap;

          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
}
</style>
