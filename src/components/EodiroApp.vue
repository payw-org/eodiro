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
      isNavHidden: false,
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
      if (this.$route.name === 'buildings') {
        this.navTitle = '건물을 선택하세요'
        this.backLink = '/'
      } else if (this.$route.name === 'floors') {
        this.navTitle = '원하는 층을 선택하세요'
        this.backLink = '/buildings'
      } else if (this.$route.name === 'result') {
        this.navTitle = '검색결과입니다'
        this.backLink = '/buildings/' + this.$route.params.buildingID + '/floors'
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
        transition: all 300ms ease;
        // opacity: 1;
      }
      &.fade-enter, &.fade-leave-to {
        opacity: 0;
        // transform: translateX(-30%);
      }
    }
  }
}
</style>
