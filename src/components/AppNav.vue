<template>
  <transition
    appear
    name="trans"
  >
    <nav id="app-navigation">
      <div class="an-container">
        <router-link :to="backLink"><button class="go-back"></button></router-link>
        <h1 class="title">{{ navTitle }}</h1>
        <div class="dummy"></div>
      </div>
    </nav>
  </transition>
</template>

<script>
export default {
  props: ['navTitle', 'backLink'],
  data() {
    return {
      
    }
  }
}
</script>


<style lang="scss">
@import '../scss/global-variables.scss';
@import '../scss/global-mixins.scss';

#app-navigation {
  $top-gap: 4rem;

  // padding-top: $top-gap;
  // position: sticky;
  // top: -$top-gap;
  will-change: transform;
  background-color: $base-white;
  z-index: 9999;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  $time: 700ms;

  &.trans-enter-active, &.trans-leave-active {
    transition: transform $time $eodiro-cb;
    transform: translateY(0);
  }
  &.trans-enter, &.trans-leave-to {
    transform: translateY(-100%);
  }

  .an-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 1rem;
    width: 100%;
    max-width: 50rem;
    margin: auto;

    $go-back-width: 2rem;

    .go-back {
      width: $go-back-width;

      @include smaller-than(700px) {
        width: $go-back-width/1.2;
      }
    }

    .title {
      font-family: $font-display;
      font-weight: 700;
      font-size: 2rem;
      text-align: center;
      margin: 0 1rem;

      @include smaller-than(700px) {
        font-size: 1.5rem;
      }
    }

    .dummy {
      width: $go-back-width;
    }
  }
}

</style>
