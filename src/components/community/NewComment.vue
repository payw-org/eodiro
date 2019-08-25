<template>
  <div id="new-comment">
    <form action="javascript:void(0)" autocomplete="off">
      <input
        v-model="comment"
        type="text"
        name="comment"
        autocomplete="off"
        spellcheck="false"
        :placeholder="$t('community.leaveComment')"
        class="comment-input"
        @keyup.enter="leaveComment($event)"
      />
    </form>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { LoremIpsum } from 'lorem-ipsum'
const lorem = new LoremIpsum()

export default {
  data() {
    return {
      comment: ''
    }
  },
  methods: {
    leaveComment(event) {
      const newCommentObj = {
        body: this.comment,
        at: dayjs(),
        author: lorem.generateWords(1)
      }

      // Emit event
      this.$emit('leaveNewComment', newCommentObj)

      // Clear input
      this.comment = ''
      event.target.blur()
      event.target.focus()
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/main';

#new-comment {
  // position: sticky;
  // bottom: 0;
  margin-top: space(4);

  .comment-input {
    display: block;
    width: 100%;
    font-size: body(2);
    @include input-style;
    padding: space(3);
  }
}
</style>
