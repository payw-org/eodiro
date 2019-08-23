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
    </div>
  </div>
</template>

<script>
import { LoremIpsum } from 'lorem-ipsum'
import dayjs from 'dayjs'
import pageBase from '~/mixins/page-base'

const lorem = new LoremIpsum()

export default {
  name: 'community-post-id',
  mixins: [pageBase],
  asyncData({ route }) {
    return {
      postData: {
        id: route.params.postId,
        at: dayjs().format('YYYY. MM. DD. HH:mm'),
        title: lorem.generateSentences(1),
        body: lorem.generateParagraphs(2),
        author: lorem.generateWords(1),
        isLiked: false
      },
      comments: Array.from({ length: Math.floor(Math.random() * 50) }, (i) => {
        return {
          id: i,
          author: lorem.generateWords(1),
          body: lorem.generateSentences(1)
        }
      })
    }
  },
  methods: {
    toggleLike() {
      this.postData.isLiked = !this.postData.isLiked
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/main';

#post-details {
  .post-wrapper {
    @include elm-fill;
    border-radius: radius(5);
    padding: 0 space(4);

    .post {
      padding: space(5) 0;

      .at {
        font-size: body(1);
        line-height: lh(1);
        display: block;
        color: $base-gray;
      }

      .author {
        display: inline-block;
        font-size: body(3);
        font-weight: fw(5);
        margin-top: space(3);
        @include overlay-inverted;
        padding: space(2) space(3);
        border-radius: radius(2);
      }

      .title {
        margin-top: space(2);
      }

      .body {
        margin-top: space(4);
      }

      .actions {
        margin-top: space(5);
        display: flex;
        justify-content: center;

        .like {
          padding: space(2);
          border-radius: radius(2);
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
    margin-top: space(6);

    .comment-header {
      @include bg;
      padding: space(3) 0;
      border-bottom: solid;
      @include separator;
      position: sticky;
      top: $nav-height;
    }

    .comment-item {
      padding: space(3) space(1);
      border-bottom: solid;
      @include separator;

      &:last-child {
        margin-bottom: 0;
      }

      .author {
        line-height: lh(1);
        margin-bottom: space(2);
        font-weight: fw(5);
      }

      .body {
        line-height: lh(2);
      }
    }

    .no-comments {
      padding: space(4) 0;
      text-align: center;
    }
  }
}
</style>
