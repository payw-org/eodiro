<i18n>
{
  "kr": {
    "title": "리뷰"
  },
  "en": {
    "title": "Review"
  }
}
</i18n>

<template>
  <div id="review">
    <div class="page-content">
      <div class="content-container">
        <Textarea class="write"></Textarea>
        <Button @click="sendEmail" class="send-btn">
          <span class="icon"></span>
          <span class="text">Send</span>
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import EodiroPageBase from '~/components/EodiroPageBase.vue'
import { Textarea , Button  } from '~/components/ui'

export default {
  name: 'review',
  extends: EodiroPageBase,
  meta: {
    depth: 1,
    appName: 'review'
  },
  components: { Textarea, Button },
  head() {
    return {
      title: this.$t('title')
    }
  },
  data() {
    return {}
  },
  methods: {
    sendEmail() {
      alert('부에에에에ㅔ에')
    }
  },
  mounted() {}
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/global-mixins.scss';

#review {
  text-align: center;
  position: absolute;
  width: 100%;
  height: 100%;

  .page-content {
    width: calc(100% - 2rem);
    height: 100%;
    max-width: 30rem;
    margin: auto;

    .content-container {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;

      padding: 1rem 0;

      .write {
        flex-grow: 1;

        margin-bottom: 1rem;
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
