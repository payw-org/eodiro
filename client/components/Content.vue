<script>
export default {
  props: [ 'isRightDirection', 'cachedComponents' ],
  data() {
    return {
      scrollPos: 0
    }
  },
  methods: {
    buildIn() {}
  },
  mounted() {
    window.scrollTo(0, 0)

    // cache the current component
    if (this.cachedComponents.indexOf(this.$options.name) === -1) {
      this.cachedComponents.push(this.$options.name)
    }

    // setTimeout(() => {
    //   this.buildIn()
    // }, 200)
  },
  activated() {
    this.$emit('toggleScrollEvent', false)

    if (this.isRightDirection) {
      window.scrollTo(0, 0)
    } else {
      window.scrollTo(0, this.scrollPos)
    }
    setTimeout(() => {
      this.$emit('toggleScrollEvent', true)
    }, 10)

    // this.buildIn()
  },
  deactivated() {
    this.scrollPos = window.scrollY
  }
}
</script>
