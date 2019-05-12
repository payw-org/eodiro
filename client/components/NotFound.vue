<i18n>
{
  "ko": {
    "first_line": "맙소사...",
    "second_line": "존재하지 않는 페이지에요."
  },
  "en": {
  },
  "zh": {
  },
  "fr": {
  }
}
</i18n>

<template>
  <div id="not-found">
    <div class="wrapper">
      <div class="app-icon">
        <img class="app-icon mode--light" src="/assets/images/eodiro/app-icon_sq.svg" alt="eodiro-logo" />
        <img class="app-icon mode--dark" src="/assets/images/eodiro/app-icon_sq_dark.svg" alt="eodiro-logo" />
      </div>
      <h1 class="manifesto">{{ $t('first_line') }}<br />{{ $t('second_line') }}</h1>
      <button class="eodiro-btn go-back" @click="goBack">Go back</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      history.back()
    }
  }
}
</script>

<style lang="scss">
@import 'SCSS/global-variables.scss';
@import 'SCSS/global-mixins.scss';

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

      &::before {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        width: 5rem;
        height: 5rem;
        border-radius: 50px;
        box-shadow: 0.4rem 0.4rem 2rem rgba(0,0,0,0.15);

        @include dark-mode() {
          box-shadow: 0.4rem 0.4rem 2rem rgba(0,0,0,0.4);
        }
      }
    }
    
    .manifesto {
      margin-top: 1rem;
      font-family: $font-display;
      font-size: 3rem;
      max-width: 90%;
    }

    .go-back {
      margin-top: 1rem;
    }
  }
}
</style>
