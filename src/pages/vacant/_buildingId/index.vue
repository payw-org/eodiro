<template>
  <div class="select-floor">
    <div class="building-id">{{ $route.params.buildingId }}</div>

    <block-container class="floor-container">
      <nuxt-link
        class="floor-link"
        v-for="floor in floors"
        :key="floor.number"
        :to="localePath({
          name: 'vacant-buildingId-floorId',
          params: {
            floorId: floor.number
          }
        })"
      >
        <menu-block class="floor-item">
          <template v-slot:content>
            <div class="floor-info-container">
              <h1 class="floor-info">
                <span class="number">{{ floor.number }}</span>
                <span class="unit">{{ $t('vacant.floorUnit') }}</span>
              </h1>

              <div class="empty-count-badge-wrapper">
                <div class="empty-count-badge" :class="{loaded: isEmptyLoaded}">
                  <span class="label" :class="{opaque: !isEmptyLoaded}">{{ floor.empty_classroom }}</span>
                </div>
              </div>
            </div>
          </template>
        </menu-block>
      </nuxt-link>

      <!-- <div class="grid-dummy" v-for="i in 2" :key="'gridDummy' + i"></div> -->

      <loading v-if="floors.length === 0" />
    </block-container>
  </div>
</template>

<script>
import EodiroPageBase from '~/components/global/EodiroPageBase.vue'
import Loading from '~/components/ui/Loading.vue'
import Stagger from '~/plugins/Stagger'
import ApiUrl from '~/plugins/ApiUrl'
import axios from 'axios'
import { BlockContainer, MenuBlock } from '~/components/ui'

export default {
  name: 'vacant-floor',
  extends: EodiroPageBase,
  meta: {
    depth: 2,
    bannerMode: 'mini'
  },
  components: { Loading, BlockContainer, MenuBlock },
  data() {
    return {
      buildingName: '',
      floors: [],
      isEmptyLoaded: false
    }
  },
  methods: {
    fetchFloors() {
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
        })
        .catch(function(error) {
          alert('데이터를 가져올 수 없습니다. 잠시 후 이용 바랍니다.')
        })
    },
    fetchEmpty() {
      this.isEmptyLoaded = false

      let url = `https://api.eodiro.com/cau/${this.$route.params.buildingId}/empty`

      axios.get(url).then(r => {
        if (r.data.err) {
          alert('데이터를 가져올 수 없습니다. 잠시 후 이용 바랍니다.')
          return
        }

        this.floors = r.data.floors
        this.isEmptyLoaded = true
      })
    }
  },
  mounted() {
    this.buildingName = this.$route.params.buildingId
    this.fetchFloors()
  },
  activated() {
    // this.fetchEmpty()
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/variables/all.scss';
@import '~/assets/styles/scss/mixins/all.scss';
@import '~/assets/styles/scss/eodiro-ui.scss';

.select-floor {
  position: relative;

  .building-id {
    text-align: center;
    font-size: 3rem;
    font-weight: 700;
    color: $c-step--4;
    line-height: 1;
    padding-bottom: 2rem;
    margin-bottom: 2rem;
    border-bottom: 1px solid;
    @include separator;
  }

  .floor-container {
    position: relative;

    .floor-item {
      .floor-info-container {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .floor-info {
          .number {
            font-weight: 700;
            font-size: 2.5rem;
            line-height: 1;
            vertical-align: text-bottom;
          }

          .unit {
            line-height: 1.43;
            font-weight: 500;
            font-size: 1.2rem;
            color: $base-gray;
            vertical-align: text-bottom;
          }
        }

        .empty-count-badge-wrapper {
          padding-left: 0.5rem;
          margin-left: 0.5rem;
          border-left: 1px solid;
          @include separator;
          align-self: center;

          .empty-count-badge {
          }
        }
      }
    }
  }
}
</style>
