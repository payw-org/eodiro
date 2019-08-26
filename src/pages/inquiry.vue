<template>
  <div id="inquiry">
    <div class="page-content">
      <div class="content-container">
        <div class="writing-area-wrapper">
          <textarea
            v-model="inquiryContent"
            class="writing-area"
            :placeholder="$t('inquiry.writeHere')"
          />
          <span class="counter">{{ currentLength }} / 500</span>
        </div>
        <Button class="send-btn" @click="sendEmail">
          <!-- <span class="icon"></span> -->
          <span class="text">{{ $t('inquiry.send') }}</span>
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import pageBase from '~/mixins/page-base'
import { Button } from '~/components/ui'
import Dialog from '~/plugins/eodiro-dialog'

export default {
  name: 'inquiry',
  components: { Button },
  mixins: [pageBase],
  head() {
    return {
      title: this.$t('inquiry.title')
    }
  },
  data() {
    return {
      inquiryContent: '',
      minLength: 1,
      maxLength: 500
    }
  },
  computed: {
    currentLength() {
      return this.inquiryContent.length
    }
  },
  mounted() {},
  methods: {
    sendEmail() {
      const campus = 'seoul'
      const msgToSend = document.querySelector('.writing-area').value.trim()

      if (msgToSend.length < this.minLength) {
        new Dialog().vagabond(this.$t('inquiry.textLimit.under'))
        return
      }
      if (msgToSend.length > this.maxLength) {
        new Dialog().vagabond(this.$t('inquiry.textLimit.over'))
        return
      }
      axios({
        url: `https://alpha.api.eodiro.com/v2/campuses/${campus}/inquiry`,
        method: 'post',
        data: {
          text: msgToSend
        }
      })
        .then(() => {
          new Dialog().alert(this.$t('inquiry.sent'))
          this.inquiryContent = ''
        })
        .catch((error) => {
          new Dialog().alert(`${this.$t('global.error.dataSendError')}
          ${error}`)
        })
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

      .writing-area-wrapper {
        position: relative;
        margin-bottom: $posh-gap;

        .writing-area {
          height: 20rem;
          flex-grow: 1;
          @include input-style;
          padding-bottom: 3rem;
          min-height: 15rem;
        }

        .counter {
          font-size: body(1);
          display: inline-block;
          padding: space(2);
          position: absolute;
          right: 0;
          bottom: 0;
          color: $base-gray;
          @include bg;
          border-radius: radius(1) 0 $input-border-radius 0;
          border: 1px solid $border-color;

          @include dark-mode {
            border: 1px solid $border-color-dark;
          }
        }
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
