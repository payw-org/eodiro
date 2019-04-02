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
  name: 'App',
  watch: {
  }
}
</script>
