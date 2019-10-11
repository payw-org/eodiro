<template>
  <div id="post-details">
    <div class="post-wrapper">
      <div class="post">
        <span class="at">{{ postData.at }}</span>
        <h2 class="author">
          {{ postData.author }}
        </h2>
        <h1 class="title">
          {{ postData.title }}
        </h1>
        <p class="body">
          {{ postData.body }}
        </p>
        <div class="actions">
          <button
            class="like"
            :class="{ fill: postData.isLiked }"
            @click="toggleLike"
          />
        </div>
      </div>
    </div>

    <div class="comments-container">
      <h2 class="comment-header">
        {{ $t('community.comments') }}
      </h2>

      <div class="comment-item-container">
        <div v-for="comment in comments" :key="comment.id" class="comment-item">
          <p class="author">
            {{ comment.author }}
          </p>
          <p class="body">
            {{ comment.body }}
          </p>
        </div>

        <div v-if="comments.length === 0" class="no-comments">
          <p>
            {{ $t('community.noComments') }}
          </p>
        </div>

        <NewComment @leaveNewComment="leaveNewComment" />
      </div>
    </div>
  </div>
</template>

<script>
import { LoremIpsum } from 'lorem-ipsum'
import dayjs from 'dayjs'
// import axios from 'axios'
import pageBase from '~/mixins/page-base'
import NewComment from '~/components/community/NewComment'
// import { CEM } from '~/modules/custom-event-manager'

const lorem = new LoremIpsum()

export default {
  name: 'community-post-id',
  components: { NewComment },
  mixins: [pageBase],
  data() {
    return {
      lastCommentId: 0
    }
  },
  asyncData({ route }) {
    // axios({
    //   method: 'get',
    //   url: ''
    // }).then((response) => {
    //   return response.data
    // }).catch(() => {
    //   redirect(app.localePath('not-found'))
    // })
    return {
      postData: {
        id: route.params.postId,
        at: dayjs().format('YYYY. MM. DD. HH:mm'),
        title: lorem.generateSentences(1),
        body: lorem.generateParagraphs(2),
        author: lorem.generateWords(1),
        isLiked: false
      },
      comments: Array.from({ length: Math.floor(Math.random() * 10) }, (i) => {
        return {
          id: i,
          author: lorem.generateWords(1),
          body: lorem.generateSentences(1)
        }
      })
    }
  },
  mounted() {
    // document.addEventListener('scrollends', this.loadData)
    // CEM.addEventListener('scrollends', this.$el, this.loadData)
  },
  methods: {
    toggleLike() {
      this.postData.isLiked = !this.postData.isLiked
    },
    loadData() {
      // AJAX again from comment id of lastly loaded
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
      }

      .body {
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

  .comments-container {
    margin-top: s(6);

    .comment-header {
      @include bg;
      padding: s(3) 0;
      border-bottom: solid;
      @include separator;
      position: sticky;
      top: $nav-height;
    }

    .comment-item {
      padding: s(3) s(1);
      border-bottom: solid;
      @include separator;

      &:last-child {
        margin-bottom: 0;
      }

      .author {
        line-height: lh(1);
        margin-bottom: s(2);
        font-weight: fw(5);
      }

      .body {
        line-height: lh(2);
        color: $base-gray;
      }
    }

    .no-comments {
      padding: s(4) 0;
      text-align: center;
    }
  }
}
</style>
