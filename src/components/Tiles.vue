<template>
  <div class="tiles-container">
    <div class="a-tile"></div>
    <div class="a-tile"></div>
    <div class="a-tile"></div>
    <div class="a-tile"></div>
    <div class="a-tile"></div>
    <div class="a-tile"></div>
    <div class="a-tile"></div>
    <div class="a-tile"></div>
    <div class="a-tile"></div>
    <div class="a-tile"></div>
    <div class="a-tile"></div>
    <div class="a-tile"></div>
    <div class="a-tile"></div>
    <div class="a-tile"></div>
    <div class="a-tile"></div>
    <div class="a-tile"></div>
    <div class="a-tile"></div>
    <div class="a-tile"></div>
    <div class="a-tile"></div>
    <div class="a-tile"></div>
    <div class="a-tile"></div>
    <div class="a-tile"></div>
    <div class="a-tile"></div>
    <div class="a-tile"></div>
    <div class="a-tile"></div>
    <div class="a-tile"></div>
    <div class="a-tile"></div>
    <div class="a-tile"></div>
    <div class="a-tile"></div>
    <div class="a-tile"></div>
    <div class="a-tile"></div>
    <div class="a-tile"></div>
    <div class="a-tile"></div>
    <div class="a-tile"></div>
    <div class="a-tile"></div>
    <div class="a-tile"></div>
    <div class="a-tile"></div>
    <div class="a-tile"></div>
    <div class="a-tile"></div>
    <div class="a-tile"></div>
    <div class="a-tile"></div>
    <div class="a-tile"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false
    }
  },
  methods: {
    showComment() {
      this.show = true
    }
  }
}
</script>
<style lang="scss">
.tiles-container {
  position: absolute;
  width: 110%;
  height: 125%;
  overflow: visible;
  display: grid;
  grid-gap: 5%;
  // padding: 5% 0;
  grid-template-columns: repeat(7, 10%);

  .a-tile {
    background-color: #ff9f8f;
    // background-color: #ff3852;
    border-radius: 30%;
    padding-bottom: 100%;
  }
}
</style>
