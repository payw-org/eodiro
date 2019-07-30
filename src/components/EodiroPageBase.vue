<script>
// eodiro global base component
// always extends this component on every page

// it caches last scroll position
// and reverts it when activated
// when keep-alive

export default {
  beforeDestroy() {
    // reset scroll position
    this.$options.meta.lastScrollPosition = 0
  },
  deactivated() {
    // store scroll position
    this.$options.meta.lastScrollPosition = window.scrollY
  }
}
</script>
