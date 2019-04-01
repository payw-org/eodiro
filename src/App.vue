<template>
  <div id="app">
    <transition
      appear
      name="fade"
    >
    <h1>Hello App!</h1>
    </transition>
    <router-link to="/">Go to home</router-link>
    <router-link to="/buildings">Go to buildings</router-link>

    <transition
      appear
      name="fade"
    >
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import './scss/globalstyle'

export default {
  name: 'app'
}
</script>
