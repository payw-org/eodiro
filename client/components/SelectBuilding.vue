<template>
  <div class="content-item select-building">
    <div class="building-container">
      <div class="building" v-for="(building, index) in buildings" :key="index">
        <router-link :to="'./' + building.name.number" append>
          <div class="building-name">
            <div class="wrapper">
              <span class="name--number">{{ building.name.number }}</span>
              <span class="name--text">{{ building.name.text }}</span>
            </div>
          </div>
          <div class="brief-summary">
            <div class="wrapper">
              <span class="">빈 강의실 {{ building.emptyRoomCount }}</span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
  },
  watch: {
  },
  mounted() {
    let buildings = this.$el.querySelectorAll('.building')
    let data = []
    buildings.forEach(building => {
      let colorCode
      while (1) {
        colorCode = Math.floor(Math.random() * 80) + 1
        if (data[colorCode] === undefined) {
          data[colorCode] = 1
          break
        }
      }
      building.classList.add('gradient--' + colorCode)
    })
  },
  activated() {
    let buildings = this.$el.querySelectorAll('.building')
    buildings.forEach((building, index) => {
      building.classList.remove('appear')
    })
    setTimeout(() => {
      buildings.forEach(building => {
        building.classList.add('appear')
      })
    }, 50)
    
    if (this.isRightDirection) {
      window.scrollTo(0, 0)
    } else {
      window.scrollTo(0, this.scrollPos)
    }
  },
  deactivated() {
    this.scrollPos = window.scrollY
  },
  props: [
    'isRightDirection'
  ],
  data() {
    return {
      scrollPos: 0,
      buildings: [
        {
          name: {
            number: 101,
            text: '영신관'
          },
          emptyRoomCount: 10
        },
        {
          name: {
            number: 102,
            text: '약학대학 및 R&D센터'
          },
          emptyRoomCount: 5
        },
        {
          name: {
            number: 103,
            text: '파이퍼홀'
          },
          emptyRoomCount: 7
        },
        {
          name: {
            number: 104,
            text: '수림과학관'
          },
          emptyRoomCount: 9
        },
        {
          name: {
            number: 105,
            text: '제1의학관'
          },
          emptyRoomCount: 3
        },
        {
          name: {
            number: 106,
            text: '제2의학관'
          },
          emptyRoomCount: 0
        },
        {
          name: {
            number: 107,
            text: '학생회관'
          },
          emptyRoomCount: 12
        },
        {
          name: {
            number: 201,
            text: '본관'
          },
          emptyRoomCount: 4
        },
        {
          name: {
            number: 203,
            text: '서라벌호'
          },
          emptyRoomCount: 20
        },
        {
          name: {
            number: 207,
            text: '봅스트홀'
          },
          emptyRoomCount: 100
        },
        {
          name: {
            number: 208,
            text: '제2공학관'
          },
          emptyRoomCount: 1
        },
        {
          name: {
            number: 209,
            text: '창업보육관'
          },
          emptyRoomCount: 2
        },
        {
          name: {
            number: 301,
            text: '중앙문화예술관'
          },
          emptyRoomCount: 20
        },
        {
          name: {
            number: 303,
            text: '법학관'
          },
          emptyRoomCount: 25
        },
        {
          name: {
            number: 310,
            text: '100주년기념관'
          },
          emptyRoomCount: 3000
        }
      ]
    }
  }
}
</script>

<style lang="scss">
@import 'SCSS/global-variables.scss';
@import 'SCSS/global-mixins.scss';
@import 'SCSS/gradients.scss';

$width-threshold: 500px;

.building-container {
  display: grid;
  grid-gap: 3rem 2.5rem;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  width: calc(100% - 6rem);
  max-width: 80rem;
  margin: auto;
  padding-bottom: 10rem;

  @include smaller-than($width-threshold) {
    grid-gap: 0.5rem;
    width: 100%;
  }

  .building {
    cursor: pointer;
    position: relative;
    background-color: transparent;
    border-radius: 1rem;
    overflow: hidden;
    opacity: 0;
    padding: 1rem;
    transform: translateY(10rem);
    will-change: transform, opacity;
    box-shadow: 0 5px 10px rgba(0,0,0,0.2);
    box-shadow: $eodiro-shadow;
    text-align: right;

    @include smaller-than($width-threshold) {
      border-radius: 0;
      box-shadow: none;
    }

    &.appear {
      opacity: 1;
      transform: translateY(0);
      transition: transform 1000ms $eodiro-cb, opacity 1000ms $eodiro-cb;
    }

    @for $i from 0 through 50 {
      &:nth-child(#{$i}) {
        transition-delay: unquote(($i/15) + 's');
      }
    }

    &:active {
      @include smaller-than($width-threshold) {
        transform: none;
      }
    }

    // &::before {
    //   content: '';
    //   display: block;
    //   padding-top: 60%;

    //   @include smaller-than(500px) {
    //     padding-top: 35%;
    //   }
    // }

    @include dark-mode() {
      box-shadow: 0 5px 10px rgba(0,0,0,0.2), $dark-mode-border-shadow;
    }

    @include smaller-than($mobile-width-threshold) {
      text-align: center;
    }

    .building-name {
      text-shadow: 0 3px 15px rgba(0,0,0,0.15);
      color: $base-white;
      font-weight: 700;
      font-size: 1.5rem;
      transition: background-color 300ms ease;

      .name--number, .name--text {
        display: block;
      }

      .name--number {
        font-size: 3rem;
        line-height: 1;
        font-family: $font-display;
      }

      .name--text {
        font-size: 1.2rem;
        font-weight: 500;
        line-height: 1.2;
        margin-top: 0.1rem;
      }
    }

    .brief-summary {
      margin-top: 1rem;
      text-align: right;

      @include smaller-than($mobile-width-threshold) {
        text-align: center;
      }

      .wrapper {
        display: inline-block;
        font-family: $font-text;
        font-size: 0.9rem;
        font-weight: 500;
        color: #fff;
        background-color: rgba(#000, 0.15);
        padding: 0.5rem 0.7rem;
        border-radius: 0.5rem;
      }
    }
  }
}
</style>
