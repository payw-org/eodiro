<template>
  <div id="eodiro-meals">
    <!-- <div class="date-picker">
      <button class="prev">
        {{ $t('global.nav.prev') }}
      </button>
      <button class="today">
        {{ $t('global.time.today') }}
      </button>
      <button class="next">
        {{ $t('global.nav.next') }}
      </button>
    </div> -->

    <MealTimeGroup time-group="breakfast" :meal-time-data="meal.breakfast" />
    <MealTimeGroup time-group="lunch" :meal-time-data="meal.lunch" />
    <MealTimeGroup time-group="supper" :meal-time-data="meal.supper" />
  </div>
</template>

<script>
import axios from 'axios'
import dayjs from 'dayjs'
import pageBase from '~/mixins/page-base'
import MealTimeGroup from '~/components/cafeteria/MealTimeGroup'
import autoHead from '~/modules/auto-head'

export default {
  name: 'meals-date',
  components: { MealTimeGroup },
  mixins: [pageBase],
  async asyncData() {
    const res = await axios({
      method: 'GET',
      url: `https://api.eodiro.com/v2/campuses/seoul/meal/dates/${dayjs().format(
        'YYYY-MM-DD'
      )}`,
    })
    const data = res.data
    return {
      meal: data.meal,
    }
  },
  data() {
    return {
      meal: {},
    }
  },
  head() {
    return {
      title: this.$t('cafeteria.title'),
      meta: [...autoHead(this.$t('cafeteria.title'))],
    }
  },
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/main';

#eodiro-meals {
  max-width: 40rem !important;

  .date-picker {
    align-items: center;
    border-radius: 50px;
    display: flex;
    justify-content: space-around;
    @include elm-fill;
    margin: auto;
    margin-bottom: s(3);
    max-width: 20rem;

    button {
      flex: 1;
      @include text-color;
      font-weight: fw(4);
      margin: s(2) 0;
      padding: s(1) 0;
    }

    .today {
      border-left: solid;
      border-right: solid;
      @include separator;
    }
  }
}
</style>
