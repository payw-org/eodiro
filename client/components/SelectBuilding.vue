<template>
  <div class="content-item select-building">
    <div class="building-container">
      <div
        v-for="(building, i) in buildings"
        :key="i"
        class="building"
        :class="['gradient--' + building.level, {appear: building.appear}]"
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
              <button class="wrapper">
                <span class="">{{ building.emptyRoomCount }}</span>
              </button>
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
import _ from 'lodash'

export default {
  name: 'building',
  extends: Content,
  data() {
    return {
      buildings: []
    }
  },
  methods: {
    bgImg(buildingID) {
      return '/assets/images/university/cau/' + buildingID + '.png'
    },
    buildIn() {
      Stagger.animate(this.buildings)
    }
  },
  created() {
    // Fetch data
    let fetchedBuildings = []
    for (let i = 0; i < 20; i++) {
      fetchedBuildings.push({
        name: {
          number: i + 1,
          text: i + 1 +'관'
        },
        emptyRoomCount: i + 1,
        level: i % 15 + 1,
        appear: false
      })
    }
    this.buildings = fetchedBuildings
  },
  beforeMount() {
    
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
          opacity: 0.8;
        }
      }
      
      .brief-summary {
        margin-top: 1rem;
        text-align: right;
      
        .wrapper {
          display: inline-block;
          min-width: 2rem;
          height: 2rem;
          font-family: $font-text;
          font-size: 1rem;
          color: #fff;
          background-color: rgba(#000, 0.2);
          border-radius: 50px;
          padding: 0 0.5rem;

          & * {
            font-weight: 500;
          }
        }
      }
    }
  }
}
</style>
