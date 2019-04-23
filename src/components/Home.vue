<template>
  <div id="home">
    <transition
      appear
      name="zoom"
    >
      <div class="start-box">
        <div class="wrapper">
          <img class="logo mode--light" src="/assets/images/eodiro/logo.svg" alt="" />
          <img class="logo mode--dark" src="/assets/images/eodiro/logo_dark.svg" alt="" />
          <router-link to="/buildings"><button class="go-btn">Start</button></router-link>
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
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

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
    max-width: 35rem;
    height: 90vh;
    max-height: 25rem;
    box-shadow: 0 30px 300px rgba(0,0,0,0.2);
    padding: 2rem;
    text-align: center;
    overflow: hidden;
    will-change: transform;
    transition: all 500ms ease;

    $transition-time: 1500ms;
    $cb: cubic-bezier(.24,.49,.01,.99);

    @include smaller-than(700px) {
      width: 100%;
      max-width: none;
      border-radius: 0;
    }

    @include dark-mode() {
      background-color: #222;
      box-shadow: inset 0 0 0 2px rgba(#000, 0.7), inset 0 0 0 4px rgba(#fff, 0.15);
    }

    &.zoom-enter-active, &.zoom-leave-active {
      transform: scale(1);
      filter: blur(0px);
      opacity: 1;
      transition: all $transition-time $cb;
    }
    &.zoom-enter, &.zoom-leave-to {
      transform: scale(0.7);
      filter: blur(30px);
      opacity: 0;
    }

    .logo {
      width: 90%;
      max-width: 15rem;
      margin: auto;
      padding-top: 1rem;
      display: block;

      @include smaller-than(500px) {
        max-width: 12rem;
      }
    }

    .go-btn {
      background-color: $light-blue;
      border-radius: 50px;
      padding: 0.5rem;
      font-family: $font-text;
      font-size: 1.2rem;
      font-weight: 700;
      color: #fff;
      width: 100%;
      max-width: 6rem;
      margin-top: 2rem;
      box-shadow: 0 0.5rem 1.5rem rgba($light-blue, 0.3);
      transition: $smooth-transition;

      &:active {
        background-color: darken($light-blue, 15);
        transform: $click-transform;
      }

      @include dark-mode() {
        background-color: $light-yellow;
        box-shadow: 0 0.5rem 1.5rem rgba(#000, 0.3);

        &:active {
          background-color: lighten($light-yellow, 15);
        }
      }
    }
  }
}

</style>
