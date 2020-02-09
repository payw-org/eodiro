<template>
  <div id="inquiry">
    <div class="page-content">
      <form
        class="content-container"
        action="javascript:void(0)"
        autocomplete="off"
      >
        <input
          v-model="replyEmail"
          type="email"
          spellcheck="false"
          class="input-email"
          :placeholder="$t('inquiry.inputEmail')"
        />
        <div class="writing-area-wrapper">
          <textarea
            v-model="inquiryContent"
            class="writing-area"
            :placeholder="$t('inquiry.writeHere')"
            spellcheck="false"
          />
          <span class="counter">{{ currentLength }} / 500</span>
        </div>
        <Button class="send-btn" @click="sendEmail">
          <!-- <span class="icon"></span> -->
          <span class="text">{{ $t('inquiry.send') }}</span>
        </Button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import pageBase from '~/mixins/page-base'
import { Button } from '~/components/ui'
import autoHead from '~/modules/auto-head'

export default {
  name: 'inquiry',
  components: { Button },
  mixins: [pageBase],
  data() {
    return {
      replyEmail: '',
      inquiryContent: '',
      minLength: 2,
      maxLength: 500,
    }
  },
  computed: {
    currentLength() {
      return this.inquiryContent.length
    },
  },
  mounted() {},
  methods: {
    validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    },
    sendEmail() {
      const campus = 'seoul'
      const replyEmail = this.replyEmail
      const inquiryContent = this.inquiryContent.trim()

      // Check email input length
      if (replyEmail.length === 0) {
        window.alert(this.$t('inquiry.requireEmail'))
        return
      }

      // Check email format
      if (!this.validateEmail(replyEmail)) {
        window.alert(this.$t('inquiry.wrongEmailFormat'))
        return
      }

      // Inquiry content validation
      if (inquiryContent.length < this.minLength) {
        window.alert(this.$t('inquiry.textLimit.under'))
        return
      }
      if (inquiryContent.length > this.maxLength) {
        window.alert(this.$t('inquiry.textLimit.over'))
        return
      }

      // Use API
      axios({
        url: `https://api.eodiro.com/v2/campuses/${campus}/inquiry`,
        method: 'post',
        data: {
          email: replyEmail,
          text: inquiryContent,
        },
      })
        .then(() => {
          this.inquiryContent = ''
          this.replyEmail = ''
          window.alert(this.$t('inquiry.sent'))
        })
        .catch((error) => {
          window.alert(`${this.$t('global.error.dataSendError')}
          ${error}`)
        })
    },
  },
  head() {
    return {
      title: this.$t('inquiry.title'),
      meta: [...autoHead(this.$t('inquiry.title'))],
    }
  },
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/main';

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

      .input-email {
        margin-bottom: s(3);
      }

      .writing-area-wrapper {
        position: relative;
        margin-bottom: s(3);

        .writing-area {
          height: 20rem;
          flex-grow: 1;
          @include input-style;
          padding-bottom: 3rem;
          min-height: 15rem;
        }

        .counter {
          font-size: b(1);
          display: inline-block;
          padding: s(2);
          position: absolute;
          right: 0;
          bottom: 0;
          color: $base-gray;
          @include bg;
          border-radius: r(1) 0 $input-border-radius 0;
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
