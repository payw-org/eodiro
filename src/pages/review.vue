<template>
  <div id="review">
    <div class="page-content">
      <div class="content-container">
        <eodiro-textarea class="writing-area" :placeholder="$t('review.writeHere')"></eodiro-textarea>
        <eodiro-button @click="sendEmail" class="send-btn">
          <!-- <span class="icon"></span> -->
          <span class="text">{{ $t('review.send') }}</span>
        </eodiro-button>
      </div>
    </div>
  </div>
</template>

<script>
import EodiroPageBase from '~/components/EodiroPageBase.vue'
import { EodiroButton, EodiroTextarea } from '~/components/ui'
import Dialog from '~/plugins/eodiro-dialog'

export default {
  name: 'review',
  extends: EodiroPageBase,
  meta: {
    depth: 1,
    appName: 'review'
  },
  components: { EodiroButton, EodiroTextarea },
  head() {
    return {
      title: this.$t('review.title')
    }
  },
  data() {
    return {}
  },
  methods: {
    sendEmail() {
      new Dialog().confirm('정말 보내시겠습니까?')
    }
  },
  mounted() {}
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/global-mixins.scss';

#review {
  max-width: 30rem !important;
  text-align: center;
  width: 100%;
  height: 100%;

  .page-content {
    height: 100%;

    .content-container {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;

      .writing-area {
        height: 20rem;
        flex-grow: 1;
        margin-bottom: $posh-gap;
      }

      .send-btn {
        .icon {
          display: inline-block;
          width: 2rem;
          height: 1.9rem;
          @include bgImg('~assets/images/eodiro/paper_plane_black.svg');
          @include dark-mode {
            @include bgImg('~assets/images/eodiro/paper_plane_white.svg');
          }
          margin-right: 0.5rem;
        }
      }
    }
  }
}
</style>
