<template>
  <div class="content-item select-building">
    <div class="building-container">
      <div
        class="building-wrapper"
        v-for="(building, i) in buildings"
        :key="i"
      >
        <div
          class="building"
          :class="['gradient--' + (i % 15 + 1), {appear: building.appear}, 'animation-delay--' + (i + 1)]"
        >
          <router-link :to="'./' + building.number" append>
            <div class="building-info">
              <div class="building-name">
                <div class="wrapper">
                  <span class="name--number">{{ building.number }}</span>
                  <span class="name--text">{{ building.name }}</span>
                </div>
              </div>
              <div class="brief-summary">
                <button class="empty-count-badge" :class="{loaded: building.loaded}">
                  <span class="label" :class="{opaque: !building.loaded}">{{ building.empty_classroom }}</span>
                </button>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Content from 'Components/Content.vue'
import Stagger from 'Modules/Stagger'
import axios from 'axios'

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
    },
    fetchBuildings() {
      axios.get('http://api.dev-jhm.eodiro.com' + location.pathname)
        .then(response => {
          let data = response.data
          if (data.err) {
            this.$router.push('/404')
            return
          }

          this.buildings = data.buildings
          this.buildIn()
          this.fetchEmpty()
        })
        .catch(function (error) {
          alert('어디로 서버 오류로 건물을 가져올 수 없습니다. 잠시 후 이용바랍니다.')
        })
    },
    fetchEmpty() {
      this.buildings.forEach(b => {
        b.loaded = false
      })
      axios.get('http://api.dev-jhm.eodiro.com' + location.pathname +'/empty')
        .then(response => {
          if (response.data.error) return
          response.data.buildings.map(function (b) {
            b.appear = true
            b.loaded = true
          })
          this.buildings = response.data.buildings
        })
    }
  },
  created() {
    // Fetch data
    this.fetchBuildings()
  },
  activated() {
    this.fetchEmpty()
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
    grid-gap: 1rem;
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
      }
    }
  }
}
</style>
