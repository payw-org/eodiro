<template>
  <div id="eodiro-vacant">
    <AppNav :is-hidden="isNavHidden" />
    <div class="ea-content">
      <nuxt-child
        keep-alive
        :keep-alive-props="{ include: cachedComponents }"
        @toggleScrollEvent="toggleScrollEvent"
        :is-right-direction="isRightDirection"
        :cached-components="cachedComponents"
      ></nuxt-child>
    </div>
  </div>
</template>

<script>
import EodiroBase from '~/components/EodiroBase.vue'
import AppNav from '~/components/AppNav'
import RouteLocation from '~/plugins/RouteLocation'

export default {
  extends: EodiroBase,
  components: { AppNav },
  props: ['isRightDirection'],
  data() {
    return {
      navTitle: '',
      backLink: '/',
      isNavHidden: true,
      lastScrollTop: 0,
      threshold: null,
      cachedComponents: []
    }
  },
  watch: {
    $route(to, from) {
      this.isNavHidden = false

      // if go left direction, remove last cached components
      if (!RouteLocation.isRightDirection(to.name, from.name)) {
        this.cachedComponents.splice(this.cachedComponents.length - 1, 1)
      }
    }
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
      padding-top: 11.3rem;
      padding-bottom: $stagger-gap;
      display: block;

      @include smaller-than($mobile-width-threshold) {
        padding-top: 8.5rem;
      }

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
