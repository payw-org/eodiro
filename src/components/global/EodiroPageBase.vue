<script>
// eodiro global base component
// always extends this component on every page

// it caches last scroll position
// and reverts it when activated
// when keep-alive

export default {
  beforeMount () {
    if (this.$options.meta.bannerMode === 'mini') {
      this.$store.commit('banner/setMcBannerMiniFlag', true)
    } else {
      this.$store.commit('banner/setMcBannerMiniFlag', false)
    }
  },
  beforeDestroy () {
    // reset scroll position
    this.$options.meta.lastScrollPosition = 0
  },
  activated () {
    if (this.$options.meta.bannerMode === 'mini') {
      this.$store.commit('banner/setMcBannerMiniFlag', true)
    } else {
      this.$store.commit('banner/setMcBannerMiniFlag', false)
    }
  },
  deactivated () {
    // store scroll position
    this.$options.meta.lastScrollPosition = window.scrollY
  }
}
</script>
