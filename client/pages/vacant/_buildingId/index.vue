<template>
  <div class="content-item select-floor" @scroll="$emit('update-nav-view')">
    <div class="floor-container">
      <div class="floor-wrapper building-id">{{ $route.params.buildingId }}</div>
      <div
        v-for="(floor, i) in floors"
        :key="floor.number"
        class="floor-wrapper"
        :class="[{appear: floor.appear}]"
      >
        <nuxt-link class="link" :to="`${floor.number}`" append>
          <div class="floor" :class="['gradient--' + (i%15 + 1)]">
            <button class="empty-count-badge" :class="{loaded: isEmptyLoaded}">
              <span class="label" :class="{opaque: !isEmptyLoaded}">
                {{ floor.empty_classroom }}
                <span class="total">/ {{ floor.total_classroom }}</span>
              </span>
            </button>
            <h1 class="num">{{ floor.number }}F</h1>
          </div>
        </nuxt-link>
      </div>
      <Loading v-if="floors.length === 0" />
    </div>
  </div>
</template>

<script>
import Content from '~/components/Content'
import Loading from '~/components/Loading'
import Stagger from '~/plugins/Stagger'
import ApiUrl from '~/plugins/ApiUrl'
import axios from 'axios'

export default {
  name: 'floor',
  extends: Content,
  components: { Loading },
  data() {
    return {
      buildingName: '',
      floors: [],
      isEmptyLoaded: false
    }
  },
  methods: {
    buildIn() {
      Stagger.show(this.$el.querySelectorAll('.floor-wrapper'), false)
    },
    buildOut() {
      Stagger.hide(this.$el.querySelectorAll('.floor-wrapper'))
    },
    fetchFloors() {
      // setTimeout(() => {
      let url = `https://api.eodiro.com/cau/${this.$route.params.buildingId}`

      axios
        .get(url)
        .then(r => {
          if (r.data.err) {
            alert('데이터를 가져올 수 없습니다. 잠시 후 이용 바랍니다.')
            return
          }

          this.floors = r.data.floors
          this.fetchEmpty()

          this.$nextTick(() => {
            this.buildIn()
          })
        })
        .catch(function(error) {
          alert('데이터를 가져올 수 없습니다. 잠시 후 이용 바랍니다.')
        })
      // }, 4000);
    },
    fetchEmpty() {
      this.isEmptyLoaded = false

      let url = `https://api.eodiro.com/cau/${this.$route.params.buildingId}/empty`

      axios.get(url).then(r => {
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
  activated() {
    this.fetchEmpty()
  },
  mounted() {
    this.buildingName = this.$route.params.buildingID
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/global-variables.scss';
@import '~/assets/styles/scss/global-mixins.scss';
@import '~/assets/styles/scss/gradients-simple.scss';

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

    &.building-id {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      font-weight: 500;
      padding: 1rem;
      color: $base-white;
      @include bgGradient($base-black);
      border-radius: 1rem;
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
