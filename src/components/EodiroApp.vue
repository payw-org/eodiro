<template>
  <div id="eodiro-app">
    <AppNav :navTitle="navTitle" :backLink="backLink" :isHidden="isNavHidden"/>
    <div class="ea-content">
      <transition
        name="fade"
      >
        <keep-alive>
          <router-view @updateNavView="updateNavView()"></router-view>
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
  },
  data () {
    return {
      navTitle: '',
      backLink: '/',
      prevScrollpos: undefined,
      isNavHidden: false
    }
  },
  methods: {
    updateNavView() {
      let contentItemElm = this.$el.querySelector('.content-item')
      var currentScrollPos = contentItemElm.scrollTop
      if (
        this.prevScrollpos > currentScrollPos
        && currentScrollPos < (contentItemElm.scrollHeight - contentItemElm.clientHeight)
      ) {
        this.isNavHidden = false
      } else if (currentScrollPos > 0) {
        this.isNavHidden = true
      }
      this.prevScrollpos = currentScrollPos
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
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;

  .ea-content {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    overflow: hidden;
  
    .content-item {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      padding-top: 10rem;
      height: 100%;
      overflow-x: hidden;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    
      &.fade-enter-active, &.fade-leave-active {
        transition: all 300ms $eodiro-cb;
        opacity: 1;
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
      }
      &.fade-enter, &.fade-leave-to {
        opacity: 0;
      }
    }
  }
}
</style>
