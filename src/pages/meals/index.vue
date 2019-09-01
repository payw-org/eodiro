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

    <div class="meals-container">
      <Accordion class="agony">
        <template v-slot:face>
          <h3>{{ $t('meals.breakfast') }}</h3>
        </template>
      </Accordion>

      <Accordion class="agony">
        <template v-slot:face>
          <h3>{{ $t('meals.lunch') }}</h3>
        </template>
      </Accordion>

      <Accordion class="agony">
        <template v-slot:face>
          <h3>{{ $t('meals.supper') }}</h3>
        </template>
      </Accordion>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import pageBase from '~/mixins/page-base'
import { Accordion } from '~/components/ui'

export default Vue.extend({
  name: 'meals-index',
  components: { Accordion },
  mixins: [pageBase]
})
</script>

<style lang="scss">
@import '~/assets/styles/scss/main';

#eodiro-meals {
  .date-picker {
    display: flex;
    align-items: center;
    justify-content: space-around;
    @include elm-fill;
    border-radius: radius(2);
    padding: space(2);
    margin-bottom: space(5);

    button {
      flex: 1;
      min-height: 2rem;
      @include text-color;
      font-weight: fw(4);
    }

    .today {
      border-left: solid;
      border-right: solid;
      @include separator;
    }
  }

  .meals-container {
    .agony {
      margin-top: space(4);
    }
  }
}
</style>
