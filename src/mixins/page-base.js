import disableScroll from 'disable-scroll'
import { CEM } from '~/modules/custom-event-manager'

/**
 * Add this mixin from every page component.
 */

/**
 * @type {Vue.ComponentOptions}
 */
const mixinOptions = {
  transition: {
    name: 'fade',
    mode: 'out-in',
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
    }
  },
  data() {
    return {
      lastScrollPosition: 0
    }
  },
  mounted() {
    // Finish topbar when the data is completely loaded
    // and the page is mounted
    window.topbar.hide()
  },
  activated() {
    setTimeout(() => {
      // Restore scroll position
      disableScroll.off()
      window.scrollTo(0, this.lastScrollPosition)
      disableScroll.on()
      setTimeout(() => {
        // Dispatch an event
        CEM.dispatchEvent('scrollrestored', {
          scrollPosition: this.lastScrollPosition,
          pageDepth: this.$route.meta.depth
        })
      }, 20)
    }, 0)
  },
  deactivated() {
    // Store current scroll position
    this.lastScrollPosition = window.scrollY
  },
  methods: {
    // Start topbar
    showTopbar() {
      window.topbar.show()
    }
  }
}

export default mixinOptions
