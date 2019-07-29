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
            <transition name="fade" v-for="appName in $store.state.appList" :key="`nav-${appName}`">
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
</template>

<script>
import HomeBgTile from '~/components/home/HomeBgTile.vue'

export default {
  components: { HomeBgTile },
  data() {
    return {
      isMini: false,
      observer: undefined,
      sentinel: undefined
    }
  },
  watch: {
    $route(to, from) {
      this.observer.unobserve(this.sentinel)
      window.$nuxt.$once('triggerScroll', () => {
        this.observer.observe(this.sentinel)
      })
    }
  },
  computed: {
    // isComputedMini() {
    //   console.group('computed mini')
    //   console.log('isMini: ', this.isMini)
    //   console.log('isForcedMini: ', this.isForcedMini)
    //   console.groupEnd()
    //   return this.isMini || this.$store.state.banner.isForcedMini
    // },
    // isForcedMini() {
    //   return this.$store.state.banner.isForcedMini
    // }
  },
  mounted() {
    // middle sentinel for navigation app icon transition effect
    let sentinel = document.querySelector('#banner-observer-sentinel')
    let observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.target.isSameNode(sentinel)) {
          console.group('observer')
          if (this.$store.state.banner.isForcedMini) {
            console.log('isMini(from isForcedMini): ', true)
            this.isMini = true
          } else if (entry.isIntersecting) {
            console.log('isMini: ', false)
            this.isMini = false
          } else {
            console.log('isMini: ', true)
            this.isMini = true
          }
          console.groupEnd()
        }
      })
    })
    observer.observe(sentinel)

    this.observer = observer
    this.sentinel = sentinel
  }
}
</script>
