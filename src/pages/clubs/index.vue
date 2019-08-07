<template>
  <div class="clubs-categories">
    <eodiro-block-container>
      <nuxt-link
        :to="localePath({
          name: 'clubs-topic',
          params: {
            topic: cat
          }
        })"
        v-for="cat in categories"
        :key="cat"
      >
        <eodiro-block-item>
          <template v-slot:content>{{ cat }}</template>
        </eodiro-block-item>
      </nuxt-link>
    </eodiro-block-container>
  </div>
</template>

<script>
import EodiroPageBase from '~/components/global/EodiroPageBase.vue'
import { EodiroBlockContainer, EodiroBlockItem } from '~/components/ui'

export default {
  name: 'clubs-index',
  extends: EodiroPageBase,
  meta: {
    depth: 1
  },
  components: { EodiroBlockContainer, EodiroBlockItem },
  data() {
    return {
      categories: [
        '스포츠',
        '음악',
        '무예',
        '종교',
        '미술',
        '학술',
        '사회/정치',
        '봉사',
        '문화'
      ]
    }
  }
}
</script>
