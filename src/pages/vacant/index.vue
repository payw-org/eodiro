<template>
  <div class="content-item select-building">
    <div class="building-container">
      <div class="building-wrapper" v-for="(building, i) in buildings" :key="i">
        <!-- building block -->
        <div class="building" :class="['gradient--' + (i % 15 + 1)]">
          <!-- favorite button -->
          <button
            class="favorite"
            :class="{marked: building.isFavorite}"
            @click="toggleFavorite(i)"
          ></button>
          <nuxt-link :to="`${building.number}`" append>
            <div class="building-info">
              <div class="building-name">
                <div class="wrapper">
                  <span class="name--number">{{ building.number }}</span>
                  <span
                    class="name--text"
                    v-if="building.number !== building.name"
                  >{{ building.name }}</span>
                </div>
              </div>
              <div class="brief-summary">
                <button class="empty-count-badge" :class="{loaded: isEmptyLoaded}">
                  <span class="label" :class="{opaque: !isEmptyLoaded}">
                    {{ building.empty_classroom }}
                    <span
                      class="total"
                    >/ {{ building.total_classroom }}</span>
                  </span>
                </button>
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>
      <Loading v-if="buildings.length === 0" />
    </div>
  </div>
</template>

<script>
import EodiroPageBase from '~/components/EodiroPageBase.vue'
import Loading from '~/components/Loading'
import Stagger from '~/plugins/Stagger'
import ApiUrl from '~/plugins/ApiUrl'
import EodiroStorage from '~/plugins/EodiroStorage'
import axios from 'axios'

export default {
  name: 'vacant-building',
  extends: EodiroPageBase,
  meta: {
    depth: 1
  },
  components: { Loading },
  data() {
    return {
      buildings: [],
      isEmptyLoaded: false,
      univVendor: this.$route.params.univVendor
    }
  },
  computed: {
    computedBuildings() {
      let storage = new EodiroStorage(this.univVendor)
      let favoriteList = storage.getFavoriteBuildings()
      let newBuildings = this.buildings.map(b => {
        b.isFavorite = false
        if (favoriteList.indexOf(b.number) !== -1) {
          b.isFavorite = true
        }
        return b
      })

      newBuildings.sort((a, b) => {
        if (a.isFavorite === b.isFavorite) {
          return 0
        } else if (a.isFavorite) {
          return -1
        } else {
          return 1
        }
      })

      return newBuildings
    }
  },
  methods: {
    buildIn() {
      Stagger.show(this.$el.querySelectorAll('.building'), true)
    },
    buildOut() {
      Stagger.hide(this.$el.querySelectorAll('.building'))
    },
    fetchBuildings() {
      let url = ApiUrl.get() + location.pathname
      url = 'https://api.eodiro.com/cau'
      axios
        .get(url)
        .then(response => {
          let data = response.data
          if (data.err) {
            alert('데이터를 가져올 수 없습니다. 잠시 후 이용 바랍니다.')
            return
          }

          this.buildings = data.buildings
          this.mapFavorite()
          this.sort()

          this.fetchEmpty()

          this.$nextTick(() => {
            this.buildIn()
          })
        })
        .catch(function(error) {
          alert('데이터를 가져올 수 없습니다. 잠시 후 이용 바랍니다.')
        })
    },
    fetchEmpty() {
      this.isEmptyLoaded = false
      let url = 'https://api.eodiro.com/cau/empty'
      axios.get(url).then(response => {
        if (response.data.error) return

        this.buildings = response.data.buildings
        this.mapFavorite()
        this.sort()

        this.isEmptyLoaded = true
      })
    },
    toggleFavorite(index) {
      let buildingID = this.buildings[index].number
      let storage = new EodiroStorage(this.univVendor)
      this.buildings[index].isFavorite = storage.toggleFavoriteBuilding(
        buildingID
      )
      this.sort()
    },
    mapFavorite() {
      let storage = new EodiroStorage(this.univVendor)
      let favoriteList = storage.getFavoriteBuildings()
      this.buildings = this.buildings.map(b => {
        b.isFavorite = false
        if (favoriteList.indexOf(b.number) !== -1) {
          b.isFavorite = true
        }
        return b
      })
    },
    sort() {
      this.buildings.sort((a, b) => {
        if (a.isFavorite === b.isFavorite) {
          return a.number.localeCompare(b.number)
        } else if (a.isFavorite) {
          return -1
        } else {
          return 1
        }
      })
    }
  },
  mounted() {
    // Fetch data
    this.fetchBuildings()
  },
  activated() {
    this.fetchEmpty()
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/global-variables.scss';
@import '~/assets/styles/scss/global-mixins.scss';

.building-container {
  position: relative;
  display: grid;
  grid-gap: 3rem 2.5rem;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  width: calc(100% - 6rem);
  max-width: 80rem;
  margin: auto;

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
    text-align: right;

    @include dark-mode() {
      box-shadow: $eodiro-shadow, $dark-mode-border-shadow;

      @include smaller-than($mobile-width-threshold) {
        box-shadow: $dark-mode-border-shadow;
      }
    }

    .favorite {
      position: absolute;
      left: 1rem;
      top: 1rem;
      opacity: 0.2;
      $size: 2rem;
      width: $size;
      height: $size;
      @include bgImg('~assets/images/eodiro/star_gray.svg', 'center', '1.5rem');

      &.marked {
        opacity: 0.6;
      }
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

        .name--number,
        .name--text {
          display: block;
        }

        .name--number {
          padding-left: 2rem;
          font-size: 3rem;
          font-weight: 700;
          font-family: $font-display;
          line-height: 1;
          word-break: break-word;
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
