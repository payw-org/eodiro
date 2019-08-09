<i18n>
{
  "kr": {
    "first_line": "맙소사...",
    "second_line": "존재하지 않는 페이지에요.",
    "go_home": "홈으로 가기"
  },
  "en": {
    "first_line": "Oh my god...",
    "second_line": "This page does not exist.",
    "go_home": "Go Home"
  }
}
</i18n>

<template>
  <div id="not-found">
    <div class="wrapper">
      <div class="app-icon">
        <img
          class="app-icon mode--light"
          src="~/assets/images/eodiro/app-icon_sq.svg"
          alt="eodiro-logo"
        />
        <img
          class="app-icon mode--dark"
          src="~/assets/images/eodiro/app-icon_sq_dark.svg"
          alt="eodiro-logo"
        />
      </div>
      <h1 class="manifesto">
        {{ $t('first_line') }}
        <br />
        {{ $t('second_line') }}
      </h1>
      <nuxt-link :to="localePath('index')">
        <stud class="go-back">{{ $t('go_home') }}</stud>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { Stud } from '~/components/ui'

export default {
  components: { Stud },
  meta: {
    appName: 'error'
  },
  head() {
    return {
      htmlAttrs: {
        class: this.$store.state.colorSchemeClassName
      }
    }
  },
  methods: {
    goBack() {
      // this.$router.push('/')
      history.back()
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/main.scss';

#not-found {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  .wrapper {
    width: calc(100% - 3rem);
    max-width: 40rem;

    .app-icon {
      display: block;
      width: 5rem;
      position: relative;
    }

    .manifesto {
      margin-top: 1rem;
      font-family: $ui-font;
      font-size: 3rem;
      max-width: 90%;
    }

    .go-back {
      margin-top: 2rem;
      width: auto;
    }
  }
}
</style>
