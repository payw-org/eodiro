<template>
  <a class="eodiro-link" @click="goTo">
    <slot />
  </a>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: true,
    },
    replace: {
      type: Boolean,
      required: false,
      default: false,
    },
    hook: {
      type: Function,
      required: false,
      default: () => {},
    },
  },
  methods: {
    goTo(e) {
      e.preventDefault()

      // Run hook
      this.hook()

      const eodiroBanner = document.getElementById('eodiro-banner')
      eodiroBanner.style.transition = 'opacity 200ms ease, transform 200ms ease'
      eodiroBanner.style.transitionDelay = '100ms'
      // eslint-disable-next-line no-unused-expressions
      eodiroBanner.getBoundingClientRect().width
      eodiroBanner.style.transform = 'translateY(-0.5rem)'
      eodiroBanner.style.opacity = '0'

      const masterContent = document.getElementById('master-content-wrapper')
      masterContent.style.transition =
        'opacity 200ms ease, transform 200ms ease'
      // eslint-disable-next-line no-unused-expressions
      masterContent.getBoundingClientRect().width
      // masterContent.style.transform = 'translateY(0.5rem)'
      masterContent.style.opacity = '0'

      setTimeout(() => {
        if (this.replace) {
          this.$router.replace(this.to)
        } else {
          this.$router.push(this.to)
        }
      }, 300)
    },
  },
}
</script>

<style lang="scss">
.eodiro-link {
}
</style>
