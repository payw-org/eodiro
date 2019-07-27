<template>
  <div
    id="eodiro-banner"
    class="eodiro-banner"
    :class="{
      'nav-mode': $store.state.banner.navMode,
      'hidden': $store.state.banner.isOrgHidden
    }"
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
      <HomeBgTile v-if="$store.state.currentAppName === 'home' && !$store.state.banner.navMode" />
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
  methods: {
    // goBack() {
    //   // previous pathname
    //   // from custom historyStack in store
    //   // -> this is history based
    //   let storePrevPathName = this.$store.getters.getPreviousPathName
    //   // get previous pathname
    //   // using custom routeMap in store
    //   // -> this is real go back path
    //   let nuxtPrevPathName = this.localePath(
    //     this.$store.getters.getPreviousRoute(this.routeName, this.$route.name)
    //   )
    //   if (storePrevPathName === nuxtPrevPathName) {
    //     // if history is same as real back path
    //     history.back()
    //   } else {
    //     // if history is different from real back path,
    //     // force push that
    //     this.$router.push({ path: nuxtPrevPathName })
    //   }
    //   return ''
    // }
  },
  mounted() {
    // middle sentinel for navigation app icon transition effect
    let sentinelMiddle = this.$el.querySelector('.sentinel--middle')
    let sentinelBottom = this.$el.querySelector('.sentinel--bottom')
    let observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.target.isSameNode(sentinelMiddle)) {
          if (entry.isIntersecting) {
            this.$store.commit('banner/setNavMode', false)
          } else {
            this.$store.commit('banner/setNavMode', true)
          }
        } else if (entry.target.isSameNode(sentinelBottom)) {
          if (entry.isIntersecting) {
            this.$store.commit('banner/unsticky')
          } else {
            this.$store.commit('banner/sticky')
          }
        }
      })
    })
    observer.observe(sentinelMiddle) // observe middle sentinel
    observer.observe(sentinelBottom) // observe bottom sentinel
  }
}
</script>
