<template>
  <div id="not-found">
    <div class="wrapper">
      <div class="hamlet-icon">
        <img
          class="hamlet-icon mode--light"
          src="~/assets/images/eodiro-icon_sq.svg"
          alt="eodiro-logo"
        />
        <img
          class="hamlet-icon mode--dark"
          src="~/assets/images/eodiro-icon_sq_dark.svg"
          alt="eodiro-logo"
        />
      </div>
      <h1 class="manifesto">
        {{ $t('global.error.page.firstLine') }}
        <br />
        {{ $t('global.error.page.secondLine') }}
      </h1>
      <a :href="localePath('index')">
        <Button class="go-back">
          {{ $t('global.error.page.goHome') }}
        </Button>
      </a>
    </div>
  </div>
</template>

<script>
import { Button } from '~/components/ui'

export default {
  components: { Button },
  meta: {
    hamletName: 'error'
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

    .hamlet-icon {
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
