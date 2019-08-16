/**
 * Add this mixin from every page component.
 */

export default {
  transition: 'fade',
  data () {
    return {
      lastScrollPosition: 0
    }
  },
  beforeMount () {
    // Check banner mode
    if (this.$options.meta && this.$options.meta.bannerMode === 'mini') {
      this.$store.commit('banner/setMcBannerMiniFlag', true)
    } else {
      this.$store.commit('banner/setMcBannerMiniFlag', false)
    }
  },
  mounted () {
    // Validate meta data
    if (!this.$options.meta) {
      this.$options.meta = {}
    }

    if (this.$options.meta.depth === undefined) {
      console.error("You didn't set depth for this page.")
    }

    if (!this.pop && !this.popParent) {
      window.scrollTo(0, 0)
    }
  },
  activated () {
    // Check banner mode
    if (this.$options.meta && this.$options.meta.bannerMode === 'mini') {
      this.$store.commit('banner/setMcBannerMiniFlag', true)
    } else {
      this.$store.commit('banner/setMcBannerMiniFlag', false)
    }

    window.scrollTo(0, this.lastScrollPosition)
  },
  deactivated () {
    // store scroll position
    if (!this.$options.meta) {
      this.$options.meta = {}
    }
    this.lastScrollPosition = window.scrollY
  }
}
