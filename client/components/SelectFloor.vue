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
        <div class="floor">
          <router-link class="link" :to="'./' + (10 - index + 1)" append></router-link>
          <h1 class="num">{{ 10 - index + 1 + '층' }}</h1>
          <div class="rooms-count">빈 강의실 3</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Content from 'Components/Content.vue'

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
      floorWrappers.forEach((floor, index) => {
        floor.classList.remove('appear')
      })
      
      let i = 0
      let interval = window.setInterval(() => {
        floorWrappers[i++].classList.add('appear')
        if (i === floorWrappers.length) {
          window.clearInterval(interval)
        }
      }, 50)
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
  padding-bottom: 10rem;

  .floor-wrapper {
    position: relative;
    width: 100%;
    transform: translateY(10rem);
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
      flex-wrap: wrap;
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
        }
      }

      .num {
        font-size: 1.5rem;
      }

      .rooms-count {
        min-width: 100%;
        text-align: center;
        font-family: $font-text;
        font-size: 0.9rem;
        margin-top: 0.2rem;
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
