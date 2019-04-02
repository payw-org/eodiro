<template>
  <div id="home-bg-tile">
    <div v-for="tileState in tileStates" :class="'tile ' + tileState" :key="tileState"></div>
  </div>
</template>

<script>
let tileStates = new Array(500)
for (let i = 0; i < 500; i++) {
  tileStates.push({
    key: i,
    className: 'color-1'
  })
}
export default {
  data() {
    return {
      key: 0,
      tileStates: new Array(500).fill()
    }
  }
}
</script>

<style lang="scss">
@import '../scss/global-variables.scss';
@import '../scss/global-mixins.scss';

#home-bg-tile {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  display: grid;
  grid-gap: 1.5rem;
  padding: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(4rem, 1fr));

  @include smaller-than(700px) {
    grid-gap: 1rem;
    padding: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(3rem, 1fr));
  }

  .tile {
    background-color: #fff;
    border-radius: 1rem;
    transition: background-color 1s ease;

    @include smaller-than(700px) {
      border-radius: 0.8rem;
    }

    &::before {
      content: '';
      display: block;
      padding-top: 100%;
    }

    &.color-1 {
      background-color: transparent;
    }
    &.color-2 {
      background-color: transparent;
    }
    &.color-3 {
      background-color: transparent;
    }
    &.color-4 {
      background-color: #fcfcff;
    }
    &.color-5 {
      background-color: #fafafe;
    }
    &.color-6 {
      background-color: #f4f4f8;
    }
    &.color-7 {
      background-color: #f8f8fc;
    }
    &.color-8 {
      background-color: #e4e4ea;
    }
  }
}
</style>
