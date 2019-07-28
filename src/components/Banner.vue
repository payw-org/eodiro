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
