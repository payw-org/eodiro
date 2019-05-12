<template>
  <div class="content-item select-building">
    <div class="building-container">
      <div
        v-for="(building, i) in buildings"
        :key="i"
        class="building"
        :class="'gradient--' + (i % 15 + 1)"
      >
        <!-- <img class="building-image" :src="bgImg(building.name.number)" alt=""> -->
        <!-- <div class="gradient-overlap"></div> -->
        <router-link :to="'./' + building.name.number" append>
          <div class="building-info">
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
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Content from 'Components/Content.vue'
import Stagger from 'Modules/Stagger'

export default {
  name: 'building',
  extends: Content,
  data() {
    return {
      buildings: [
        {
          name: {
            number: 2010,
            text: '이천영신관'
          },
          emptyRoomCount: 10
        },
        {
          name: {
            number: 1010,
            text: '천영신관'
          },
          emptyRoomCount: 10
        },
        {
          name: {
            number: 2010,
            text: '이천영신관'
          },
          emptyRoomCount: 10
        },
        {
          name: {
            number: 1010,
            text: '천영신관'
          },
          emptyRoomCount: 10
        },
        {
          name: {
            number: 2010,
            text: '이천영신관'
          },
          emptyRoomCount: 10
        },
        {
          name: {
            number: 1010,
            text: '천영신관'
          },
          emptyRoomCount: 10
        },
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
  },
  methods: {
    bgImg(buildingID) {
      return '/assets/images/university/cau/' + buildingID + '.png'
    },
    buildIn() {
      let buildings = this.$el.querySelectorAll('.building')
      Stagger.animate(buildings)
    }
  },
  mounted() {
  },
  activated() {
  }
}
</script>

<style lang="scss">
@import 'SCSS/global-variables.scss';
@import 'SCSS/global-mixins.scss';

.building-container {
  display: grid;
  grid-gap: 3rem 2.5rem;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  width: calc(100% - 6rem);
  max-width: 80rem;
  margin: auto;
  padding-bottom: 3rem;

  @include smaller-than($mobile-width-threshold) {
    grid-gap: 1.5rem;
    width: calc(100% - 2rem);
  }

  .building {
    cursor: pointer;
    position: relative;
    border-radius: 1rem;
    overflow: hidden;
    opacity: 0;
    transform: translateY($stagger-gap);
    will-change: transform, opacity;
    box-shadow: $eodiro-shadow;
    text-align: right;

    @include dark-mode() {
      box-shadow: $eodiro-shadow, $dark-mode-border-shadow;

      @include smaller-than($mobile-width-threshold) {
        box-shadow: $dark-mode-border-shadow;
      }
    }

    &.appear {
      animation: $spring-time springFadeUp linear;
      animation-fill-mode: both;
    }

    .building-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: -2;
    }

    .gradient-overlap {
      // display: none;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 1;
      z-index: -1;
    }

    .building-info {
      padding: 1rem;
      z-index: 2;

      .building-name {
        color: $base-white;
        font-weight: 700;
        transition: background-color 300ms ease;
      
        .name--number, .name--text {
          display: block;
        }
      
        .name--number {
          font-size: 3.5rem;
          font-weight: 700;
          font-family: $font-display;
          line-height: 1;
        }
      
        .name--text {
          font-size: 1.3rem;
          font-weight: 500;
          line-height: 1.2;
          margin-top: 0.1rem;
          opacity: 0.9;
        }
      }
      
      .brief-summary {
        margin-top: 1rem;
        text-align: right;
      
        .wrapper {
          display: inline-block;
          font-family: $font-text;
          font-size: 1rem;
          font-weight: 500;
          color: #fff;
          background-color: rgba(#000, 0.1);
          padding: 0.5rem 0.7rem;
          border-radius: 0.5rem;
        }
      }
    }
  }
}
</style>
