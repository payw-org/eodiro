<template>
  <div class="posts-list">
    <h1 class="pl-header">
      {{ $t('community.posts') }}
    </h1>
    <PostItem v-for="item in posts" :key="item.id" :post-data="item" />
  </div>
</template>

<script>
import { CEM } from '~/plugins/custom-event-manager'
import pageBase from '~/mixins/page-base'
import PostItem from '~/components/community/PostItem'

export default {
  name: 'community-index',
  components: { PostItem },
  mixins: [pageBase],
  head() {
    return {
      title: this.$t('community.title')
    }
  },
  asyncData() {
    return {
      posts: require('~/assets/data/community-posts').default.data
    }
  },
  activated() {
    CEM.addEventListener('scrollends', this.$el, () => {
      this.loadMore()
    })
  },
  methods: {
    loadMore(fromId, number) {
      console.log('Load more', fromId, number)
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/main';

.posts-list {
  .pl-header {
    padding-left: radius(2);
  }
}
</style>
