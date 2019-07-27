<template>
  <div
    id="eodiro-banner-facsimile"
    class="eodiro-banner"
    :class="{
      'nav-mode': $store.state.banner.navMode,
      'fixed': $store.state.banner.fixed,
      'sticky': $store.state.banner.sticky,
      'shifting': $store.state.banner.shiftAmount, // only transition when shiftAmount available
      'hidden': $store.state.banner.isFaxHidden
    }"
    :style="[
      $store.state.banner.fixed ? { top: `${top}px` } : {},
      { transform: `translateY(${-$store.state.banner.shiftAmount}px)` }
    ]"
  >
    <div class="banner">
      <div class="logo-wrapper">
        <div
          v-for="appName in $store.state.appList"
          :key="`banner-${appName}`"
          class="logo app-icon"
          :class="[
            `app--${appName}`,
            {
              active: $store.state.currentAppName === appName
            }
          ]"
        >
          <span class="icon"></span>
        </div>
      </div>
    </div>
    <nav class="eodiro-navigation">
      <div class="prev-wrapper" v-if="$store.state.prevPath">
        <nuxt-link :to="$store.state.prevPath">
          <button class="prev"></button>
        </nuxt-link>
      </div>
      <div class="dummy" v-if="!$store.state.prevPath"></div>
      <nuxt-link :to="localePath('index')">
        <div class="nav-icon-wrapper">
          <div
            v-for="appName in $store.state.appList"
            :key="`nav-${appName}`"
            class="nav-icon app-icon app--home"
            :class="[
              `app--${appName}`,
              {
                active: $store.state.currentAppName === appName
              }
            ]"
          >
            <span class="icon"></span>
          </div>
        </div>
      </nuxt-link>
      <div class="dummy"></div>
    </nav>
    <div class="sentinel--middle"></div>
    <div class="sentinel--bottom"></div>
  </div>
</template>

<script>
import HomeBgTile from '~/components/home/HomeBgTile.vue'

export default {
  components: { HomeBgTile },
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
        this.$store.commit('banner/resetTrigger')
        let faxRect = this.$el.getBoundingClientRect()

        this.top = faxRect.top
        console.log(this.top)

        if (this.top > 0) {
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
