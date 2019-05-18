<template>
  <div class="content-item select-floor" @scroll="$emit('update-nav-view')">
    <div class="floor-container">
      <div
        v-for="(floor, i) in floors"
        :key="floor.number"
        class="floor-wrapper"
        :class="[{appear: floor.appear}]"
      >
        <router-link class="link" :to="'./' + floor.number" append>
          <div class="floor" :class="['gradient--' + (i%15 + 1)]">
            <button class="empty-count-badge" :class="{loaded: isEmptyLoaded}">
              <span class="label" :class="{opaque: !isEmptyLoaded}">{{ floor.empty_classroom }}</span>
            </button>
            <h1 class="num">{{ floor.number }}F</h1>
          </div>
        </router-link>
      </div>
      <Loading v-if="floors.length === 0" />
    </div>
  </div>
</template>

<script>
import Content from 'Components/Content'
import Loading from 'Components/Loading'
import Stagger from 'Modules/Stagger'
import ApiUrl from 'Modules/ApiUrl'
import axios from 'axios'

export default {
  name: 'floor',
  extends: Content,
  components: {Loading},
  data() {
    return {
      buildingName: '',
      floors: [],
      isEmptyLoaded: false
    }
  },
  methods: {
    buildIn() {
      Stagger.show(this.$el.querySelectorAll('.floor-wrapper'))
    },
    buildOut() {
      Stagger.hide(this.$el.querySelectorAll('.floor-wrapper'))
    },
    fetchFloors() {
      // setTimeout(() => {
        axios.get(ApiUrl.get() + location.pathname)
          .then(r => {
            if (r.data.err) {
              this.$router.push('/404')
              return
            }
        
            this.floors = r.data.floors
            this.buildIn()
            this.fetchEmpty()
          })
      // }, 4000);
      
    },
    fetchEmpty() {
      this.isEmptyLoaded = false

      axios.get(ApiUrl.get() + location.pathname + '/empty')
        .then(r => {
          if (r.data.err) {
            this.$router.push('/404')
            return
          }

          this.floors = r.data.floors
          this.isEmptyLoaded = true
        })
    }
  },
  created() {
    this.fetchFloors()
  },
  updated() {
    this.buildIn()
  },
  activated() {
    this.buildOut()
    this.buildIn()
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
  position: relative;
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
