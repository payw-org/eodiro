<template>
  <div id="search-class">
    <div class="page-content">
      <!-- Search Bar -->
      <div class="search-bar">
        <Input v-model="searchClassQuary" :placeholder="initInputText" />
        <Button>{{ buttonInnerMsg }}</Button>
      </div>
    </div>
  </div>
</template>

<script>
import EodiroPageBase from '~/components/global/EodiroPageBase.vue'
import { Input, Button } from '~/components/ui'

export default {
  name: 'search-class',
  extends: EodiroPageBase,
  meta: {
    depth: 1,
    appName: 'searchClass'
  },
  components: { Input, Button },
  head() {
    return {
      title: this.$t('searchClass.title'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('searchClass.head.description')
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.$t('global.head.title')
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.$t('global.head.description')
        }
      ]
    }
  },
  data() {
    return {
      searchClassQuary: '',
      initInputText: this.$t('searchClass.initInputText'),
      buttonInnerMsg: this.$t('searchClass.buttonInnerMsg'),
      courseExample: {
        name: '운영체제 (영어A 강의)',
        instructor: '김성조',
        locations: [
          {
            gwan: '310',
            ho: '727'
          }
        ],
        times: [
          {
            day: 2,
            start: '11:00',
            end: '13:00'
          },
          {
            day: 4,
            start: '11:00',
            end: '12:00'
          }
        ]
      }
    }
  },
  methods: {},
  mounted() {}
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/main.scss';

#search-class {
  margin: 0 1rem;
  .search-bar {
    display: flex;
    input {
      margin-right: 1rem;
    }
    button {
    }
  }
}
</style>
