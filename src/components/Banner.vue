<template>
  <div id="eodiro-banner" :class="{ mini: isMini }">
    <div class="banner">
      <transition name="bg-fade" v-for="appName in $store.state.appList" :key="`bg-${appName}`">
        <div
          v-if="appName === $store.state.currentAppName"
          class="background"
          :class="`background--${appName}`"
        ></div>
      </transition>
      <transition name="fade">
        <HomeBgTile v-if="$store.state.currentAppName === 'home' && !isMini" />
      </transition>
      <div class="logo-wrapper">
        <transition
          name="icon-change"
          v-for="appName in $store.state.appList"
          :key="`banner-${appName}`"
        >
          <div
            v-if="appName === $store.state.currentAppName"
            class="logo app-icon"
            :class="`app--${appName}`"
          >
            <span class="icon"></span>
          </div>
        </transition>
      </div>

      <nav class="eodiro-navigation">
        <div class="prev-wrapper" v-if="$store.state.prevPath">
          <nuxt-link class="prev-link" :to="localePath($store.state.prevPath)">
            <button class="prev"></button>
          </nuxt-link>
        </div>
        <div class="dummy" v-if="!$store.state.prevPath"></div>
        <transition name="icon-change">
          <nuxt-link class="nav-icon-link" :to="localePath('index')" v-if="isMini">
            <div class="nav-icon-wrapper">
              <transition
                name="fade"
                v-for="appName in $store.state.appList"
                :key="`nav-${appName}`"
              >
                <div
                  v-if="appName === $store.state.currentAppName"
                  class="nav-icon app-icon app--home"
                  :class="[
                  `app--${appName}`,
                ]"
                >
                  <span class="icon"></span>
                </div>
              </transition>
            </div>
          </nuxt-link>
        </transition>
        <div class="dummy"></div>
      </nav>
    </div>
  </div>
</template>

<script>
import HomeBgTile from '~/components/home/HomeBgTile.vue'

export default {
  components: { HomeBgTile },
  data() {
    return {
      isMini: false,
      observer: null,
      sentinel: null
    }
  },
  watch: {
    $route(to, from) {
      // stop observing when the route is still changing
      this.observer.unobserve(this.sentinel)

      // after page load and scroll to the proper position,
      // observe again
      window.$nuxt.$once('triggerScroll', () => {
        this.observer.observe(this.sentinel)
      })
    }
  },
  created() {
    // for the first time,
    // check if the page requires Banner mini mode
    if (this.$store.state.banner.isForcedMini) {
      this.isMini = true
    }
  },
  mounted() {
    // middle sentinel for navigation app icon transition effect
    this.sentinel = document.querySelector('#banner-observer-sentinel')
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.target.isSameNode(this.sentinel)) {
          if (this.$store.state.banner.isForcedMini) {
            this.isMini = true
          } else if (entry.isIntersecting) {
            this.isMini = false
          } else {
            this.isMini = true
          }
        }
      })
    })

    // start observing
    this.observer.observe(this.sentinel)
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/eodiro-banner.scss';
</style>
