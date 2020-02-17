import { CEM } from '~/modules/custom-event-manager'

/**
 * Add this mixin from every page component.
 */

/**
 * @type {Vue.ComponentOptions}
 */
const mixinOptions = {
  transition: {
    // name: 'fade',
    // mode: 'out-in',
    beforeEnter() {
      // Dispatch event
      CEM.dispatchEvent('beforepageenter')
    },
    afterEnter() {
      // Dispatch event
      CEM.dispatchEvent('afterpageenter')
    },
    beforeLeave() {
      // Dispatch event
      CEM.dispatchEvent('beforepageleave')
    },
    afterLeave() {
      // Dispatch event
      CEM.dispatchEvent('afterpageleave')
    },
  },
  data() {
    return {
      lastScrollPosition: 0,
      topbarTimeout: 0,
    }
  },
  created() {
    /**
     * Nuxt.js injects automatically generated
     * component name if a component doesn't have name.
     * So the page-base' page transition may not work on distribution.
     */
    if (!this.$options.name) {
      console.error(
        '🏷 This page component has no name. You must set unique name.'
      )
    }
  },
  activated() {
    this.hideTopbar()

    setTimeout(() => {
      const eodiroBanner = document.getElementById('eodiro-banner')
      eodiroBanner.style.transition = 'opacity 300ms ease, transform 300ms ease'
      eodiroBanner.style.transform = 'translateY(0rem)'
      eodiroBanner.style.opacity = '1'
      const masterContent = document.getElementById('master-content-wrapper')
      masterContent.style.transition =
        'opacity 300ms ease, transform 300ms ease'
      // masterContent.style.transform = 'translateY(0rem)'
      masterContent.style.opacity = '1'

      // Restore scroll position
      if (this.$store.state.isFirstLoad) {
        return
      } else {
        window.scrollTo(0, this.lastScrollPosition)
      }
      setTimeout(() => {
        // Dispatch an event
        CEM.dispatchEvent('scrollrestored', {
          scrollPosition: this.lastScrollPosition,
          pageDepth: this.$route.meta.depth,
        })
      }, 20)
    }, 200)
  },
  deactivated() {
    // Store current scroll position
    this.lastScrollPosition = window.scrollY
  },
  methods: {
    // Start topbar
    showTopbar() {
      this.topbarTimeout = window.topbar.show()
      setTimeout(() => {
        window.topbar.hide()
      }, 10000)
    },
    hideTopbar() {
      if (this.topbarTimeout) {
        clearTimeout(this.topbarTimeout)
      }
      window.topbar.hide()
    },
  },
}

export default mixinOptions
