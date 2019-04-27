<template>
  <div class="content-item select-floor" @scroll="$emit('update-nav-view')">
    <div class="floor-container">
      <div
        class="floor"
        v-for="index in 10"
        :key="index"
      >
        <h1 class="num">{{ 10 - index + 1 + '층' }}</h1>
        <router-link class="link" :to="'./' + (10 - index + 1)" append></router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scrollPos: 0
    }
  },
  props: [
    'isRightDirection'
  ],
  watch: {
  },
  mounted() {

  },
  activated() {
    let floors = this.$el.querySelectorAll('.floor')
    floors.forEach((floor, index) => {
      floor.classList.remove('appear')
    })
    setTimeout(() => {
      floors.forEach(floor => {
        floor.classList.add('appear')
      })
    }, 0)

    if (this.isRightDirection) {
      window.scrollTo(0, 0)
    } else {
      window.scrollTo(0, this.scrollPos)
    }
  },
  deactivated() {
    this.scrollPos = window.scrollY
  }
}
</script>

<style lang="scss">
@import '../scss/global-variables.scss';
@import '../scss/global-mixins.scss';

.floor-container {
  width: calc(90% - 2rem);
  max-width: 30rem;
  margin: auto;
  padding-bottom: 10rem;

  .floor {
    cursor: pointer;
    padding: 1.5rem 0;
    position: relative;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 1.2rem 2rem rgba(0,0,0,0.1);
    color: inherit;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 200ms ease;
    transform: translateY(10rem);
    opacity: 0;
    margin-bottom: 1.5rem;
    will-change: transform;

    &.appear {
      opacity: 1;
      transform: translateY(0);
      transition: all 1000ms $eodiro-cb;
    }

    @for $i from 0 through 50 {
      &:nth-child(#{$i}) {
        transition-delay: unquote(($i/15) + 's');
      }
    }

    .num {
      font-size: 1.5rem;
    }

    .link {
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
    }

    @include dark-mode() {
      background-color: #3e3e3e;
      box-shadow: 0 1.2rem 2rem rgba(0,0,0,0.3), $dark-mode-border-shadow;
    }
  }
}
</style>
