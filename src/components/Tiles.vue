<template>
  <div id="tiles-container">
    <div
      v-for="tileState in tileStates"
      :class="'tile ' + tileState.className"
      :key="tileState.key"
    ></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      key: 0,
      tileStates: undefined,
      visibleTilesNum: 0,
      interval: 0,
      resizeEvent: null
    }
  },
  methods: {
    calculateVisibleTilesNumber() {
      let tiles = this.$el.querySelectorAll('.tile')
      let width_device = window.innerWidth
      let height_device = window.innerHeight
      let tileNum_height, tileNum_width

      let rem = parseInt(
        window.getComputedStyle(document.body).getPropertyValue('font-size'),
        10
      )
      let width_tile

      if (width_device >= 1400) {
        rem *= 1.3
      } else if (width_device >= 700) {
        rem *= 1.1
      } else {
        rem *= 0.85
      }

      let width_container_tiles = width_device * 1.1
      let height_container_tiles = height_device * 1.25
      if (width_device >= 700) {
        // minimize width_tile
        width_tile = 4 * rem

        // calc tileNum_width in minimized width_tile and round it
        tileNum_width = Math.floor(
          (width_container_tiles + 1.5 * rem) / (width_tile + 1.5 * rem)
        )
        console.log('>' + width_device)
        // calc real width_tile
        width_tile =
          (width_container_tiles + 1.5 * rem) / tileNum_width - 1.5 * rem
        // calc tileNum_height
        tileNum_height = Math.ceil(
          ((height_container_tiles * 40) / 100 + 1.5 * rem) /
            (width_tile + 1.5 * rem)
        )
      } else {
        // minimize width_tile
        width_tile = 3 * rem

        // calc tileNum_width in minimized width_tile and round it
        tileNum_width = Math.floor(
          (width_container_tiles + 1 * rem) / (width_tile + 1 * rem)
        )
        // calc real width_tile
        width_tile = (width_container_tiles + 1 * rem) / tileNum_width - 1 * rem
        // calc tileNum_height
        tileNum_height = Math.floor(
          ((height_container_tiles * 40) / 100 + 1 * rem) /
            (width_tile + 1 * rem)
        )
      }
      console.log(width_tile)
      console.log(tileNum_width)
      console.log(tileNum_height)
      return tileNum_height * tileNum_width
    },
    createTiles() {
      let ts = []
      let tileNum = this.calculateVisibleTilesNumber()
      for (let i = 0; i < tileNum; i++) {
        ts.push({
          key: i,
          className: 'color-1'
        })
      }
      this.tileStates = ts

      // Use nextTick to run animation after
      // the elements are rendered with the data input
      this.$nextTick(() => {
        this.activateAnimation()
      })
    },
    activateAnimation() {
      let i, c
      let tileNum = this.calculateVisibleTilesNumber()
      this.interval = setInterval(() => {
        for (let a = 0; a < Math.ceil(tileNum / 20); a++) {
          i = Math.floor(Math.random() * tileNum)
          c = Math.floor(Math.random() * 9)
          this.tileStates[i]['className'] = 'color-' + c
        }
      }, 100)
    }
  },
  mounted() {
    this.createTiles()
    window.addEventListener(
      'resize',
      (this.resizeEvent = () => {
        window.clearInterval(this.interval)
        this.activateAnimation()
      })
    )
  },
  beforeDestroy() {
    clearInterval(this.interval)
    window.removeEventListener('resize', this.resizeEvent)
  }
}
</script>
<style lang="scss">
@import '~/assets/styles/scss/global-variables.scss';
@import '~/assets/styles/scss/global-mixins.scss';
#tiles-container {
  position: absolute;
  width: 110%;
  height: 125%;
  overflow: hidden;
  display: grid;
  grid-gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(4rem, 1fr));
  grid-template-rows: repeat(auto-fit, minmax(4rem, 1fr));
  @include smaller-than(700px) {
    grid-gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(3rem, 1fr));
  }
  .tile {
    border-radius: 1.5rem;
    transition: background-color 500ms linear;
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
      @include dark-mode() {
        background-color: #363636;
      }
    }
    &.color-5 {
      background-color: #fafafd;
      @include dark-mode() {
        background-color: #383838;
      }
    }
    &.color-6 {
      background-color: #f4f4f7;
      @include dark-mode() {
        background-color: #414141;
      }
    }
    &.color-7 {
      background-color: #f8f8fb;
      @include dark-mode() {
        background-color: #4b4b4b;
      }
    }
    &.color-8 {
      background-color: #e4e4e7;
      @include dark-mode() {
        background-color: #686868;
      }
    }
  }
}
</style>
