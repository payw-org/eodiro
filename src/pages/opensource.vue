<template>
  <div id="opensource">
    <h1>{{ $t('opensource.title') }}</h1>
    <p class="manifesto">
      {{ $t('opensource.manifesto') }}
    </p>

    <div class="github-star-button">
      <a
        class="github-button"
        href="https://github.com/paywteam/eodiro"
        data-icon="octicon-star"
        data-size="large"
        data-show-count="true"
        aria-label="Star paywteam/eodiro on GitHub"
      >
        Star
      </a>
    </div>

    <button class="github-organization-button">
      <a
        href="https://github.com/paywteam/eodiro"
        class="absolute-link"
        target="_blank"
      />
      <span class="github-logo-wrapper">
        <img
          src="@/assets/images/github/logo-inverted.svg"
          alt="github logo"
          class="github-logo"
          data-color-scheme="light"
        />
        <img
          src="@/assets/images/github/logo-original.svg"
          alt="github logo"
          class="github-logo"
          data-color-scheme="dark"
        />
      </span>
      <span>{{ $t('opensource.visit') }}</span>
    </button>
  </div>
</template>

<script>
import Vue from 'vue'
import pageBase from '~/mixins/page-base'
import autoHead from '~/modules/auto-head'

export default Vue.extend({
  name: 'opensource',
  mixins: [pageBase],
  head() {
    return {
      title: this.$t('opensource.title'),
      meta: [...autoHead(this.$t('opensource.title'))],
      script: [
        {
          async: true,
          defer: true,
          src: 'https://buttons.github.io/buttons.js'
        }
      ]
    }
  }
})
</script>

<style lang="scss">
@import '@/assets/styles/scss/main';

#opensource {
  .manifesto {
    margin-top: s(2);
  }

  .github-star-button {
    margin-top: s(4);
  }

  .github-organization-button {
    @include bg-inverted;
    @include text-color-inverted;
    padding: s(2) s(3);
    margin-top: s(3);
    border-radius: r(2);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    .github-logo-wrapper {
      margin-right: s(2);
      width: 1.2rem;
      height: 1.2rem;
      display: flex;

      .github-logo {
        width: 100%;
        height: auto;
      }
    }
  }
}
</style>
