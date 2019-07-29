<script>
// eodiro global base component
// always extends this component on every page

// it caches last scroll position
// and reverts it when activated
// when keep-alive

export default {
  methods: {
    setBannerAppearance() {
      // window.$nuxt.$once('triggerScroll', () => {
      //   console.group('EodiroPageBase')
      //   if (
      //     this.$options.meta.bannerMode &&
      //     this.$options.meta.bannerMode === 'mini'
      //   ) {
      //     console.log('isForcedMini: ', true)
      //     this.$store.commit('banner/setMini')
      //   } else {
      //     console.log('isForcedMini: ', false)
      //     this.$store.commit('banner/releaseMini')
      //   }
      //   console.groupEnd()
      // })
    }
  },
  beforeDestroy() {
    // reset scroll position
    this.$options.meta.lastScrollPosition = 0
  },
  mounted() {
    this.setBannerAppearance()
  },
  activated() {
    this.setBannerAppearance()
  },
  deactivated() {
    // store scroll position
    this.$options.meta.lastScrollPosition = window.scrollY
  }
}
</script>
