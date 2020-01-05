<template>
  <div id="eodiro-banner-wrapper">
    <div id="eodiro-banner" :class="{ mini: appearMini }">
      <div class="banner">
        <transition name="bg-fade">
          <div
            v-if="!routeSwitch"
            :class="`background background--${hamlet0}`"
          />
        </transition>
        <transition name="bg-fade">
          <div
            v-if="routeSwitch"
            :class="`background background--${hamlet1}`"
          />
        </transition>
        <transition name="global-soft-fade">
          <HomeBgTile v-if="$route.meta.hamletName === 'home' && !isNavMode" />
        </transition>
        <div class="logo-wrapper">
          <transition name="icon-change">
            <div
              v-if="!routeSwitch"
              class="logo hamlet-icon"
              :class="`hamlet--${hamlet0}`"
            >
              <span class="icon" />
            </div>
          </transition>
          <transition name="icon-change">
            <div
              v-if="routeSwitch"
              class="logo hamlet-icon"
              :class="`hamlet--${hamlet1}`"
            >
              <span class="icon" />
            </div>
          </transition>
        </div>

        <nav class="eodiro-navigation">
          <transition name="icon-change">
            <div class="nav-icon-wrapper">
              <transition name="icon-change">
                <div
                  v-if="!routeSwitch"
                  class="nav-icon hamlet-icon"
                  :class="`hamlet--${hamlet0}`"
                >
                  <span class="icon" />
                </div>
              </transition>
              <transition name="icon-change">
                <div
                  v-if="routeSwitch"
                  class="nav-icon hamlet-icon"
                  :class="`hamlet--${hamlet1}`"
                >
                  <span class="icon" />
                </div>
              </transition>
            </div>
          </transition>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import script from './script'
export default script
</script>

<style lang="scss">
@import './style.scss';
</style>
