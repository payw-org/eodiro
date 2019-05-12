<template>
  <div class="content-item select-floor" @scroll="$emit('update-nav-view')">
    <div class="floor-container">
      <!-- <div class="floor-wrapper building-display">
        <div class="floor building-id">
          <h1 class="manifesto">{{ buildingName }}</h1>
        </div>
      </div> -->
      <div
        class="floor-wrapper"
        :class="{appear: floor.appear}"
        v-for="(floor, i) in floors"
        :key="i"
      >
        <router-link class="link" :to="'./' + (10 - i + 1)" append>
          <div class="floor" :class="['gradient--' + floor.level]">
            <button class="rooms-count">{{ floor.emptyRoomCount }}</button>
            <h1 class="num">{{ 10 - i + 1 + 'F' }}</h1>
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
    }
  },
  created() {
    let fetchedFloors = []
    for (let i = 0; i < 20; i++) {
      fetchedFloors.push({
        num: i + 1,
        emptyRoomCount: i + 1,
        level: i % 15 + 1,
        appear: false
      })
    }

    this.floors = fetchedFloors
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

      .rooms-count {
        min-width: 2rem;
        min-height: 2rem;
        text-align: center;
        font-family: $font-text;
        font-size: 1rem;
        color: $base-white;
        font-weight: 500;
        background-color: rgba(#000, 0.2);
        border-radius: 50px;
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
