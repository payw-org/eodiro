<template>
  <div class="select-floor">
    <h1 class="building-id">
      {{ buildingId }}
    </h1>

    <Grid class="floor-container">
      <ArrowBlock
        v-for="floor in floors"
        :key="floor.number"
        class="floor-item"
        :link="
          localePath({
            name: 'vacant-buildingId-floorId',
            params: {
              floorId: floor.number.toLowerCase(),
            },
          })
        "
        @click="showTopbar()"
      >
        <template v-slot:content>
          <div class="floor-info-container">
            <h1 class="floor-info">
              <span class="number">{{ floor.number }}</span>
              <span class="unit">{{ $t('vacant.floorUnit') }}</span>
            </h1>

            <div class="empty-count-badge-wrapper">
              <div class="empty-count-badge">
                <span class="label">
                  {{ floor.empty }}
                  <span class="total">/ {{ floor.total }}</span>
                </span>
              </div>
            </div>
          </div>
        </template>
      </ArrowBlock>
    </Grid>
  </div>
</template>

<script>
import axios from 'axios'
import pageBase from '~/mixins/page-base'
import { Grid, ArrowBlock } from '~/components/ui'

export default {
  name: 'vacant-floor',
  components: { Grid, ArrowBlock },
  mixins: [pageBase],
  asyncData({ app, route, redirect }) {
    const campus = 'seoul'
    const url = `https://api.eodiro.com/v2/campuses/${campus}/vacant/buildings/${route.params.buildingId}/floors`

    return axios(url, {
      method: 'get',
    })
      .then((res) => {
        return {
          floors: res.data.floors,
        }
      })
      .catch(() => {
        redirect(app.localePath('not-found'))
      })
  },
  data() {
    return {
      buildingName: '',
      floors: [],
      buildingId: this.$route.params.buildingId,
    }
  },
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/main.scss';

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
          display: flex;

          .number {
            font-weight: 700;
            font-size: 2.5rem;
            line-height: 1;
            vertical-align: text-bottom;
          }

          .unit {
            align-self: flex-end;
            line-height: 1.5;
            font-weight: 500;
            font-size: 1.2rem;
            color: $base-gray;
            margin-left: 0.2rem;
          }
        }

        .empty-count-badge-wrapper {
          padding-left: 0.5rem;
          margin-left: 0.5rem;
          border-left: 1px solid;
          @include separator;
          align-self: center;
        }
      }
    }
  }
}
</style>
