<template>
  <div class="eodiro-banner">
    <div class="banner">
      <transition name="bg-fade" v-for="appName in $store.state.appList" :key="`bg-${appName}`">
        <div
          v-if="appName === $store.state.currentAppName"
          class="background"
          :class="`background--${appName}`"
        ></div>
      </transition>
      <transition name="fade">
        <HomeBgTile
          v-if="$store.state.currentAppName === 'home' && !$store.state.banner.navMode && kind === 'original'"
        />
      </transition>
      <div class="logo-wrapper">
        <transition
          name="icon-change"
          v-for="appName in $store.state.appList"
          :key="`banner-${appName}`"
        >
          <div
            v-if="appName === $store.state.currentAppName"
            class="logo app-icon"
            :class="`app--${appName}`"
          >
            <span class="icon"></span>
          </div>
        </transition>
      </div>
    </div>
    <nav class="eodiro-navigation">
      <div class="prev-wrapper" v-if="$store.state.prevPath">
        <nuxt-link class="prev-link" :to="localePath($store.state.prevPath)">
          <button class="prev"></button>
        </nuxt-link>
      </div>
      <div class="dummy" v-if="!$store.state.prevPath"></div>
      <transition name="nav-icon-fade">
        <nuxt-link
          class="nav-icon-link"
          :to="localePath('index')"
          v-if="$store.state.banner.navMode"
        >
          <div class="nav-icon-wrapper">
            <transition name="fade" v-for="appName in $store.state.appList" :key="`nav-${appName}`">
              <div
                v-if="appName === $store.state.currentAppName"
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
            </transition>
          </div>
        </nuxt-link>
      </transition>
      <div class="dummy"></div>
    </nav>
    <div class="sentinel--middle"></div>
    <div class="sentinel--bottom"></div>
  </div>
</template>

<script>
import HomeBgTile from '~/components/home/HomeBgTile.vue'

export default {
  components: { HomeBgTile },
  props: ['kind']
}
</script>
