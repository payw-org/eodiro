<template>
  <banner-common
    :kind="'fax'"
    id="eodiro-banner-facsimile"
    :class="{
      'nav-mode': $store.state.banner.navMode,
      //'fixed': $store.state.banner.fixed,
      'sticky': $store.state.banner.sticky,
      //'shifting': $store.state.banner.shiftAmount !== undefined,
      //'hidden': $store.state.banner.isFaxHidden
    }"
    :style="[
      //$store.state.banner.fixed ? { top: `${top}px` } : {},
      //{ transform: `translateY(${-$store.state.banner.shiftAmount}px)` }
    ]"
  />
</template>

<script>
import BannerCommon from '~/components/BannerCommon.vue'
import HomeBgTile from '~/components/home/HomeBgTile.vue'
import { TweenMax, Power2 } from 'gsap'

export default {
  components: { BannerCommon, HomeBgTile },
  data() {
    return {
      bannerOrg: undefined,
      bannerFax: undefined,
      timeouts: []
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

        while (this.timeouts.length) {
          clearTimeout(this.timeouts.shift())
        }

        let faxRect = this.bannerFax.getBoundingClientRect()

        if (faxRect.top > 0) {
          // iOS inertia scroll
          return
        }

        this.bannerFax.style.top = `${faxRect.top}px`
        this.bannerFax.style.transition = 'transform 200ms ease'
        this.bannerFax.style.position = 'fixed'
        this.bannerFax.style.opacity = '1'
        this.bannerOrg.style.opacity = '0'

        let timeout1 = setTimeout(() => {
          let routeDirection = this.$store.state.routeDirection
          if (routeDirection === 'forward') {
            if (faxRect.top <= 0) {
              this.bannerFax.style.transform = `translateY(${-faxRect.top}px)`
            }
          } else if (routeDirection === 'backward') {
            if (faxRect.top <= 0) {
              let a = this.$store.state.lastScrollPosition
              let b = Math.abs(faxRect.top)
              let c = this.bannerOrg
                .querySelector('.eodiro-navigation')
                .getBoundingClientRect().height
              let d = faxRect.height
              let e = Math.abs(d - b - c)

              if (a !== undefined) {
                if (a > b) {
                  // shift up

                  if (a > d - c) {
                    // shift max available
                    this.bannerFax.style.transform = `translateY(${-e}px)`
                  } else {
                    // shift with distance
                    this.bannerFax.style.transform = `translateY(${-(a - b)}px)`
                  }
                } else {
                  // shift down
                  this.bannerFax.style.transform = `translateY(${-(a - b)}px)`
                }
              }
            }
          }
        }, 10)

        this.timeouts.push(timeout1)
      }
    }
  },
  mounted() {
    this.bannerOrg = document.getElementById('eodiro-banner')
    this.bannerFax = document.getElementById('eodiro-banner-facsimile')
    this.bannerFax.style.opacity = '0'
  }
}
</script>
