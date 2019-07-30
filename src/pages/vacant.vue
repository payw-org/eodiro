<template>
  <div id="eodiro-vacant">
    <div class="ea-content">
      <nuxt-child keep-alive :keep-alive-props="{ include: $store.state.cachedComponents }"></nuxt-child>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vacant-parent',
  meta: {
    appName: 'vacant'
  },
  methods: {
    // ignore scroll-based nav update and hide
    toggleScrollEvent(allow) {
      window.removeEventListener('scroll', this.updateNavView)

      if (allow) {
        window.addEventListener('scroll', this.updateNavView)
      }

      this.lastScrollTop = window.scrollY
    },
    // update nav hidden state using scroll position
    updateNavView() {
      let st = window.scrollY
      if (st > this.threshold + 100 && st > 0) {
        if (!this.isNavHidden) {
          this.isNavHidden = true
        }
      }
      if (st < this.lastScrollTop) {
        this.threshold = st
        if (this.isNavHidden) {
          this.isNavHidden = false
        }
      }
      this.lastScrollTop = st
    }
  },
  mounted() {
    setTimeout(() => {
      this.isNavHidden = false
    }, 200)

    // set initial scroll threshold on mounted
    // and add a scroll event listener
    this.threshold = window.scrollY
    window.addEventListener('scroll', this.updateNavView)
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/global-variables.scss';
@import '~/assets/styles/scss/global-mixins.scss';

#eodiro-vacant {
  .ea-content {
    .content-item {
      padding-top: 2rem;
      display: block;

      &.fade-enter-active,
      &.fade-leave-active {
        transition: opacity 300ms ease;
      }
      &.fade-enter,
      &.fade-leave-to {
        opacity: 0;
      }
    }
  }
}
</style>
