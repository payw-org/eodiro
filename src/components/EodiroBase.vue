<script>
// eodiro global base component
// always extends this component when you create a page

// it caches last scroll position
// and reverts it when activated(keep-alive)

export default {
  data() {
    return {
      lastScrollPosition: 0,
      isFirstLoad: false
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
