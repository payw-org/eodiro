<template>
  <div id="preferences">
    <div class="page-content">
      <!-- language -->
      <section class="pref-section">
        <h2 class="name">
          {{ $t('pref.lang') }}
        </h2>
        <div class="options">
          <Button class="opt" @click="switchLang('kr')">
            한국어
          </Button>
          <Button class="opt" @click="switchLang('en')">
            English
          </Button>
        </div>
      </section>

      <!-- color scheme -->
      <section class="pref-section">
        <h2 class="name">
          {{ $t('pref.colorScheme.title') }}
        </h2>
        <div class="options">
          <Button class="opt" @click="switchColorScheme('light')">
            {{ $t('pref.colorScheme.light') }}
          </Button>
          <Button class="opt" @click="switchColorScheme('dark')">
            {{ $t('pref.colorScheme.dark') }}
          </Button>
          <Button
            v-if="autoDarkModeSupport"
            class="opt"
            @click="switchColorScheme('auto')"
          >
            {{ $t('pref.colorScheme.auto') }}
          </Button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import pageBase from '~/mixins/page-base'
import { Button } from '~/components/ui'

export default {
  name: 'preferences',
  components: { Button },
  mixins: [pageBase],
  head() {
    return {
      title: this.$t('pref.title')
    }
  },
  data() {
    return {
      autoDarkModeSupport: false
    }
  },
  mounted() {
    // check if the browser supports 'prefers-color-scheme' media query
    // if the autoDarkModeSupport is true,
    // dark mode option will appear in the color scheme settings
    if (window.matchMedia('(prefers-color-scheme: dark)').media !== 'not all') {
      this.autoDarkModeSupport = true
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
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/main.scss';

#hamlet.preferences {
  @keyframes rotatingGear {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .hamlet-icon .icon {
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
