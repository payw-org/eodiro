/**
 * Add this mixin from every page component.
 */

export default {
  transition: {
    name: 'fade',
    mode: 'out-in',
    beforeEnter (el) {
      // Dispatch event
      document.dispatchEvent(new CustomEvent('beforepageenter'))
    },
    afterEnter (el) {
      // Dispatch event
      document.dispatchEvent(new CustomEvent('afterpageenter'))
    },
    beforeLeave (el) {
      // Dispatch event
      document.dispatchEvent(new CustomEvent('beforepageleave'))
    },
    afterLeave (el) {
      // Dispatch event
      document.dispatchEvent(new CustomEvent('afterpageleave'))
    }
  },
  data () {
    return {
      lastScrollPosition: 0
    }
  },
  activated () {
    console.log('activated', this.$options.name)
    setTimeout(() => {
      // Restore scroll position
      window.scrollTo(0, this.lastScrollPosition)

      // Dispatch an event
      document.dispatchEvent(new CustomEvent('scrollrestored'))
    }, 0)
  },
  deactivated () {
    // Store current scroll position
    this.lastScrollPosition = window.scrollY
  },
  mounted () {
    console.log('mounted', this.$options.name)
  }
}
