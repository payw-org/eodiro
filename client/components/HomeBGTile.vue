<template>
  <div id="home-bg-tile">
    <div v-for="tileState in tileStates" :class="'tile ' + tileState.className" :key="tileState.key"></div>
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
    createTiles() {
      let ts = []
      let tileNum = 550
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
        for (let a = 0; a < Math.ceil(tileNum/20); a++) {
          i = Math.floor(Math.random() * tileNum);
          c = Math.floor(Math.random() * 9)
          this.tileStates[i]['className'] = 'color-' + c;
        }
      }, 100)
    },
    calculateVisibleTilesNumber() {
      let tiles = this.$el.querySelectorAll('.tile')
      let i = 0
      for (; i < tiles.length; i++) {
        let rect = tiles[i].getBoundingClientRect()
        if (
          (rect.top < 0 && rect.bottom < 0) ||
          (rect.top > window.innerHeight && rect.bottom > window.innerHeight)
        ) {
          break;
        }
      }
      return i
    }
  },
  mounted() {
    this.createTiles()
    window.addEventListener('resize', this.resizeEvent = () => {
      window.clearInterval(this.interval)
      this.activateAnimation()
    })
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
    border-radius: 1rem;
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
