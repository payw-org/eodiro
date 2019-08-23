<template>
  <div class="select-building">
    <Grid>
      <nuxt-link
        v-for="building in buildings"
        :key="building.name + building.number"
        :to="localePath({
          name: 'vacant-buildingId',
          params: {
            buildingId: building.number
          }
        })"
      >
        <ArrowBlock class="building-item">
          <template v-slot:content>
            <div class="building-info-container">
              <div class="name-info">
                <h1 class="building-number">
                  {{ building.number }}
                </h1>
                <h2 class="building-name">
                  {{ building.name }}
                </h2>
              </div>

              <div class="brief-summary">
                <div class="empty-count-badge" :class="{ loaded: isEmptyLoaded }">
                  <span
                    class="label"
                    :class="{ opaque: !isEmptyLoaded }"
                  >{{ building.empty_classroom }}</span>
                </div>
              </div>
            </div>
          </template>
        </ArrowBlock>
      </nuxt-link>

      <loading v-if="buildings.length === 0" />
    </Grid>
  </div>
</template>

<script>
import axios from 'axios'
import pageBase from '~/mixins/page-base'
import Loading from '~/components/ui/Loading.vue'
import ApiUrl from '~/plugins/ApiUrl'
import EodiroStorage from '~/plugins/EodiroStorage'
import { Grid, ArrowBlock } from '~/components/ui'
import Dialog from '~/plugins/eodiro-dialog'

export default {
  name: 'vacant-building',
  components: { Loading, Grid, ArrowBlock },
  mixins: [pageBase],
  data() {
    return {
      buildings: [],
      isEmptyLoaded: false,
      univVendor: this.$route.params.univVendor
    }
  },
  computed: {
    computedBuildings() {
      const storage = new EodiroStorage(this.univVendor)
      const favoriteList = storage.getFavoriteBuildings()
      const newBuildings = this.buildings.map((b) => {
        b.isFavorite = false
        if (favoriteList.includes(b.number)) {
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
  mounted() {
    // Fetch data
    this.fetchBuildings()
  },
  activated() {
    // this.fetchEmpty()
  },
  methods: {
    fetchBuildings() {
      const that = this
      let url = ApiUrl.get() + location.pathname
      url = 'https://api.eodiro.com/cau'
      axios
        .get(url)
        .then((response) => {
          const data = response.data
          if (data.err) {
            new Dialog().alert(that.$t('global.dataFetchError'))
            return
          }

          this.buildings = data.buildings
          this.mapFavorite()
          this.sort()

          this.fetchEmpty()
        })
        .catch(function () {
          new Dialog().alert(that.$t('global.dataFetchError'))
        })
    },
    fetchEmpty() {
      this.isEmptyLoaded = false
      const url = 'https://api.eodiro.com/cau/empty'
      axios.get(url).then((response) => {
        if (response.data.error) {
          return
        }

        this.buildings = response.data.buildings
        this.mapFavorite()
        this.sort()

        this.isEmptyLoaded = true
      })
    },
    toggleFavorite(index) {
      const buildingID = this.buildings[index].number
      const storage = new EodiroStorage(this.univVendor)
      this.buildings[index].isFavorite = storage.toggleFavoriteBuilding(
        buildingID
      )
      this.sort()
    },
    mapFavorite() {
      const storage = new EodiroStorage(this.univVendor)
      const favoriteList = storage.getFavoriteBuildings()
      this.buildings = this.buildings.map((b) => {
        b.isFavorite = false
        if (favoriteList.includes(b.number)) {
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
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/main.scss';

.select-building {
  position: relative;

  .building-item {
    .building-info-container {
      display: flex;
      justify-content: space-between;

      .name-info {
        .building-number {
          font-weight: 700;
          font-size: 2.5rem;
          line-height: 1;
        }

        .building-name {
          font-weight: 500;
          font-size: 1rem;
          margin-top: 0.5rem;
          line-height: 1.2;
          color: $base-gray;
        }
      }

      .brief-summary {
        margin-left: 0.5rem;
        padding-left: 0.5rem;
        border-left: 1px solid;
        @include separator;
        display: inline-block;
        text-align: right;
        align-self: center;
      }
    }
  }
}
</style>
