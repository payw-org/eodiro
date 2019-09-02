<template>
  <section class="meal-time-group" :class="timeGroup">
    <h1 class="meal-time-name">
      {{ $t(`meals.${timeGroup}`) }}
    </h1>
    <Grid class="restaurant-container">
      <Accordion
        v-for="restaurant in mealTimeData"
        :key="timeGroup + restaurant.restaurantName"
      >
        <template v-slot:face>
          <h2 class="restaurant-name">
            {{ restaurant.restaurantName }}
          </h2>
        </template>
        <template v-slot:content>
          <div
            v-for="meal in restaurant.meals"
            :key="meal.time + meal.title + meal.price"
            class="meal-group"
          >
            <div class="meal-title-and-price">
              <h3 class="meal-title">
                {{ meal.title }}
              </h3>
              <span class="meal-price">
                {{ meal.price }}
              </span>
              <ul class="menus">
                <li v-for="menu in menus" :key="menu">
                  {{ menu }}
                </li>
              </ul>
            </div>
            span
          </div>
        </template>
      </Accordion>
    </Grid>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { Grid, Accordion } from '~/components/ui'

export default Vue.extend({
  components: { Grid, Accordion },
  props: {
    timeGroup: {
      type: String,
      required: true,
      validastor(value) {
        return ['breakfast', 'lunch', 'supper'].includes(value)
      }
    },
    mealTimeData: {
      type: Object,
      required: true,
      default: () => ({})
    }
  }
})
</script>

<style lang="scss">
@import '~/assets/styles/scss/main';

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
    padding-left: radius(3);
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

    .meal-group {
      margin-bottom: space(3);
      &:last-child {
        margin-bottom: 0;
      }
      @include overlay-inverted;
      border-radius: radius(2);
      overflow: hidden;

      .meal-title-and-price {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: space(2);
        @include overlay-inverted;

        .meal-title {
          font-size: body(2);
          font-weight: fw(5);
        }

        .meal-price {
          font-size: body(1);
          font-weight: fw(4);
          color: #529dff;
        }
      }

      .menus {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        padding: space(2);
        margin: 0 -#{space(2)} -#{space(1)} -#{space(2)};

        .menu-item {
          margin: 0 space(2) space(1) space(2);
          font-size: body(2);
        }
      }
    }
  }
}
</style>
