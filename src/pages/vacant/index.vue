<template>
  <div class="select-building">
    <eodiro-block-container>
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
        <eodiro-block-item class="building-item">
          <template v-slot:content>
            <div class="building-info-container">
              <div class="name-info">
                <h1 class="building-number">{{ building.number }}</h1>
                <h2 class="building-name">{{ building.name }}</h2>
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
        </eodiro-block-item>
      </nuxt-link>

      <loading v-if="buildings.length === 0" />
    </eodiro-block-container>
  </div>
</template>

<script>
import EodiroPageBase from '~/components/EodiroPageBase.vue'
import Loading from '~/components/Loading'
import ApiUrl from '~/plugins/ApiUrl'
import EodiroStorage from '~/plugins/EodiroStorage'
import axios from 'axios'
import { EodiroBlockContainer, EodiroBlockItem } from '~/components/ui'
import Dialog from '~/plugins/eodiro-dialog'

export default {
  name: 'vacant-building',
  extends: EodiroPageBase,
  meta: {
    depth: 1
  },
  components: { Loading, EodiroBlockContainer, EodiroBlockItem },
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
    fetchBuildings() {
      const that = this
      let url = ApiUrl.get() + location.pathname
      url = 'https://api.eodiro.com/cau'
      axios
        .get(url)
        .then(response => {
          let data = response.data
          if (data.err) {
            new Dialog().alert(that.$t('global.dataFetchError'))
            return
          }

          this.buildings = data.buildings
          this.mapFavorite()
          this.sort()

          this.fetchEmpty()
        })
        .catch(function(error) {
          new Dialog().alert(that.$t('global.dataFetchError'))
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
    // this.fetchEmpty()
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/variables/all.scss';
@import '~/assets/styles/scss/global-mixins.scss';
@import '~/assets/styles/scss/eodiro-ui.scss';

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
