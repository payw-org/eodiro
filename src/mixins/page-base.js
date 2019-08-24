import { CEM } from '~/plugins/custom-event-manager'

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
    appear: true,
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
  activated() {
    setTimeout(() => {
      // Restore scroll position
      // window.scrollTo(0, this.lastScrollPosition)
      setTimeout(() => {
        // Dispatch an event
        CEM.dispatchEvent('scrollrestored')
      }, 20)
    }, 0)
  },
  deactivated() {
    // Store current scroll position
    this.lastScrollPosition = window.scrollY
  }
}

export default mixinOptions
