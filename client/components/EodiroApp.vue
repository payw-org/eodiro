<template>
  <div id="eodiro-app">
    <AppNav :nav-title="navTitle" :back-link="backLink" :is-hidden="isNavHidden"/>
    <div class="ea-content">
      <transition
        name="fade"
        mode="out-in"
      >
        <keep-alive>
          <router-view
            :is-right-direction="isRightDirection"
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
  watch: {
    $route (to, from) {
      this.setNavData()
      this.isNavHidden = false
    }
  },
  mounted() {
    this.isNavHidden = false
    this.setNavData()
    window.addEventListener('scroll', e => {
      // if (this.$route.name !== 'floors') {
        this.updateNavView()
      // }
    })
  },
  props: [
    'isRightDirection'
  ],
  data () {
    return {
      navTitle: '',
      backLink: '/',
      isNavHidden: true,
      lastScrollTop: 0,
      threshold: window.scrollY
    }
  },
  methods: {
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
    setNavData () {
      let rp = this.$route.params
      if (this.$route.name === 'building') {
        this.navTitle = '건물을 선택하세요'
        this.backLink = '/'
      } else if (this.$route.name === 'floor') {
        this.navTitle = '원하는 층을 선택하세요'
        this.backLink = '/' + rp.universityVendor
      } else if (this.$route.name === 'result') {
        this.navTitle = '빈 강의실 목록입니다'
        this.backLink = '/' + rp.universityVendor + '/' + rp.buildingID
      }
    }
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
