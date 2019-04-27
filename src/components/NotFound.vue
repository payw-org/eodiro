<template>
  <div id="not-found">
    <div class="wrapper">
      <div class="app-icon">
        <img class="app-icon" src="/assets/images/eodiro/eodiro_app_icon.svg" alt="" />
      </div>
      <h1 class="manifesto">Ooops...<br />Could not found the route.</h1>
      <button class="eodiro-btn go-back" @click="goBack">Go back</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      history.back()
    }
  }
}
</script>

<style lang="scss">
@import '../scss/global-variables.scss';
@import '../scss/global-mixins.scss';

#not-found {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  .wrapper {
    width: 90%;
    max-width: 40rem;

    .app-icon {
      display: block;
      width: 5rem;
      position: relative;

      &::before {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        width: 5rem;
        height: 5rem;
        border-radius: 25px;
        box-shadow: 0.5rem 0.5rem 1.2rem rgba(0,0,0,0.18);
      }
    }
    
    .manifesto {
      margin-top: 1rem;
      font-family: $font-display;
      font-size: 3rem;
      max-width: 90%;

      @include smaller-than($mobile-width-threshold) {
        font-size: 2rem;
      }
    }

    .go-back {
      margin-top: 1rem;
    }
  }
}
</style>
