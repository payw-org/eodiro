<template>
  <div id="tiles-container">
    <div
      v-for="tileState in tileStates"
      :key="tileState.key"
      :class="'tile ' + tileState.className"
    />
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
      bannerHeight: null,
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
  },
  methods: {
    calculateVisibleTilesNumber() {
      // notice - there must be no scrollbar
      const heightParentComponent = 37 / 100
      const remRatioMoreThan1400 = 1.1
      const remRatioMoreThan700 = 1
      const remRatioUnder700 = 0.85

      const widthDevice = window.innerWidth
      const heightDevice = window.innerHeight
      let tileNumHeight, tileNumWidth

      // calc one rem
      let rem = parseInt(
        window.getComputedStyle(document.body).getPropertyValue('font-size'),
        10
      )
      let widthTile

      // rem dependency
      if (widthDevice >= 1400) {
        rem *= remRatioMoreThan1400
      } else if (widthDevice >= 700) {
        rem *= remRatioMoreThan700
      } else {
        rem *= remRatioUnder700
      }

      const widthContainerTiles = widthDevice * 1.05
      const heightContainerTiles = heightDevice * heightParentComponent

      if (widthDevice >= 700) {
        // minimize widthTile
        widthTile = 3.5 * rem

        // calc tileNumWidth in minimized widthTile and round it
        tileNumWidth = Math.floor(
          (widthContainerTiles + 1.5 * rem) / (widthTile + 1.5 * rem)
        )

        // calc real widthTile
        widthTile = (widthContainerTiles + 1.5 * rem) / tileNumWidth - 1.5 * rem
        // calc tileNumHeight
        tileNumHeight =
          Math.floor(
            (heightContainerTiles + 1.5 * rem) / (widthTile + 1.5 * rem)
          ) + 1
      } else {
        // minimize widthTile
        widthTile = 3 * rem

        // calc tileNumWidth in minimized widthTile and round it
        tileNumWidth = Math.floor(
          (widthContainerTiles + 1 * rem) / (widthTile + 1 * rem)
        )
        // calc real widthTile
        widthTile = (widthContainerTiles + 1 * rem) / tileNumWidth - 1 * rem
        // calc tileNumHeight
        tileNumHeight =
          Math.floor((heightContainerTiles + 1 * rem) / (widthTile + 1 * rem)) +
          1
      }
      return tileNumHeight * tileNumWidth
    },
    createTiles() {
      const ts = []
      const tileNum = this.calculateVisibleTilesNumber()
      for (let i = 0; i < tileNum; i++) {
        ts.push({
          key: i,
          className: 'color-1',
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
      const currentTileNum = this.calculateVisibleTilesNumber()
      let previousTileNum

      if (this.tileStates != null) {
        previousTileNum = this.tileStates.length
      } else {
        previousTileNum = 0
      }

      const diff = currentTileNum - previousTileNum

      // update the num of tile only difference previous and current
      if (diff > 0) {
        for (let i = 0; i < diff; i++) {
          this.tileStates.push({
            key: previousTileNum + i,
            className: 'color-1',
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
      const tileNum = this.getTileNum()
      this.interval = setInterval(() => {
        for (let a = 0; a < Math.ceil(tileNum / 20); a++) {
          i = Math.floor(Math.random() * tileNum)
          c = Math.floor(Math.random() * 9)
          this.tileStates[i].className = 'color-' + c
        }
      }, 100)
    },
    getTileNum() {
      if (this.tileStates != null) {
        return this.tileStates.length
      }
      return 0
    },
  },
}
</script>
<style lang="scss">
@import '~/assets/styles/scss/main.scss';

#tiles-container {
  z-index: -1;
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
    background-color: #a8a9ad;
    opacity: 0;
    transition: opacity 500ms linear,
      background-color $color-scheme-transition-time ease;

    @include smaller-than(700px) {
      border-radius: 0.85rem;
    }

    @include dark-mode {
      background-color: #707174;
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
