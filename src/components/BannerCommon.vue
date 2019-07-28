<template>
  <div class="eodiro-banner">
    <div class="banner">
      <div class="logo-wrapper">
        <div
          v-for="appName in $store.state.appList"
          :key="`banner-${appName}`"
          class="logo app-icon"
          :class="[
            `app--${appName}`,
            {
              active: $store.state.currentAppName === appName
            }
          ]"
        >
          <span class="icon"></span>
        </div>
      </div>
      <HomeBgTile v-if="$store.state.currentAppName === 'home' && !$store.state.banner.navMode" />
    </div>
    <nav class="eodiro-navigation">
      <div class="prev-wrapper" v-if="$store.state.prevPath">
        <nuxt-link :to="$store.state.prevPath">
          <button class="prev"></button>
        </nuxt-link>
      </div>
      <div class="dummy" v-if="!$store.state.prevPath"></div>
      <nuxt-link :to="localePath('index')">
        <div class="nav-icon-wrapper">
          <div
            v-for="appName in $store.state.appList"
            :key="`nav-${appName}`"
            class="nav-icon app-icon app--home"
            :class="[
              `app--${appName}`,
              {
                active: $store.state.currentAppName === appName
              }
            ]"
          >
            <span class="icon"></span>
          </div>
        </div>
      </nuxt-link>
      <div class="dummy"></div>
    </nav>
    <div class="sentinel--middle"></div>
    <div class="sentinel--bottom"></div>
  </div>
</template>

<script>
import HomeBgTile from '~/components/home/HomeBgTile.vue'

export default {
  components: { HomeBgTile }
}
</script>
