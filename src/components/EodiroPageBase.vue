<script>
// eodiro global base component
// always extends this component on every page

// it caches last scroll position
// and reverts it when activated
// when keep-alive

export default {
  methods: {
    resetBannerFax() {
      // restore banner fax after page loads
      window.$nuxt.$once('triggerScroll', () => {
        this.$store.commit('banner/showOriginal')
        setTimeout(() => {
          this.$store.commit('banner/hideFax')
          this.$store.commit('banner/unfixFax')
        }, 10)
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
    this.resetBannerFax()
  },
  beforeDestroy() {
    // reset scroll position
    this.$options.meta.lastScrollPosition = 0
  },
  activated() {
    this.resetBannerFax()
  },
  deactivated() {
    // store scroll position
    this.$options.meta.lastScrollPosition = window.scrollY
  }
}
</script>
