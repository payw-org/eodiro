<script>
// eodiro global base component
// always extends this component on every page

// it caches last scroll position
// and reverts it when activated
// when keep-alive

export default {
  data() {
    return {
      lastScrollPosition: 0,
      isFirstLoad: false
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
    this.isFirstLoad = true
  },
  activated() {
    if (this.isFirstLoad) {
      return
    }

    setTimeout(() => {
      window.scrollTo(0, this.lastScrollPosition)
    }, 0)
  },
  deactivated() {
    this.lastScrollPosition = window.scrollY
    this.isFirstLoad = false
  }
}
</script>
