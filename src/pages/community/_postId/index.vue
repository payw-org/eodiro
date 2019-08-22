<template>
  <div id="post-details">
    <div class="post-wrapper">
      <div class="post">
        <h1 class="title">
          {{ postData.title }}
        </h1>
        <p class="body">
          {{ postData.body }}
        </p>
      </div>
    </div>

    <div class="comments-container">
      <h2 class="comment-header">
        {{ $t('community.comments') }}
      </h2>
      <div v-for="comment in comments" :key="comment.id" class="comment-item">
        <p>{{ comment.body }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { LoremIpsum } from 'lorem-ipsum'
import pageBase from '~/mixins/page-base'

const lorem = new LoremIpsum()

export default {
  name: 'community-post-id',
  mixins: [pageBase],
  asyncData({ route }) {
    return {
      postData: {
        id: route.params.postId,
        title: lorem.generateSentences(1),
        body: lorem.generateParagraphs(2),
        author: lorem.generateWords(1)
      },
      comments: Array.from({ length: Math.floor(Math.random() * 15) }, (i) => {
        return {
          id: i,
          body: lorem.generateSentences(1)
        }
      })
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

      .title {
      }

      .body {
        margin-top: space(4);
      }
    }
  }

  .comments-container {
    margin-top: space(6);

    .comment-header {
      margin-bottom: space(4);
    }

    .comment-item {
      padding: space(2) space(1);
      border-top: solid;
      @include separator;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
