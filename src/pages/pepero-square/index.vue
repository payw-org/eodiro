<template>
  <div id="posts">
    <div class="header">
      <h1 class="title">
        {{ $t('peperoSquare.posts') }}
      </h1>
      <button class="new-post-btn">
        <span>+</span>
        <EodiroLink
          :to="localePath('pepero-square-new')"
          class="absolute-link"
        />
      </button>
    </div>
    <div class="posts-list">
      <PostItem
        v-for="item in posts"
        :key="item.id"
        :post-data="item"
        @click.native="showTopbar"
      />
    </div>

    <p v-show="!isLoadingMore && posts.length === 0" class="message">
      <!-- TODO Localization -->
      포스트가 없습니다.
    </p>
    <p v-show="isLoadingMore" class="message">
      {{ `🚀 ${$t('global.loading')}...` }}
    </p>
    <p v-show="isEnd && posts.length > 0" class="message">
      <!-- TODO Localization -->
      더 이상 포스트가 없습니다.
    </p>
  </div>
</template>

<script>
import { CEM } from '~/modules/custom-event-manager'
import pageBase from '~/mixins/page-base'
import PostItem from '~/components/pepero-square/PostItem'
import autoHead from '~/modules/auto-head'
import EodiroDialog from '~/modules/eodiro-dialog'
import { SquareApi } from '~/modules/eodiro-api'
import wait from '~/modules/wait'
import EodiroLink from '~/components/global/EodiroLink'

export default {
  name: 'pepero-square-index',
  components: { PostItem, EodiroLink },
  mixins: [pageBase],
  async asyncData(ctx) {
    if (!ctx.req) return { isInitialLoadSet: false }

    const posts = await new SquareApi().getPosts(0, 20)

    return posts ? { posts, isInitialLoadSet: true } : []
  },
  data() {
    return {
      posts: [],
      isInitialLoadSet: false,
      isLoadingMore: false,
      isFetchingRecent: false,
      isEnd: false,
      fetchingInterval: null,
    }
  },
  async activated() {
    if (!this.isInitialLoadSet) {
      await this.loadPosts(0, 20)
      this.isInitialLoadSet = true
    }

    // Fetch previous posts when scroll ends
    CEM.addEventListener('scrollended', this.$el, () => {
      const lastPost = this.posts[this.posts.length - 1]
      if (!lastPost) {
        return
      }
      const lastPostId = lastPost.id
      if (lastPostId > 0) {
        this.loadPosts(lastPostId - 1, 20)
      }
    })

    this.startFetchingRecent()
  },
  deactivated() {
    this.stopFetchingRecent()
  },
  methods: {
    startFetchingRecent() {
      if (this.fetchingInterval) {
        this.stopFetchingRecent()
      }

      this.fetchRecentPosts()
      this.fetchingInterval = setInterval(() => {
        this.fetchRecentPosts()
      }, 5000)
    },
    stopFetchingRecent() {
      clearInterval(this.fetchingInterval)
    },
    async fetchRecentPosts() {
      // Get most recent post's id
      const mostRecentPost = this.posts[0]

      if (!mostRecentPost) {
        this.isLoadingMore = true
        await wait(100)
      }

      // Fetch only after done fetching
      if (this.isFetchingRecent) {
        return
      }

      this.isFetchingRecent = true

      // If no most recent post, set most recent post id as -1
      const mostRecentPostId = mostRecentPost ? mostRecentPost.id : -1

      const recentPosts = await new SquareApi().getRecentPosts(
        mostRecentPostId + 1
      )

      if (recentPosts && recentPosts.length > 0) {
        this.posts = [...recentPosts, ...this.posts]
        if (mostRecentPost !== undefined) {
          // TODO Localization
          new EodiroDialog().vagabond('📦 새로운 포스트가 업데이트되었습니다.')
        }
      }

      this.isFetchingRecent = false
      this.isLoadingMore = false
    },
    /**
     * @param {number} from
     * @param {number} quantity
     */
    async loadPosts(from, quantity) {
      if (this.isEnd || this.isLoadingMore) {
        return
      }

      this.isLoadingMore = true

      await wait(200)
      const morePosts = await new SquareApi().getPosts(from, quantity)

      if (!morePosts) {
        return
      }

      if (morePosts.length === 0) {
        this.isEnd = true
      } else {
        this.posts.push(...morePosts)
      }

      this.isLoadingMore = false
    },
  },
  head() {
    return {
      title: this.$t('peperoSquare.title'),
      meta: [...autoHead(this.$t('peperoSquare.title'))],
    }
  },
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
      font-size: h(3);
    }

    .new-post-btn {
      position: relative;
      font-weight: fw(6);
      font-size: h(3);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.5rem;
      height: 2.5rem;
      border-radius: r(3);
      user-select: none;
    }
  }

  .message {
    text-align: center;
    margin-top: s(6);
    // padding: s(3);
    // border-radius: r(3);
    // @include elm-fill;
  }
}
</style>
