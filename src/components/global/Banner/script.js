import disableScroll from 'disable-scroll'
import { CEM } from '~/modules/custom-event-manager'
import HomeBgTile from '~/components/home/HomeBgTile.vue'

/** @type {import('vue/types/options').ComponentOptions} */
const component = {
  components: { HomeBgTile },
  data() {
    return {
      appearMini: false,
      isMini: false,
      isNavMode: false,
      observer: null,
      sentinel: null,
      routeSwitch: 0,
      zIndexSwitch: 0,
      hamlet0: '',
      hamlet1: ''
    }
  },
  computed: {
    currentHamlet() {
      return this.$route.meta.hamletName
    }
  },
  watch: {
    isMini(bool) {
      if (bool) {
        CEM.dispatchEvent('bannerminified')
      } else {
        CEM.dispatchEvent('bannerspreaded')
      }
    },
    currentHamlet(next, previous) {
      if (!this.routeSwitch) {
        this.hamlet0 = previous
        this.hamlet1 = next
      } else {
        this.hamlet1 = previous
        this.hamlet0 = next
      }

      this.routeSwitch = !this.routeSwitch
    }
  },
  created() {
    // Initialize hamlet0 on server side
    this.hamlet0 = this.currentHamlet

    if (this.$route.meta.depth > 1) {
      this.appearMini = true
    }
  },
  mounted() {
    // Sentinel for banner
    this.sentinel = document.querySelector('#banner-observer-sentinel')
    const bannerElm = document.getElementById('eodiro-banner')
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target.isSameNode(this.sentinel)) {
          if (this.$route.meta.depth > 1) {
            this.isMini = true
            this.isNavMode = true
            this.$nextTick(() => {
              bannerElm.classList.add('mini')
              bannerElm.classList.add('nav-mode')
            })
          } else if (entry.isIntersecting) {
            this.isNavMode = false
            this.$nextTick(() => {
              bannerElm.classList.remove('nav-mode')
            })
          } else {
            this.isNavMode = true
            this.$nextTick(() => {
              bannerElm.classList.add('nav-mode')
            })
          }
        }
      })
    })

    // Start observing
    this.observer.observe(this.sentinel)

    // When route changes(page move),
    // after scroll position restoration
    // reobserve the sentinel
    CEM.addEventListener('scrollrestored', this.$el, (e) => {
      // Reobserve sentinel
      this.observer.observe(this.sentinel)
      const bannerElm = document.getElementById('eodiro-banner')
      const scrollTop = e.detail.scrollPosition // Always positive
      const pageDepth = e.detail.pageDepth
      const bannerRect = bannerElm.getBoundingClientRect()
      const bannerTop = Math.abs(bannerRect.top) // Convert to positive
      const distance = bannerTop - scrollTop
      const bannerHeight = bannerRect.height
      const navHeight = this.$el
        .querySelector('.eodiro-navigation')
        .getBoundingClientRect().height
      const bannerHeightWithoutNav = bannerHeight - navHeight
      let newBannerTop = bannerTop - distance
      if (pageDepth > 1) {
        newBannerTop = bannerHeightWithoutNav
        bannerElm.classList.add('mini')
      } else {
        bannerElm.classList.remove('mini')
      }
      if (newBannerTop > bannerHeightWithoutNav) {
        newBannerTop = bannerHeightWithoutNav
      }
      bannerElm.classList.add('transitioning')
      bannerElm.style.transform = `translateY(${-newBannerTop}px)`
      setTimeout(() => {
        bannerElm.style.cssText = ''
        bannerElm.classList.remove('transitioning')
        disableScroll.off()
        CEM.dispatchEvent('bannertransitionended')
      }, 300)
    })

    // Before page leaves, unobserve sentinel
    // to prevent unexpected error
    CEM.addEventListener('beforepageleave', this.$el, () => {
      this.observer.unobserve(this.sentinel)
      const bannerElm = document.getElementById('eodiro-banner')
      const top = bannerElm.getBoundingClientRect().top
      bannerElm.style.cssText = `transform: translateY(${top}px); position: fixed; top: 0;`
      disableScroll.on()
    })
  }
}

export default component
