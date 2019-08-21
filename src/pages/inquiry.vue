<template>
  <div id="inquiry">
    <div class="page-content">
      <div class="content-container">
        <Textarea class="writing-area" :placeholder="$t('inquiry.writeHere')" />
        <Button class="send-btn" @click="sendEmail">
          <!-- <span class="icon"></span> -->
          <span class="text">{{ $t('inquiry.send') }}</span>
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import pageBase from '~/mixins/page-base'
import { Button, Textarea } from '~/components/ui'
import Dialog from '~/plugins/eodiro-dialog'

export default {
  name: 'inquiry',
  components: { Button, Textarea },
  mixins: [pageBase],
  head () {
    return {
      title: this.$t('inquiry.title')
    }
  },
  data () {
    return {}
  },
  mounted () {},
  methods: {
    sendEmail () {
      new Dialog().confirm('정말 보내시겠습니까?')
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/main.scss';

#inquiry {
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
          @include bgImg('~assets/images/paper_plane_black.svg');
          @include dark-mode {
            @include bgImg('~assets/images/paper_plane_white.svg');
          }
          margin-right: 0.5rem;
        }
      }
    }
  }
}
</style>
