<template>
  <div id="home">
    <transition
      appear
      name="zoom"
    >
      <div class="start-box">
        <button class="toggle-color-scheme" @click="$emit('changeColorScheme')">Dark ↔ Light</button>
        <div class="wrapper">
          <div class="desktop">
            <img class="logo mode--light" src="/assets/images/eodiro/logo.svg" alt="" />
            <img class="logo mode--dark" src="/assets/images/eodiro/logo_dark.svg" alt="" />
          </div>
          <div class="mobile">
            <img class="logo" src="/assets/images/eodiro/app-icon.png" alt="" />
            <!-- <img class="logo mode--dark" src="/assets/images/eodiro/app-icon_dark.png" alt="" /> -->
          </div>
          <router-link to="/cau"><button class="go-btn eodiro-btn">시작하기</button></router-link>
        </div>
      </div>
    </transition>
    <HomeBGTile/>
  </div>
</template>

<script>
import HomeBGTile from './HomeBGTile'
import { clearInterval } from 'timers';

export default {
  name: 'Home',
  components: { HomeBGTile },
}
</script>

<style lang="scss">
@import '../scss/global-variables.scss';
@import '../scss/global-mixins.scss';

#home {
  $transition-time: 1500ms;
  $cb: cubic-bezier(.24,.49,.01,.99);
  $transition-property: $transition-time $cb;

  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: $base-white;
  transition: background-color $transition-property;

  @include dark-mode() {
    background-color: $base-black;
  }

  .wrapper {
    width: 100%;
  }

  .start-box {
    z-index: 7777;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-radius: 3rem;
    width: 90%;
    max-width: 30rem;
    height: 90%;
    max-height: 22rem;
    box-shadow: 0 30px 300px rgba(0,0,0,0.2);
    padding: 2rem;
    text-align: center;
    overflow: hidden;
    will-change: transform;
    transition: background-color 1s ease, box-shadow 1s ease;
    position: relative;

    @include dark-mode() {
      background-color: #222;
      box-shadow: 0 30px 200px rgba(0,0,0,0.5), $dark-mode-border-shadow;
    }

    @include smaller-than(700px) {
      width: 100%;
      background-color: transparent !important;
      box-shadow: none !important;
    }

    &.zoom-enter-active, &.zoom-leave-active {
      transform: scale(1);
      filter: blur(0px);
      opacity: 1;
      transition: transform $transition-time $cb, opacity $transition-time/2 $cb, filter $transition-time $cb, background-color $transition-property, box-shadow $transition-property;
    }
    &.zoom-enter, &.zoom-leave-to {
      transform: scale(0.7);
      filter: blur(30px);
      opacity: 0;
    }

    .toggle-color-scheme {
      background-color: #f4f4f4;
      padding: 0.5rem 0.8rem;
      border-radius: 50px;
      font-family: $font-text;
      font-size: 0.7rem;
      position: absolute;
      left: 50%;
      bottom: 1rem;
      transform: translateX(-50%);
      transition: background-color $transition-time $cb, color $transition-time $cb;

      &:active {
        color: inherit;
        // background-color: darken(#f4f4f4, 10);
        // transition: none;
      }

      @include dark-mode() {
        color: $base-white;
        background-color: #444;
      }
    }

    .mobile {
      display: none;
      margin-top: -5rem;

      @include smaller-than(700px) {
        display: block;
      }
    }

    @include smaller-than(700px) {
      .desktop {
        display: none;
      }
    }

    .logo {
      width: 90%;
      max-width: 15rem;
      margin: auto;
      display: block;

      @include smaller-than(700px) {
        max-width: 12rem;
      }
    }

    .go-btn {
      margin-top: 2rem;
      transition: background-color $transition-time $cb, box-shadow $transition-time $cb;

      @include smaller-than(700px) {
        margin-top: 0;
      }
    }
  }
}

</style>
