<script>
// eodiro global base component
// always extends this component on every page

// it caches last scroll position
// and reverts it when activated
// when keep-alive

export default {
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

    console.log('mounted')

    window.scrollTo(0, 0)
  },
  beforeDestroy () {
    // reset scroll position
    this.$options.meta.lastScrollPosition = 0
  },
  activated () {
    console.log('activated')
    // Check banner mode
    if (this.$options.meta && this.$options.meta.bannerMode === 'mini') {
      this.$store.commit('banner/setMcBannerMiniFlag', true)
    } else {
      this.$store.commit('banner/setMcBannerMiniFlag', false)
    }

    window.scrollTo(0, this.$options.meta.lastScrollPosition)
  },
  deactivated () {
    // store scroll position
    if (!this.$options.meta) {
      this.$options.meta = {}
    }
    this.$options.meta.lastScrollPosition = window.scrollY
  }
}
</script>
