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
    beforeEnter(el) {
      // Dispatch event
      CEM.dispatchEvent('beforepageenter')
    },
    // enter(el, done) {
    //   CEM.dispatchEvent('pageenter')
    //   setTimeout(() => {
    //     done()
    //   }, 400)
    // },
    afterEnter(el) {
      // Dispatch event
      CEM.dispatchEvent('afterpageenter')
    },
    beforeLeave(el) {
      // Dispatch event
      CEM.dispatchEvent('beforepageleave')
    },
    // leave(el, done) {
    //   CEM.dispatchEvent('pageleave')
    //   setTimeout(() => {
    //     done()
    //   }, 200)
    // },
    afterLeave(el) {
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
      window.scrollTo(0, this.lastScrollPosition)

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
