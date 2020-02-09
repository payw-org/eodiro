<template>
  <div id="post-details">
    <div v-if="postData && isSignedIn">
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

    <div v-else class="unavailable">
      <div class="item-wrapper">
        <h1>
          <div class="icon">
            {{ icon }}
          </div>
          {{ unavailableHeadline }}
        </h1>
        <p v-if="!postData" class="sub">
          포스트가 삭제되었거나 잘못된 URL입니다.
        </p>
        <NuxtLink v-if="!isSignedIn" :to="localePath('sign-in')" class="login">
          {{ $t('auth.signIn') + ' →' }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import pageBase from '~/mixins/page-base'
import Comments from '~/components/pepero-square/Comments'
import escapeHtml from '~/modules/escape-html'
import { SquareApi } from '~/modules/eodiro-api'
import Auth from '~/modules/auth'

export default {
  name: 'pepero-square-post-id',
  components: { Comments },
  mixins: [pageBase],
  async asyncData({ route, app, store, redirect, req, res }) {
    // if (!store.state.auth.isSignedIn) return
    if (!Auth.isSignedInQuick()) {
      return
    }

    const postId = route.params.postId
    const postData = await new SquareApi({ req, res }).getPostItem(postId)

    return { postData }
  },
  data() {
    return {
      lastCommentId: 0,
      postData: {},
      comments: [],
    }
  },
  computed: {
    isSignedIn() {
      return Auth.isSignedInQuick()
    },
    uploadedAt() {
      return dayjs(this.postData.uploaded_at).format('YYYY. MM. DD. HH:mm')
    },
    postBody() {
      return escapeHtml(this.postData.body).replace(/(?:\r\n|\r|\n)/g, '<br>')
    },
    icon() {
      return !this.isSignedIn ? '🔐' : '🙅‍♂️'
    },
    unavailableHeadline() {
      return !this.isSignedIn
        ? '로그인이 필요한 기능입니다.'
        : '포스트가 존재하지 않습니다.'
    },
  },
  methods: {
    toggleLike() {
      this.postData.isLiked = !this.postData.isLiked
    },
    leaveNewComment(commentData) {
      this.comments.push(commentData)

      // AJAX
    },
  },
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

  .unavailable {
    @include center;
    text-align: center;

    .item-wrapper {
      padding: s(10);
      @include elm-fill;
      @include rounded;

      .icon {
        font-size: 1.3em;
        line-height: 1;
        margin-bottom: s(3);
      }

      .sub {
        margin-top: s(2);
        color: $base-gray;
      }

      .login {
        display: inline-block;
        margin-top: s(5);
        color: $c-step--4;
        @include overlay-inverted;
        padding: s(2);
        border-radius: r(3);
      }
    }
  }
}
</style>
