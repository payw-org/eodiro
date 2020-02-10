<template>
  <div id="eodiro-vacant">
    <nuxt-child
      keep-alive
      :keep-alive-props="{ include: $store.state.cachedComponents }"
    />
  </div>
</template>

<script>
import pageBase from '~/mixins/page-base'

export default {
  name: 'vacant-parent',
  mixins: [pageBase],
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/main';

#eodiro-vacant {
  .empty-count-badge {
    white-space: nowrap;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    color: $c-step--4;
    background-color: $t-black;
    border-radius: r(3);
    padding: 0 0.5rem;
    min-height: 2rem;
    min-width: 2rem;
    overflow: hidden;
    @include overlay-inverted;

    &,
    & * {
      font-weight: 500;
    }

    .total {
      opacity: 0.6;
      font-size: 0.8em;
    }
  }
}
</style>
