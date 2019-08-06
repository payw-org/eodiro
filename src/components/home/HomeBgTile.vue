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
      resizeEvent: null,
      bannerWidth: null,
      bannerHeight: null
    }
  },
  methods: {
    calculateVisibleTilesNumber() {
      // notice - there must be no scrollbar
      const heightParentComponent = 37 / 100
      const remRatioMoreThan1400 = 1.15
      const remRatioMoreThan700 = 1
      const remRatioUnder700 = 0.85

      let width_device = window.innerWidth
      let height_device = window.innerHeight
      let tileNum_height, tileNum_width

      // calc one rem
      let rem = parseInt(
        window.getComputedStyle(document.body).getPropertyValue('font-size'),
        10
      )
      let width_tile

      // rem dependency
      if (width_device >= 1400) {
        rem *= remRatioMoreThan1400
      } else if (width_device >= 700) {
        rem *= remRatioMoreThan700
      } else {
        rem *= remRatioUnder700
      }

      let width_container_tiles = width_device * 1.05
      let height_container_tiles = height_device * heightParentComponent

      if (width_device >= 700) {
        // minimize width_tile
        width_tile = 3.5 * rem

        // calc tileNum_width in minimized width_tile and round it
        tileNum_width = Math.floor(
          (width_container_tiles + 1.5 * rem) / (width_tile + 1.5 * rem)
        )

        // calc real width_tile
        width_tile =
          (width_container_tiles + 1.5 * rem) / tileNum_width - 1.5 * rem
        // calc tileNum_height
        tileNum_height =
          Math.floor(
            (height_container_tiles + 1.5 * rem) / (width_tile + 1.5 * rem)
          ) + 1
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
        tileNum_height =
          Math.floor(
            (height_container_tiles + 1 * rem) / (width_tile + 1 * rem)
          ) + 1
      }
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
    updateTilesNumber() {
      let current_tileNum = this.calculateVisibleTilesNumber()
      let previous_tileNum

      if (this.tileStates != null) {
        previous_tileNum = this.tileStates.length
      } else {
        previous_tileNum = 0
      }

      let diff = current_tileNum - previous_tileNum

      // update the num of tile only difference previous and current
      if (diff > 0) {
        for (let i = 0; i < diff; i++) {
          this.tileStates.push({
            key: previous_tileNum + i,
            className: 'color-1'
          })
        }
      } else if (diff < 0) {
        for (let i = 0; i > diff; i--) {
          this.tileStates.pop()
        }
      }
    },
    activateAnimation() {
      let i, c
      let tileNum = this.getTileNum()
      this.interval = setInterval(() => {
        for (let a = 0; a < Math.ceil(tileNum / 20); a++) {
          i = Math.floor(Math.random() * tileNum)
          c = Math.floor(Math.random() * 9)
          this.tileStates[i]['className'] = 'color-' + c
        }
      }, 100)
    },
    getTileNum() {
      if (this.tileStates != null) return this.tileStates.length
      return 0
    }
  },
  mounted() {
    let bannerRect = document
      .querySelector('#eodiro-banner')
      .getBoundingClientRect()
    this.bannerHeight = bannerRect.height
    this.bannerWidth = bannerRect.width

    this.createTiles()

    window.addEventListener(
      'resize',
      (this.resizeEvent = () => {
        let bannerHeightChanged = false
        let bannerWidthChanged = false
        bannerRect = document
          .querySelector('#eodiro-banner')
          .getBoundingClientRect()

        if (this.bannerHeight !== bannerRect.height) {
          this.bannerHeight = bannerRect.height
          bannerHeightChanged = true
        }

        if (this.bannerWidth !== bannerRect.width) {
          this.bannerWidth = bannerRect.width
          bannerWidthChanged = true
        }

        if (bannerHeightChanged || bannerWidthChanged) {
          window.clearInterval(this.interval)
          this.updateTilesNumber()
          this.activateAnimation()
        }
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
@import '~/assets/styles/scss/variables/all.scss';
@import '~/assets/styles/scss/mixins/all.scss';
#tiles-container {
  position: absolute;
  width: 105%;
  height: auto;
  overflow: hidden;
  display: grid;
  grid-gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(3.5rem, 1fr));
  grid-template-rows: repeat(auto-fit, minmax(3.5rem, 1fr));
  @include smaller-than(700px) {
    grid-gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(3rem, 1fr));
    grid-template-rows: repeat(auto-fit, minmax(3rem, 1fr));
  }
  .tile {
    border-radius: 1rem;
    background-color: #fff0f3;
    opacity: 0;
    transition: opacity 500ms linear, background-color $color-scheme-transition-time ease;

    @include smaller-than(700px) {
      border-radius: 0.85rem;
    }

    @include dark-mode {
      background-color: #63000d;
    }

    &::before {
      content: '';
      display: block;
      padding-top: 100%;
    }
    &.color-1 {
      opacity: 0;
    }
    &.color-2 {
      opacity: 0;
    }
    &.color-3 {
      opacity: 0.01;
    }
    &.color-4 {
      opacity: 0.02;
    }
    &.color-5 {
      opacity: 0.04;
    }
    &.color-6 {
      opacity: 0.08;
    }
    &.color-7 {
      opacity: 0.16;
    }
    &.color-8 {
      opacity: 0.32;
    }
  }
}
</style>
