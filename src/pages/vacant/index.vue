<template>
  <div class="select-building">
    <div class="info">
      <p>{{ $t('vacant.info') }}</p>
    </div>
    <Grid>
      <ArrowBlock
        v-for="building in buildings"
        :key="building.name + building.number"
        class="building-item"
        :link="
          localePath({
            name: 'vacant-buildingId',
            params: {
              buildingId: building.number,
            },
          })
        "
        @click="showTopbar()"
      >
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
              <div class="empty-count-badge">
                <span class="label">
                  {{ building.empty }}
                  <span class="total">/ {{ building.total }}</span>
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
  name: 'vacant-building',
  components: { Grid, ArrowBlock },
  mixins: [pageBase],
  asyncData({ app, redirect }) {
    const campus = 'seoul'
    const url = `https://api.eodiro.com/v2/campuses/${campus}/vacant/buildings`

    return axios(url, {
      method: 'get',
    })
      .then((res) => {
        return {
          buildings: res.data.buildings,
        }
      })
      .catch(() => {
        redirect(app.localePath('not-found'))
      })
  },
  data() {
    return {
      buildings: [],
    }
  },
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/main';

.select-building {
  position: relative;

  .info {
    @include block-style;
    padding: s(4);
    margin-bottom: s(5);
    min-height: unset;
    color: $base-gray;
  }

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
        border-left: solid;
        @include separator;
        display: inline-block;
        text-align: right;
        align-self: center;
      }
    }
  }
}
</style>
