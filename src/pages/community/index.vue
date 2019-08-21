<template>
  <div id="eodiro-community">
    <PostItem v-for="item in posts" :key="item.id" :post-data="item" />
  </div>
</template>

<script>
import pageBase from '~/mixins/page-base'
import PostItem from '~/components/community/PostItem'

export default {
  name: 'community-index',
  components: { PostItem },
  mixins: [pageBase],
  head () {
    return {
      title: this.$t('community.title')
    }
  },
  asyncData () {
    return {
      posts: require('~/assets/data/community-posts').default.data
    }
  },
  methods: {
    loadMore (fromId, number) {}
  }
}
</script>

<style lang="scss">
#eodiro-community {
  max-width: 40rem !important;
}
</style>
