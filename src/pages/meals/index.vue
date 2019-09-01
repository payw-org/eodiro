<template>
  <div class="meals-home">
    <div class="date-picker">
      <button class="prev">
        {{ $t('global.nav.prev') }}
      </button>
      <button class="today">
        {{ $t('global.time.today') }}
      </button>
      <button class="next">
        {{ $t('global.nav.next') }}
      </button>
    </div>

    <section class="meal-time-group">
      <h1 class="meal-time-name">
        {{ $t('meals.breakfast') }}
      </h1>
      <Grid class="restaurant-container">
        <Accordion class="restaurant-item">
          <template v-slot:face>
            <h2 class="restaurant-name">
              참슬기식당(310관 B4층)
            </h2>
          </template>
        </Accordion>
        <Accordion class="restaurant-item">
          <template v-slot:face>
            <h2 class="restaurant-name">
              학생식당(303관 B1층)
            </h2>
          </template>
        </Accordion>
        <Accordion class="restaurant-item">
          <template v-slot:face>
            <h2 class="restaurant-name">
              생활관식당(블루미르 308관)
            </h2>
          </template>
        </Accordion>
        <Accordion class="restaurant-item">
          <template v-slot:face>
            <h2 class="restaurant-name">
              University Club(102관 11층)
            </h2>
          </template>
        </Accordion>
      </Grid>
    </section>

    <section class="meal-time-group">
      <h1 class="meal-time-name">
        {{ $t('meals.lunch') }}
      </h1>
      <Grid class="restaurant-container">
        <Accordion class="restaurant-item">
          <template v-slot:face>
            <h2 class="restaurant-name">
              참슬기식당(310관 B4층)
            </h2>
          </template>
        </Accordion>
        <Accordion class="restaurant-item">
          <template v-slot:face>
            <h2 class="restaurant-name">
              학생식당(303관 B1층)
            </h2>
          </template>
        </Accordion>
        <Accordion class="restaurant-item">
          <template v-slot:face>
            <h2 class="restaurant-name">
              생활관식당(블루미르 308관)
            </h2>
          </template>
        </Accordion>
        <Accordion class="restaurant-item">
          <template v-slot:face>
            <h2 class="restaurant-name">
              University Club(102관 11층)
            </h2>
          </template>
        </Accordion>
      </Grid>
    </section>

    <section class="meal-time-group">
      <h1 class="meal-time-name">
        {{ $t('meals.supper') }}
      </h1>
      <Grid class="restaurant-container">
        <Accordion class="restaurant-item">
          <template v-slot:face>
            <h2 class="restaurant-name">
              참슬기식당(310관 B4층)
            </h2>
          </template>
        </Accordion>
        <Accordion class="restaurant-item">
          <template v-slot:face>
            <h2 class="restaurant-name">
              학생식당(303관 B1층)
            </h2>
          </template>
        </Accordion>
        <Accordion class="restaurant-item">
          <template v-slot:face>
            <h2 class="restaurant-name">
              생활관식당(블루미르 308관)
            </h2>
          </template>
        </Accordion>
        <Accordion class="restaurant-item">
          <template v-slot:face>
            <h2 class="restaurant-name">
              University Club(102관 11층)
            </h2>
          </template>
        </Accordion>
      </Grid>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import pageBase from '~/mixins/page-base'
import { Accordion, Grid } from '~/components/ui'

export default Vue.extend({
  name: 'meals-index',
  components: { Accordion, Grid },
  mixins: [pageBase]
})
</script>

<style lang="scss">
@import '~/assets/styles/scss/main';

#eodiro-meals {
  .date-picker {
    align-items: center;
    border-radius: 50px;
    display: flex;
    justify-content: space-around;
    @include elm-fill;
    margin: auto;
    margin-bottom: space(3);
    max-width: 20rem;

    button {
      flex: 1;
      @include text-color;
      font-weight: fw(4);
      margin: space(2) 0;
      padding: space(1) 0;
    }

    .today {
      border-left: solid;
      border-right: solid;
      @include separator;
    }
  }

  .meal-time-group {
    margin-bottom: space(6);
    padding-bottom: space(6);
    @include separator(bottom);

    &:last-child {
      padding-bottom: 0;
      margin-bottom: 0;
      border: none;
    }

    .meal-time-name {
      font-size: head(3);
      padding: space(3) 0;
      padding-left: radius(1);
      position: sticky;
      top: $nav-height;
      z-index: 2;
      @include bg;
    }

    .restaurant-item {
      .restaurant-name {
        color: #529dff;
        font-size: body(5);
        font-weight: fw(4);
      }
    }
  }
}
</style>
