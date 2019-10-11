<template>
  <div id="posts">
    <div class="header">
      <h1 class="title">
        {{ $t('community.posts') }}
      </h1>
      <button class="new-post-btn">
        +
        <NuxtLink :to="localePath('community-new')" class="absolute-link" />
      </button>
    </div>
    <div class="posts-list">
      <PostItem v-for="item in posts" :key="item.id" :post-data="item" />
    </div>
  </div>
</template>

<script>
import { CEM } from '~/modules/custom-event-manager'
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
      // this.loadMore()
    })
  },
  methods: {
    // loadMore(fromId, number) {
    //   console.log('Load more', fromId, number)
    // },
    // publishNewPost(postData) {
    //   // AJAX
    // }
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/main';

#posts {
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: $nav-height;
    z-index: 100;
    @include bg;
    padding: s(2) 0;

    .title {
      padding-left: r(2);
    }

    .new-post-btn {
      position: relative;
      font-weight: fw(6);
      font-size: h(3);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 3rem;
      height: 3rem;
      border-radius: r(3);
      user-select: none;
    }
  }
}
</style>
