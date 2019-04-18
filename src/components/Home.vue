<template>
  <div id="home">
    <transition
      appear
      name="zoom"
    >
      <div class="go-box">
        <div class="wrapper">
          <img class="logo" src="/assets/images/eodiro/logo.svg" alt="" />
          <router-link to="/buildings"><button class="go-btn">GO</button></router-link>
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
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  // background-color: #fff;
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;

  .wrapper {
    width: 100%;
  }

  .go-box {
    z-index: 7777;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-radius: 3rem;
    width: 90%;
    max-width: 30rem;
    height: 90vh;
    max-height: 20rem;
    box-shadow: 0 30px 300px rgba(0,0,0,0.2);
    padding: 2rem;
    text-align: center;
    overflow: hidden;
    will-change: transform;

    $transition-time: 1500ms;
    $cb: cubic-bezier(.24,.49,.01,.99);


    &.zoom-enter-active, &.zoom-leave-active {
      transform: scale(1);
      -moz-filter: blur(0px);
      filter: blur(0px);
      opacity: 1;
      transition: all $transition-time $cb;
    }
    &.zoom-enter, &.zoom-leave-to {
      transform: scale(3);
      -moz-filter: blur(30px);
      filter: blur(30px);
      opacity: 0;
    }

    .logo {
      width: 90%;
      max-width: 15rem;
      margin: auto;
      display: block;
    }

    .go-btn {
      background-color: $light-blue;
      border-radius: 50px;
      padding: 0.5rem;
      font-family: $font-text;
      font-size: 1rem;
      font-weight: 500;
      color: #fff;
      width: 100%;
      max-width: 6rem;
      margin-top: 2rem;
      box-shadow: 0 0.5rem 1.5rem rgba($light-blue, 0.3);
      transition: $smooth-transition;

      &:hover {
        background-color: darken($light-blue, 3);
        transform: $hover-transform;
      }
      &:active {
        background-color: darken($light-blue, 10);
        transform: $click-transform;
      }
    }
  }
}

</style>
