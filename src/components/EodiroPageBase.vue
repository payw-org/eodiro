<script>
// eodiro global base component
// always extends this component on every page

// it caches last scroll position
// and reverts it when activated
// when keep-alive

export default {
  data() {
    return {
      timeouts: []
    }
  },
  methods: {
    resetBannerFax() {
      while (this.timeouts.length) {
        clearTimeout(this.timeouts.shift())
      }

      window.$nuxt.$once('triggerScroll', () => {
        this.timeouts.push(
          setTimeout(() => {
            let bannerOrg = document.getElementById('eodiro-banner')
            let bannerFax = document.getElementById('eodiro-banner-facsimile')
            bannerOrg.style.opacity = '1'

            this.timeouts.push(
              setTimeout(() => {
                bannerFax.style.opacity = '0'

                this.timeouts.push(
                  setTimeout(() => {
                    bannerFax.style.transition = 'none'
                    bannerFax.style.position = ''
                    bannerFax.style.transform = 'translateY(0)'
                    bannerFax.style.top = ''
                  }, 20)
                )
              }, 20)
            )
          }, 50)
        )
      })
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
