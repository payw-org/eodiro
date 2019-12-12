<template>
  <div id="new-post">
    <h1 class="header">
      {{ $t('peperoSquare.new.title') }}
    </h1>
    <input
      v-model="title"
      :placeholder="$t('peperoSquare.new.placeholder.title')"
      class="title-input"
      :disabled="isWaiting"
      @keypress.enter="enterOnTitle"
    />
    <textarea
      ref="body"
      v-model="body"
      :placeholder="$t('peperoSquare.new.placeholder.body')"
      class="body-input"
      :disabled="isWaiting"
    />
    <Button
      full
      class="publish-btn"
      :disabled="isWaiting"
      @click="uploadNewPost"
    >
      {{ $t('global.upload') }}
    </Button>
  </div>
</template>

<script>
import pageBase from '~/mixins/page-base'
import { Button } from '~/components/ui'
import Axios from 'axios'
import apiUrl from '~/modules/api-url'
import Auth from '~/modules/auth'
import requireAuthMixin from '~/mixins/require-auth-mixin'

export default {
  name: 'pepero-square-new',
  components: { Button },
  mixins: [pageBase, requireAuthMixin],
  data() {
    return {
      title: '',
      body: '',
      isWaiting: false
    }
  },
  methods: {
    enterOnTitle() {
      /** @type {HTMLTextAreaElement} */
      const bodyTextArea = this.$refs.body
      bodyTextArea.focus()
    },
    uploadNewPost() {
      if (this.title.trim().length === 0) {
        alert('제목을 입력하세요')
        return
      }

      if (this.body.trim().length === 0) {
        alert('내용을 입력하세요')
        return
      }

      // Start waiting server response
      this.isWaiting = true

      Axios({
        ...apiUrl.peperoSquare.uploadPost,
        headers: {
          accessToken: Auth.getAccessToken()
        },
        data: {
          body: this.body,
          title: this.title
        }
      })
        .then((res) => {
          alert('업로드되었습니다.')
          const { postId } = res.data
          this.$router.replace(
            this.localePath({
              name: 'pepero-square-postId',
              params: {
                postId
              }
            })
          )
        })
        .catch(() => {
          alert('업로드에 실패했습니다.')
        })
        .finally(() => {
          this.isWaiting = false
        })
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/main';

#new-post {
  .header {
    padding-left: r(2);
  }

  .title-input,
  .body-input {
    @include input-style;
  }

  .title-input {
    margin-top: s(3);
  }

  .body-input {
    margin-top: s(3);
    min-height: 50vh;
  }

  .publish-btn {
    margin-top: s(3);
  }
}
</style>
