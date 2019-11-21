<template>
  <div id="posts">
    <div class="header">
      <h1 class="title">
        {{ $t('peperoSquare.posts') }}
      </h1>
      <button class="new-post-btn">
        +
        <NuxtLink :to="localePath('pepero-square-new')" class="absolute-link" />
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
      포스트가 없습니다.
    </p>
    <p v-show="isLoadingMore" class="message">
      {{ `🚀 ${$t('global.loading')}...` }}
    </p>
    <p v-show="isEnd && posts.length > 0" class="message">
      더 이상 포스트가 없습니다.
    </p>
  </div>
</template>

<script>
import { CEM } from '~/modules/custom-event-manager'
import pageBase from '~/mixins/page-base'
import PostItem from '~/components/pepero-square/PostItem'
import autoHead from '~/modules/auto-head'
import Axios from 'axios'
import apiUrl from '~/modules/api-url'
import EodiroDialog from '~/modules/eodiro-dialog'

export default {
  name: 'pepero-square-index',
  components: { PostItem },
  mixins: [pageBase],
  head() {
    return {
      title: this.$t('peperoSquare.title'),
      meta: [...autoHead(this.$t('peperoSquare.title'))]
    }
  },
  data() {
    return {
      posts: [],
      isLoadingMore: false,
      isFetchingRecent: false,
      isEnd: false,
      fetchingInterval: null
    }
  },
  beforeMount() {
    this.loadPosts(null, 20)
    this.startFetchingRecent()
  },
  beforeDestroy() {
    this.stopFetchingRecent()
  },
  activated() {
    this.startFetchingRecent()

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
    fetchRecentPosts() {
      const mostRecentPost = this.posts[0]

      if (!mostRecentPost || this.isFetchingRecent) {
        return
      }

      this.isFetchingRecent = true

      const mostRecentPostId = mostRecentPost.id

      Axios({
        ...apiUrl.peperoSquare.getRecentPosts,
        params: {
          from: mostRecentPostId + 1
        }
      })
        .then((res) => {
          const { data } = res

          if (data.length > 0) {
            this.posts = [...data, ...this.posts]
            new EodiroDialog().vagabond(
              '📦 새로운 포스트가 업데이트되었습니다.'
            )
          }
        })
        .catch((err) => {
          console.error(err)
        })
        .finally(() => {
          this.isFetchingRecent = false
        })
    },
    /**
     * @param {number} from
     * @param {number} quantity
     */
    loadPosts(from, quantity) {
      if (this.isEnd || this.isLoadingMore) {
        return
      }

      this.isLoadingMore = true

      setTimeout(() => {
        Axios({
          ...apiUrl.peperoSquare.getPosts,
          params: {
            from,
            quantity
          }
        })
          .then((res) => {
            const { data } = res

            if (data.length === 0) {
              this.isEnd = true
            } else {
              this.posts.push(...data)
            }
          })
          .catch((err) => {
            if (
              !err.response ||
              (err.response && err.response.status === 500)
            ) {
              alert(this.$t('global.error.networkError'))
            }
          })
          .finally(() => {
            this.isLoadingMore = false
          })
      }, 500)
    }
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

  .message {
    text-align: center;
    margin-top: s(6);
    // padding: s(3);
    // border-radius: r(3);
    // @include elm-fill;
  }
}
</style>
