<template>
  <div id="not-found">
    <div class="wrapper">
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
    hamletName: 'error',
  },
  methods: {
    goBack() {
      // this.$router.push('/')
      history.back()
    },
  },
  head() {
    return {
      htmlAttrs: {
        class: this.$store.state.colorSchemeClassName,
      },
    }
  },
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/main';

#not-found {
  @include center;

  .wrapper {
    width: calc(100% - 3rem);
    max-width: 40rem;

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
