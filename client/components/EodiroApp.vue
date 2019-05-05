<template>
  <div id="eodiro-app">
    <AppNav :nav-title="navTitle" :back-link="backLink" :is-hidden="isNavHidden"/>
    <div class="ea-content">
      <transition
        name="fade"
        mode="out-in"
      >
        <keep-alive :include="cachedComponents">
          <router-view
            @toggleScrollEvent="toggleScrollEvent"
            :is-right-direction="isRightDirection"
            :cached-components="cachedComponents"
          ></router-view>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
import AppNav from './AppNav'

export default {
  components: { AppNav },
  props: [ 'isRightDirection' ],
  data () {
    return {
      navTitle: '',
      backLink: '/',
      isNavHidden: true,
      lastScrollTop: 0,
      threshold: window.scrollY,
      cachedComponents: []
    }
  },
  watch: {
    $route (to, from) {
      this.setNavData()
      this.isNavHidden = false

      // if go left direction, remove last cached components
      if (!this.isRightDirection) {
        this.cachedComponents.splice(this.cachedComponents.length - 1, 1)
      }
    }
  },
  methods: {
    // ignore scroll-based nav update and hide
    toggleScrollEvent(allow) {
      window.removeEventListener('scroll', this.updateNavView)

      if (allow) {
        window.addEventListener('scroll', this.updateNavView)
      }

      this.lastScrollTop = window.scrollY
    },
    // update nav hidden state using scroll position
    updateNavView() {
      let st = window.scrollY
      if (st > this.threshold + 100 && st > 0) {
        if (!this.isNavHidden) {
          this.isNavHidden = true
        }
      }
      if (st < this.lastScrollTop) {
        this.threshold = st
        if (this.isNavHidden) {
          this.isNavHidden = false
        }
      }
      this.lastScrollTop = st
    },
    // set nav title data
    setNavData () {
      let rp = this.$route.params
      if (this.$route.name === 'building') {
        this.navTitle = '건물을 선택하세요'
        this.backLink = '/'
      } else if (this.$route.name === 'floor') {
        this.navTitle = '층을 선택하세요'
        this.backLink = '/' + rp.universityVendor
      } else if (this.$route.name === 'result') {
        this.navTitle = '빈 강의실 목록입니다'
        this.backLink = '/' + rp.universityVendor + '/' + rp.buildingID
      } else if (this.$route.name === 'university') {
        this.navTitle = '학교를 선택하세요'
        this.backLink = '/'
      }
    }
  },
  mounted() {
    this.isNavHidden = false
    this.setNavData()
    window.addEventListener('scroll', this.updateNavView)
  }
}
</script>

<style lang="scss">
@import '../scss/global-variables.scss';
@import '../scss/global-mixins.scss';

#eodiro-app {
  .ea-content {  
    .content-item {
      padding-top: 11.3rem;
      padding-bottom: 10rem;
      display: block;

      @include smaller-than($mobile-width-threshold) {
        padding-top: 8.5rem;
      }
    
      &.fade-enter-active, &.fade-leave-active {
        transition: opacity 300ms ease;
      }
      &.fade-enter, &.fade-leave-to {
        opacity: 0;
      }
    }
  }
}
</style>
