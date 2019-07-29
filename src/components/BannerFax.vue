<template>
  <banner-common
    :kind="'fax'"
    id="eodiro-banner-facsimile"
    :class="{
      'nav-mode': $store.state.banner.navMode,
      'fixed': $store.state.banner.fixed,
      'sticky': $store.state.banner.sticky,
      'shifting': $store.state.banner.shiftAmount !== undefined,
      'hidden': $store.state.banner.isFaxHidden
    }"
    :style="[
      $store.state.banner.fixed ? { top: `${top}px` } : {},
      { transform: `translateY(${-$store.state.banner.shiftAmount}px)` }
    ]"
  />
</template>

<script>
import BannerCommon from '~/components/BannerCommon.vue'
import HomeBgTile from '~/components/home/HomeBgTile.vue'

export default {
  components: { BannerCommon, HomeBgTile },
  data() {
    return {
      top: 0
    }
  },
  computed: {
    isTransTriggered() {
      return this.$store.state.banner.isTransTriggered
    },
    isFaxHidden() {
      return this.$store.state.banner.isFaxHidden
    }
  },
  watch: {
    isTransTriggered(bool) {
      if (bool) {
        // set the trigger flas to false for the next trigger
        this.$store.commit('banner/resetTrigger')

        let faxRect = this.$el.getBoundingClientRect()

        this.top = faxRect.top

        if (this.top > 0) {
          // iOS inertia scroll
          return
        }

        this.$store.commit('banner/fixFax')
        this.$store.commit('banner/showFax')

        setTimeout(() => {
          this.$store.commit('banner/hideOriginal')

          let routeDirection = this.$store.state.routeDirection
          if (routeDirection === 'forward') {
            if (this.top <= 0) {
              this.$store.commit('banner/shift', this.top)
            }
          } else if (routeDirection === 'backward') {
            if (this.top <= 0) {
              let a = this.$store.state.lastScrollPosition
              let b = Math.abs(this.top)
              let c = this.$el
                .querySelector('.eodiro-navigation')
                .getBoundingClientRect().height
              let d = faxRect.height
              let e = Math.abs(d - b - c)

              if (a !== undefined) {
                if (a > b) {
                  // shift up

                  if (a > d - c) {
                    // shift max available
                    this.$store.commit('banner/shift', e)
                  } else {
                    // shift with distance
                    this.$store.commit('banner/shift', a - b)
                  }
                } else {
                  // shift down
                  this.$store.commit('banner/shift', a - b)
                }
              }
            }
          }
        }, 10)
      }
    }
  }
}
</script>
