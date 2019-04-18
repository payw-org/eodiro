<template>
  <div id="eodiro-app">
    <AppNav :navTitle="navTitle" :backLink="backLink" />
    <div class="ea-content">
      <transition
        name="fade"
      >
        <router-view></router-view>
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
    }
  },
  mounted() {
    this.setNavData()
  },
  data () {
    return {
      navTitle: '',
      backLink: '/'
    }
  },
  methods: {
    setNavData () {
      if (this.$route.params.hasOwnProperty('buildingID')) {
        this.navTitle = 'Select a floor'
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

.ea-content {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  overflow: auto;

  .content-item {
    padding: 5rem 1.5rem 3rem;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
  
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
</style>
