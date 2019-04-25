<template>
  <div id="eodiro-app">
    <AppNav :navTitle="navTitle" :backLink="backLink" :isHidden="isNavHidden"/>
    <div class="ea-content">
      <transition
        name="fade"
        mode="out-in"
      >
        <keep-alive>
          <router-view></router-view>
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
    $route () {
      this.setNavData()
      this.$el.querySelector('.content-item').scrollTop
      this.isNavHidden = false
    }
  },
  mounted() {
    this.setNavData()
    window.addEventListener('scroll', e => {
      this.updateNavView()
    })
  },
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
      if (this.$route.params.hasOwnProperty('buildingID')) {
        this.navTitle = 'Select a floor from '
        this.backLink = '/buildings'
      } else {
        this.navTitle = 'Select a building'
        this.backLink = '/'
      }
    }
  }
}
</script>

<style lang="scss">
@import '../scss/global-variables.scss';

#eodiro-app {
  .ea-content {  
    .content-item {
      padding-top: 10rem;
      display: block;
    
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
