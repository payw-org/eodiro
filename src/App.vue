<template>
  <div id="app">
    <transition
      name="fade"
    >
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import './scss/globalstyle'

export default {
  mounted() {
    window.addEventListener('dragstart', e => {
      e.preventDefault()
    })
  },
  name: 'App',
  watch: {
  }
}
</script>
