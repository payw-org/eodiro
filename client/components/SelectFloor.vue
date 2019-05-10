<template>
  <div class="content-item select-floor" @scroll="$emit('update-nav-view')">
    <div class="floor-container">
      <div class="floor-wrapper building-display">
        <div class="floor building-id">
          <h1 class="manifesto">{{ buildingName }}관</h1>
        </div>
      </div>
      <div
        class="floor-wrapper"
        v-for="index in 10"
        :key="index"
      >
        <router-link class="link" :to="'./' + (10 - index + 1)" append>
          <div class="floor">
            <div class="rooms-count">빈 강의실 3</div>
            <h1 class="num">{{ 10 - index + 1 + '층' }}</h1>
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
      buildingName: ''
    }
  },
  methods: {
    buildIn() {
      let floorWrappers = this.$el.querySelectorAll('.floor-wrapper')
      Stagger.animate(floorWrappers)
    }
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
    transform: translateY($stagger-gap);
    opacity: 0;
    margin-bottom: 1.5rem;
    will-change: transform;

    &.building-display {
      position: sticky;
      top: 1rem;
      z-index: 1;
    }

    &.appear {
      opacity: 1;
      transform: translateY(0);
      transition: transform 1000ms $eodiro-cb, opacity 1000ms $eodiro-cb;
    }

    .floor {
      cursor: pointer;
      color: inherit;
      border-radius: 1rem;
      padding: 1.5rem;
      display: flex;
      align-items: center;
      background-color: #fff;
      box-shadow: $eodiro-shadow;
      will-change: transform;

      &.building-id {
        padding: 1rem;
        background-color: #554CDA;
        color: #fff;
        cursor: default;

        .manifesto {
          font-size: 1.2rem;
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
        text-align: center;
        font-family: $font-text;
        font-size: 1rem;
        font-weight: 500;
        background-color: rgba(#000, 0.05);
        padding: 0.5rem 0.7rem;
        border-radius: 0.5rem;

        @include dark-mode() {
          background-color: rgba(#fff, 0.05);
        }
      }

      @include dark-mode() {
        background-color: #3e3e3e;
        box-shadow: $eodiro-shadow, $dark-mode-border-shadow;

        &.building-id {
          padding: 1rem;
          background-color: #554CDA;
        
          .manifesto {
            font-size: 1.2rem;
          }
        }
      }
    }
  }
}
</style>
