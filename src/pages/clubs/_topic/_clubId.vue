<template>
  <div id="clubs-profile">
    <div class="cp-info">
      {{ $route.params.clubId }}
      <button>
        <NuxtLink :to="localePath($store.state.prevPath)" class="absolute-link" />
        Close
      </button>
    </div>
  </div>
</template>

<script>
import pageBase from '~/mixins/page-base'

export default {
  name: 'clubs-profile',
  mixins: [pageBase],
  data () {
    return {
      pop: true
    }
  },
  meta: {
    depth: 3,
    bannerMode: 'mini'
  }
}
</script>

<style lang="scss">
#clubs-profile {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(#000, 0.5);
  z-index: 10001;

  .cp-info {
    width: calc(100% - 2rem);
    max-width: 50rem;
    background-color: #fff;
    border-radius: 0.7rem;
    padding: 1rem;
  }
}
</style>
