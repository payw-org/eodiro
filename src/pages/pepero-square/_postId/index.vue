<template>
  <div id="post-details">
    <div class="post-wrapper">
      <div class="post">
        <span class="at">{{ uploadedAt }}</span>
        <h2 class="author">
          {{ postData.random_nickname }}
        </h2>
        <h1 class="title">
          {{ postData.title }}
        </h1>
        <p class="body">
          {{ postData.body }}
        </p>
        <!-- <div class="actions">
          <button
            class="like"
            :class="{ fill: postData.isLiked }"
            @click="toggleLike"
          />
        </div> -->
      </div>
    </div>

    <Comments :post-id="postData.id" />
  </div>
</template>

<script>
import dayjs from 'dayjs'
import Axios from 'axios'
import pageBase from '~/mixins/page-base'
import apiUrl from '~/modules/api-url'
import Auth from '~/modules/auth'
import requireAuth from '~/mixins/require-auth'
import Comments from '~/components/pepero-square/Comments'

export default {
  name: 'pepero-square-post-id',
  components: { Comments },
  mixins: [pageBase, requireAuth],
  data() {
    return {
      lastCommentId: 0,
      postData: {},
      comments: []
    }
  },
  computed: {
    uploadedAt() {
      return dayjs(this.postData.uploaded_at).format('YYYY. MM. DD. HH:mm')
    }
  },
  asyncData({ route, app }) {
    return Axios({
      ...apiUrl.peperoSquare.getAPost,
      params: {
        postId: route.params.postId
      },
      headers: {
        accessToken: Auth.getAccessToken()
      }
    })
      .then((res) => {
        return {
          postData: res.data
        }
      })
      .catch(() => {
        alert(app.i18n.t('global.error.networkError'))
      })
  },
  created() {
    this.loadPost()
  },
  methods: {
    toggleLike() {
      this.postData.isLiked = !this.postData.isLiked
    },
    loadPost() {
      // Axios({
      //   ...apiUrl.peperoSquare.getAPost,
      //   params: {
      //     postId: this.$route.params.postId
      //   },
      //   headers: {
      //     accessToken: Auth.getAccessToken()
      //   }
      // }).then((res) => {
      //   this.postData = res.data
      // })
    },
    leaveNewComment(commentData) {
      this.comments.push(commentData)

      // AJAX
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/main';

#post-details {
  .post-wrapper {
    @include elm-fill;
    border-radius: r(5);
    padding: 0 s(4);

    .post {
      padding: s(5) 0;

      .at {
        font-size: b(1);
        line-height: lh(1);
        display: block;
        color: $base-gray;
      }

      .author {
        display: inline-block;
        font-size: b(3);
        font-weight: fw(5);
        margin-top: s(3);
        @include overlay-inverted;
        padding: s(2) s(3);
        border-radius: r(2);
      }

      .title {
        margin-top: s(2);
        font-size: h(5);
      }

      .body {
        font-size: b(3);
        margin-top: s(4);
      }

      .actions {
        margin-top: s(5);
        display: flex;
        justify-content: center;

        .like {
          padding: s(2);
          border-radius: r(2);
          @include overlay-inverted;
          width: 2rem;
          height: 2rem;
          @include bgImg('~assets/images/heart-empty.svg', 'center', '50%');

          &.fill {
            @include bgImg('~assets/images/heart-fill.svg', 'center', '50%');
          }
        }
      }
    }
  }
}
</style>
