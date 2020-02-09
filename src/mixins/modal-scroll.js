/**
 * @type {Vue.ComponentOptions}
 */
const mixinOptions = {
  methods: {
    // It gives 1 pixel gap to scroll top and bottom
    // to enable additional inertia scroll after reaching
    // top or bottom on iOS devices
    fixScroll(event) {
      const scrollElm = event.target
      if (scrollElm && scrollElm.scrollTop === 0) {
        scrollElm.scrollTo(0, 1)
      } else if (
        scrollElm &&
        scrollElm.scrollHeight === scrollElm.scrollTop + scrollElm.clientHeight
      ) {
        scrollElm.scrollTo(
          0,
          scrollElm.scrollHeight - scrollElm.clientHeight - 1
        )
      }
    },
  },
}

export default mixinOptions
