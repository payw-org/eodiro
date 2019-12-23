<template>
  <div id="post-details">
    <div v-if="postData">
      <div class="post-wrapper">
        <div class="post">
          <span class="at">{{ uploadedAt }}</span>
          <h2 class="author">
            {{ postData.random_nickname }}
          </h2>
          <h1 class="title">
            {{ postData.title }}
          </h1>
          <p class="body" v-html="postBody" />
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

    <div v-else class="non-existing">
      <div class="item-wrapper">
        <h1>
          <div class="icon">
            🙅‍♂️
          </div>
          포스트가 존재하지 않습니다.
        </h1>
        <p class="sub">
          포스트가 삭제되었거나 잘못된 링크일 수 있습니다.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import pageBase from '~/mixins/page-base'
import Comments from '~/components/pepero-square/Comments'
import escapeHtml from '~/modules/escape-html'
import requireAuthMixin from '~/mixins/require-auth-mixin'
import { SquareApi } from '~/modules/eodiro-api'

export default {
  name: 'pepero-square-post-id',
  components: { Comments },
  mixins: [pageBase, requireAuthMixin],
  async asyncData({ route, app, store, redirect, req, res }) {
    if (!store.state.auth.isSignedIn) return

    const postId = route.params.postId
    const postData = await new SquareApi({ req, res }).getPostItem(postId)

    return { postData }
  },
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
    },
    postBody() {
      return escapeHtml(this.postData.body).replace(/(?:\r\n|\r|\n)/g, '<br>')
    }
  },
  methods: {
    toggleLike() {
      this.postData.isLiked = !this.postData.isLiked
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

      .title,
      .body {
        word-break: break-all;
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

  .non-existing {
    @include center;
    text-align: center;

    .item-wrapper {
      padding: s(10);
      @include elm-fill;
      @include rounded;

      .icon {
        font-size: 1.5em;
        line-height: 1;
        margin-bottom: s(3);
      }

      .sub {
        margin-top: s(2);
        color: $base-gray;
      }
    }
  }
}
</style>
