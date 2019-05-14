<template>
  <div class="content-item select-floor" @scroll="$emit('update-nav-view')">
    <div class="floor-container">
      <!-- <div class="floor-wrapper building-display">
        <div class="floor building-id">
          <h1 class="manifesto">{{ buildingName }}</h1>
        </div>
      </div> -->
      <div
        v-for="(floor, i) in floors"
        :key="i"
        class="floor-wrapper"
        :class="[{appear: floor.appear}, 'animation-delay--' + (i + 1)]"
      >
        <router-link class="link" :to="'./' + floor.number" append>
          <div class="floor" :class="['gradient--' + (i%15 + 1)]">
            <button class="empty-count-badge" :class="{loaded: floor.loaded}">
              <transition name="fade-slow">
                <span v-if="floor.loaded">{{ floor.empty_classroom }}</span>
              </transition>
            </button>
            <h1 class="num">{{ floor.number }}F</h1>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Content from 'Components/Content.vue'
import Stagger from 'Modules/Stagger'
import axios from 'axios'

export default {
  name: 'floor',
  extends: Content,
  data() {
    return {
      buildingName: '',
      floors: []
    }
  },
  methods: {
    buildIn() {
      Stagger.animate(this.floors)
    },
    fetchFloors() {
      axios.get('http://api.dev-jhm.eodiro.com' + location.pathname)
        .then(r => {
          if (r.data.err) {
            this.$router.push('/404')
            return
          }
          r.data.floors.map(function (f) {
            f.appear = false
          })
          this.floors = r.data.floors
          this.buildIn()
          this.fetchEmpty()
        })
    },
    fetchEmpty() {
      this.floors.forEach(f => {
        f.loaded = false
      })
      axios.get('http://api.dev-jhm.eodiro.com' + location.pathname + '/empty')
        .then(r => {
          if (r.data.err) {
            this.$router.push('/404')
            return
          }
          r.data.floors.map(function (f) {
            f.appear = true
            f.loaded = true
          })
          this.floors = r.data.floors
        })
    }
  },
  created() {
    this.fetchFloors()
  },
  activated() {
    this.fetchEmpty()
  },
  mounted() {
    this.buildingName = this.$route.params.buildingID
  }
}
</script>

<style lang="scss">
@import 'SCSS/global-variables.scss';
@import 'SCSS/global-mixins.scss';

.floor-container {
  width: calc(100% - 2rem);
  max-width: 30rem;
  margin: auto;

  .floor-wrapper {
    position: relative;
    width: 100%;
    opacity: 0;
    margin-bottom: 1.5rem;
    will-change: transform;

    @include on-mobile() {
      margin-bottom: 1rem;
    }

    &.building-display {
      position: sticky;
      top: 1rem;
      z-index: 1;
    }

    &.appear {
      animation: $spring-time springFadeUp linear;
      animation-fill-mode: both;
    }

    .floor {
      cursor: pointer;
      color: $base-white;
      border-radius: 1rem;
      padding: 1.5rem;
      display: flex;
      align-items: center;
      background-color: #fff;
      box-shadow: $eodiro-shadow;
      will-change: transform;

      &.building-id {
        padding: 1rem;
        background-color: $base-white;
        color: $base-black-soft;
        cursor: default;

        .manifesto {
          font-size: 1.5rem;
          flex: 1;
          text-align: center;
        }
      }

      .num {
        font-family: $font-display;
        font-size: 2.5rem;
        flex: 1;
        text-align: right;
      }

      @include dark-mode() {
        background-color: #3e3e3e;
        box-shadow: $eodiro-shadow, $dark-mode-border-shadow;

        &.building-id {
          background-color: $base-black;
          color: $base-white-soft;
        }
      }
    }
  }
}
</style>
