<template>
  <div id="new-comment">
    <form action="javascript:void(0)" autocomplete="off">
      <input
        v-model="comment"
        type="text"
        name="comment"
        autocomplete="off"
        spellcheck="false"
        :placeholder="$t('peperoSquare.leaveComment')"
        class="comment-input"
        @keyup.enter="leaveComment($event)"
      />
    </form>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  data() {
    return {
      comment: '',
    }
  },
  methods: {
    leaveComment(event) {
      if (this.comment.trim().length === 0) {
        alert('댓글 내용을 입력하세요.')
        return
      }

      const newCommentObj = {
        body: this.comment,
        uploadedAt: dayjs(),
        userId: this.$store.state.auth.userId,
      }

      // Emit event
      this.$emit('leaveNewComment', newCommentObj)

      // Clear input
      this.comment = ''
      event.target.blur()
    },
  },
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/main';

#new-comment {
  // position: sticky;
  // bottom: 0;
  margin-top: s(4);

  .comment-input {
    display: block;
    width: 100%;
    font-size: b(2);
    @include input-style;
    padding: s(3);
  }
}
</style>
