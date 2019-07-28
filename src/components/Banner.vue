<template>
  <banner-common
    :kind="'original'"
    id="eodiro-banner"
    :class="{
      'nav-mode': $store.state.banner.navMode,
      'hidden': $store.state.banner.isOrgHidden
    }"
  />
</template>

<script>
import BannerCommon from '~/components/BannerCommon.vue'
import HomeBgTile from '~/components/home/HomeBgTile.vue'

export default {
  components: { BannerCommon, HomeBgTile },
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
