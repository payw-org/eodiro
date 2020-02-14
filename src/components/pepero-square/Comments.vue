<template>
  <div class="comments-container">
    <h2 class="comment-header">
      {{ $t('peperoSquare.comments') }}
    </h2>

    <div class="comment-item-container">
      <transition-group class="comment-container" tag="div" name="scale">
        <div v-for="comment in comments" :key="comment.id" class="comment-item">
          <div class="author-and-date">
            <p class="author">
              {{ comment.random_nickname }}
            </p>
            <p class="uploaded-at">
              {{ refineTime(comment.uploaded_at) }}
            </p>
          </div>
          <p class="body">
            {{ comment.body }}
          </p>
        </div>
      </transition-group>

      <div v-if="comments.length === 0 && !isFetching" class="no-comments">
        <p>
          {{ $t('peperoSquare.noComments') }}
        </p>
      </div>

      <p v-if="isFetching" class="message">
        {{ `🚀 ${$t('global.loading')}...` }}
      </p>

      <div v-show="!isFetching" id="new-comment">
        <form action="javascript:void(0)" autocomplete="off">
          <input
            id="comment-input"
            v-model="newComment"
            type="text"
            name="comment"
            autocomplete="off"
            spellcheck="false"
            :placeholder="$t('peperoSquare.leaveComment')"
            :disabled="isUploading"
            @keypress.enter="leaveComment($event)"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
// import Axios from 'axios'
// import apiUrl from '~/modules/api-url'
// import Auth from '~/modules/auth'
import { CEM } from '~/modules/custom-event-manager'
import { SquareApi } from '~/modules/eodiro-api'
import EodiroDialog from '~/modules/eodiro-dialog'

export default {
  props: {
    postId: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      comments: [],
      newComment: '',
      isUploading: false,
      isFetching: true,
    }
  },
  mounted() {
    if (!this.$store.state.auth.isSignedIn) {
      return
    }

    // When the post id is being updated from the parent, fetch comments
    this.isFetching = false
    this.fetchComments()

    // Automatically fetch new comments when scroll ends
    CEM.addEventListener('scrollended', this.$el, () => {
      this.fetchComments()
    })
  },
  methods: {
    refineTime(time) {
      return dayjs(time).format('MM/DD HH:mm')
    },
    fetchComments() {
      if (this.isFetching) {
        return
      }

      this.isFetching = true

      let fromId = 0
      const lastComment = this.comments[this.comments.length - 1]

      if (lastComment) {
        fromId = lastComment.id + 1
      }

      setTimeout(async () => {
        const comments = await new SquareApi().getComments(this.postId, fromId)

        if (comments) {
          this.comments.push(...comments)
        }

        this.isFetching = false
      }, 100)
    },
    async leaveComment(event) {
      if (this.newComment.trim().length === 0) {
        alert('댓글 내용을 입력하세요.')
        return
      }

      this.isUploading = true

      const newCommentObj = {
        body: this.newComment,
        postId: this.postId,
      }

      const isAdded = await new SquareApi().addComment(newCommentObj)
      if (!isAdded) {
        new EodiroDialog().alert(this.$t('global.error.networkError'))
      }

      this.isUploading = false

      // Clear input
      this.newComment = ''
      this.fetchComments()
      this.$nextTick(() => {
        document.getElementById('comment-input').blur()
      })
    },
  },
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/main';

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

  .comment-container {
    margin-bottom: s(5);

    .comment-item {
      padding: s(3) s(1);
      border-bottom: solid;
      @include separator;

      &:last-child {
        margin-bottom: 0;
      }

      .author-and-date {
        margin-bottom: s(2);
        display: flex;
        align-items: flex-end;
        justify-content: space-between;

        .author {
          line-height: lh(1);
          font-weight: fw(4);
          font-size: b(2);
        }

        .uploaded-at {
          font-size: b(1);
          line-height: lh(1);
          color: $base-gray;
        }
      }

      .body {
        font-size: b(2);
        line-height: lh(2);
        color: $base-gray;
      }
    }
  }

  .no-comments,
  .message {
    height: 3rem;
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }

  .no-comments {
    text-align: center;
  }

  .message {
    overflow: hidden;
  }
}

#new-comment {
  height: 3rem;

  #comment-input {
    display: block;
    width: 100%;
    font-size: b(2);
    @include input-style;
    padding: s(3);
  }
}
</style>
