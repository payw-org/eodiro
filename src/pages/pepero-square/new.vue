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
    <input type="file" @change="fileChange" />
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
import requireAuthMixin from '~/mixins/require-auth-mixin'
import { SquareApi } from '~/modules/eodiro-api'
import EodiroDialog from '~/modules/eodiro-dialog'
import useAxios from '~/modules/use-axios'
import ApiHost from '~/modules/eodiro-api/api-host'

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
    async fileChange(e) {
      const formData = new FormData()
      console.log(e.target.files[0])
      formData.append('file', e.target.files[0])
      const [err, res] = await useAxios({
        method: 'post',
        url: ApiHost.getUrl('pepero-square/file'),
        data: formData
      })

      if (err) {
        return
      }

      console.log(res)
    },
    async uploadNewPost() {
      if (this.title.trim().length === 0) {
        // TODO Localization
        alert('제목을 입력하세요')
        return
      }

      if (this.body.trim().length === 0) {
        // TODO Localization
        alert('내용을 입력하세요')
        return
      }

      // Start waiting server response
      this.isWaiting = true

      const postId = await new SquareApi().addPost({
        title: this.title,
        body: this.body
      })
      if (!postId) {
        // TODO Localization
        new EodiroDialog().alert('업로드에 실패했습니다.')
      } else {
        // TODO Localization
        new EodiroDialog().alert('업로드되었습니다.')
        this.$router.replace(
          this.localePath({
            name: 'pepero-square-postId',
            params: {
              postId
            }
          })
        )
      }

      // Stop waiting server response
      this.isWaiting = false
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
