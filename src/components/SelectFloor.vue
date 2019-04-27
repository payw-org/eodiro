<template>
  <div class="content-item select-floor" @scroll="$emit('update-nav-view')">
    <div class="floor-container">
      <div class="floor-wrapper">
        <div class="floor building-id">
          <h1 class="manifesto">{{ $route.params.buildingID }}관의 층은 다음과 같습니다.</h1>
        </div>
      </div>
      <div
        class="floor-wrapper"
        v-for="index in 10"
        :key="index"
      >
        <div class="floor">
          <router-link class="link" :to="'./' + (10 - index + 1)" append></router-link>
          <h1 class="num">{{ 10 - index + 1 + '층' }}</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scrollPos: 0,
      interval: undefined
    }
  },
  props: [
    'isRightDirection'
  ],
  watch: {
  },
  methods: {
    checkScroll(floors) {
      let baseOffset = parseFloat(window.getComputedStyle(this.$el, null).getPropertyValue('padding-top'))
      floors.forEach((floor, index) => {
        let offset = floor.parentElement.getBoundingClientRect().top
        let opacity = offset/baseOffset
        if (opacity <= 0) opacity = 0
        if (opacity >= 1) opacity = 1
        let y = (baseOffset - offset)/1.5
        if (y <= 0) y = 0
        let scale = (opacity+2)/3
        floor.style.opacity = opacity
        floor.style.transform = 'translateY(' + y + 'px) scale(' + scale + ')'
        floor.style.webkitTransform = 'translateY(' + y + 'px) scale(' + scale + ')'
        floor.style.filter = 'blur(' + (1 - opacity) * 15 + 'px)'
        floor.style.webkitFilter = 'blur(' + (1 - opacity) * 15 + 'px)'
      })
    }
  },
  mounted() {
    let floors = this.$el.querySelectorAll('.floor')
    let baseOffset = this.$el.querySelector('.floor-container').getBoundingClientRect().top
    baseOffset = document.querySelector('#app-navigation').clientHeight
    window.addEventListener('scroll', e => {
      this.checkScroll(floors)
    })

    let floorsWrapper = this.$el.querySelectorAll('.floor-wrapper')
    floorsWrapper[floorsWrapper.length - 1].addEventListener('transitionend', e => {
      if (e.propertyName === 'opacity') {
        window.clearInterval(this.interval)
      }
    })
  },
  activated() {
    let floors = this.$el.querySelectorAll('.floor')
    let floorWrappers = this.$el.querySelectorAll('.floor-wrapper')
    floorWrappers.forEach((floor, index) => {
      floor.classList.remove('appear')
    })
    setTimeout(() => {
      floorWrappers.forEach(floor => {
        floor.classList.add('appear')
      })
    }, 4)

    if (this.isRightDirection) {
      window.scrollTo(0, 0)
    } else {
      window.scrollTo(0, this.scrollPos)
    }
    this.interval = window.setInterval(() => {
      this.checkScroll(floors)
    }, 4)
  },
  deactivated() {
    this.scrollPos = window.scrollY
    window.clearInterval(this.interval)
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
  padding-bottom: 60vh;

  .floor-wrapper {
    position: relative;
    width: 100%;
    transition: all 200ms ease;
    transform: translateY(10rem);
    opacity: 0;
    margin-bottom: 1.5rem;
    will-change: transform;

    &.appear {
      opacity: 1;
      transform: translateY(0);
      transition: all 1000ms $eodiro-cb;

      &.done {
        transition-delay: 0s !important;
      }
    }

    @for $i from 0 through 50 {
      &:nth-child(#{$i}) {
        transition-delay: unquote(($i/15) + 's');
      }
    }

    .link {
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
    }

    .floor {
      cursor: pointer;
      color: inherit;
      border-radius: 1rem;
      padding: 2rem 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      box-shadow: 0 1rem 2rem rgba(0,0,0,0.15);
      will-change: transform;
      // transition: all 400ms cubic-bezier(0.18, 0.96, 0.43, 1);
      // transition: all 400ms cubic-bezier(0.08, 0.92, 0.34, 1);

      .num {
        font-size: 1.5rem;
      }

      &.building-id {
        padding: 1rem;
        background-color: #744be6;
        color: #fff;
        cursor: default;

        .manifesto {
          font-size: 1.2rem;
        }
      }

      @include dark-mode() {
        background-color: #3e3e3e;
        box-shadow: 0 1rem 2rem rgba(0,0,0,0.3), $dark-mode-border-shadow;

        &.building-id {
          padding: 1rem;
          background-color: #744be6;
          color: #fff;
          cursor: default;
        
          .manifesto {
            font-size: 1.2rem;
          }
        }
      }
    }
  }
}
</style>
