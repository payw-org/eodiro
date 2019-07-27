<script>
// eodiro global base component
// always extends this component on every page

// it caches last scroll position
// and reverts it when activated
// when keep-alive

export default {
  methods: {
    resetBannerShift() {
      // after page loads,
      // remove banner's shift amount
      // to prevent sudden movement
      // when user scrolls after load
      window.$nuxt.$once('triggerScroll', () => {
        this.$store.commit('banner/resetShift')
      })
    }
  },
  created() {
    if (process.client) {
      // push history to custom historyStack in store
      // everytime load each page
      // only push history on client side load
      this.$store.commit('pushHistory', location.pathname)
    }
  },
  mounted() {
    this.resetBannerShift()
  },
  beforeDestroy() {
    // reset scroll position
    this.$options.meta.lastScrollPosition = 0
  },
  activated() {
    this.resetBannerShift()
  },
  deactivated() {
    // store scroll position
    this.$options.meta.lastScrollPosition = window.scrollY
  }
}
</script>
