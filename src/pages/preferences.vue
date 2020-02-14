<template>
  <div id="preferences">
    <div class="page-content">
      <!-- language -->
      <section class="pref-section">
        <h2 class="name">
          {{ $t('pref.lang') }}
        </h2>
        <div class="options">
          <Button class="opt" @click="switchLang('ko')">
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
import pageBase from '~/mixins/page-base'
import { Button } from '~/components/ui'
import autoHead from '~/modules/auto-head'
import CookieConfig from '~~/config/cookie'
import EodiroCookie, { defaultCookieOptions } from '~/modules/cookie'

export default {
  name: 'preferences',
  components: { Button },
  mixins: [pageBase],
  data() {
    return {
      autoDarkModeSupport: false,
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
    /**
     * @param {'ko' | 'en'} lang
     */
    async switchLang(lang) {
      await new EodiroCookie().set(
        CookieConfig.langCookieName,
        lang,
        defaultCookieOptions
      )
      window.location.reload()
    },
    async switchColorScheme(mode) {
      await this.$store.dispatch('setColorScheme', { mode })
    },
  },
  head() {
    return {
      title: this.$t('pref.title'),
      meta: [...autoHead(this.$t('pref.title'))],
    }
  },
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
    margin: auto;
    max-width: 30rem;

    section.pref-section {
      border-bottom: 1px solid;
      margin-bottom: 2rem;
      padding-bottom: 2rem;
      @include separator;

      &:last-child {
        border-bottom: none;
        margin-bottom: 0;
        padding-bottom: 0;
      }

      .name {
        font-size: 2rem;
        font-weight: 700;
        text-align: center;
      }

      .options {
        display: flex;
        margin-top: 2rem;

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
