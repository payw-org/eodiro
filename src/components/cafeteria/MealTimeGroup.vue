<template>
  <section class="meal-time-group" :class="timeGroup">
    <h1 class="meal-time-name">
      {{ $t(`cafeteria.${timeGroup}`) }}
    </h1>
    <Grid class="restaurant-container">
      <Accordion
        v-for="restaurant in mealTimeData"
        :key="timeGroup + restaurant.name"
        class="restaurant-item"
        elastic
      >
        <template v-slot:face>
          <h2 class="restaurant-name">
            {{ restaurant.name }}
          </h2>
        </template>
        <template v-slot:content>
          <div
            v-for="(meal, i) in restaurant.meals"
            :key="i + meal.time + meal.title + meal.price + meal.menus[0]"
            class="meal-group"
          >
            <div class="meal-title-and-price">
              <span class="meal-time">{{ meal.time }}</span>
              <span class="meal-price">
                {{ meal.price }}
              </span>
            </div>
            <ul class="menus">
              <li
                v-for="(menu, j) in meal.menus"
                :key="j + menu"
                class="menu-item"
              >
                {{ menu }}
              </li>
            </ul>
          </div>
        </template>
      </Accordion>
    </Grid>
  </section>
</template>

<script>
import { Grid, Accordion } from '~/components/ui'

export default {
  components: { Grid, Accordion },
  props: {
    timeGroup: {
      type: String,
      required: true,
      validator(value) {
        return ['breakfast', 'lunch', 'supper'].includes(value)
      },
    },
    mealTimeData: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/main';

.meal-time-group {
  margin-bottom: s(6);
  padding-bottom: s(6);
  @include separator(bottom);

  &:last-child {
    padding-bottom: 0;
    margin-bottom: 0;
    border: none;
  }

  .meal-time-name {
    font-size: h(3);
    padding: s(2) 0 s(2);
    padding-left: r(3) / 2;
    position: sticky;
    top: $nav-height;
    z-index: 2;
    @include bg;
  }

  .restaurant-item {
    .restaurant-name {
      color: #529dff;
      font-size: b(5);
      font-weight: fw(4);
      line-height: 1;
    }

    .meal-group {
      margin-bottom: s(4);
      &:last-child {
        margin-bottom: 0;
      }
      @include overlay-inverted;
      border-radius: r(2);
      overflow: hidden;

      .meal-title-and-price {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: s(2);
        @include overlay-inverted;

        .meal-title {
          font-size: b(2);
          font-weight: fw(5);
        }

        .meal-time {
          font-size: b(2);
          color: $base-gray;
        }

        .meal-price {
          font-size: b(1);
          font-weight: fw(4);
          color: #529dff;
        }
      }

      .menus {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        padding: s(3) s(2);
        word-break: break-all;

        .menu-item {
          margin: 0 s(2) s(1) s(2);
          font-size: b(2);
        }
      }
    }
  }
}
</style>
