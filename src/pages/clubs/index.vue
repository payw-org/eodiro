<template>
  <div class="clubs-categories">
    <block-container>
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
        <menu-block>
          <template v-slot:content>{{ cat }}</template>
        </menu-block>
      </nuxt-link>
    </block-container>
  </div>
</template>

<script>
import EodiroPageBase from '~/components/global/EodiroPageBase.vue'
import { BlockContainer, MenuBlock } from '~/components/ui'

export default {
  name: 'clubs-index',
  extends: EodiroPageBase,
  meta: {
    depth: 1
  },
  components: { BlockContainer, MenuBlock },
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
