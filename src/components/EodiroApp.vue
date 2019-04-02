<template>
  <div id="eodiro-app">
    <AppNav :navTitle="navTitle" />
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
      this.setNavTitle()
    }
  },
  mounted() {
    this.setNavTitle()
  },
  data () {
    return {
      navTitle: ''
    }
  },
  methods: {
    setNavTitle () {
      if (this.$route.params.hasOwnProperty('buildingID')) {
        this.navTitle = 'Select a floor'
      } else {
        this.navTitle = 'Select a building'
      }
    }
  }
}
</script>

<style lang="scss">
@import '../scss/global-variables.scss';

.ea-content {
  position: relative;

  .content-item {
    padding: 0 1.2rem 3rem;
    margin-top: 3rem;
    // position: absolute;
    left: 0;
    top: 0;

    &.fade-enter-active, &.fade-leave-active {
      transition: all 300ms $eodiro-cb;
      opacity: 1;
      position: absolute;
    }
    &.fade-enter, &.fade-leave-to {
      opacity: 0;
    }
  }
}
</style>
