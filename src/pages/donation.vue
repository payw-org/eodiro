<template>
  <div id="donation">
    <div class="page-content">
      <!-- <div class="kakaobank-account" @click="copyToClipboard" /> -->
      <div class="card" @click="copyToClipboard">
        <div class="card-info">
          <div class="bank">
            <img
              class="bank-logo"
              src="~/assets/images/kakaobank-logo.svg"
              alt=""
              data-color-scheme="light"
            />
            <img
              class="bank-logo"
              src="~/assets/images/kakaobank-logo-yellow.svg"
              alt=""
              data-color-scheme="dark"
            />
            <h1 class="bank-name">
              {{ $t('donation.bankName') }}
            </h1>
          </div>
          <div class="card-body">
            <span class="press-to-copy">
              {{ $t('donation.pressToCopy') }}
            </span>
            <h2 class="bank-account-number">
              {{ accountNumber }}
            </h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pageBase from '~/mixins/page-base'
import Dialog from '~/plugins/eodiro-dialog'

export default {
  name: 'donation',
  mixins: [pageBase],
  head() {
    return {
      title: this.$t('donation.title')
    }
  },
  data() {
    return {
      accountNumber: '7979-13-55256'
    }
  },
  mounted() {},
  methods: {
    copyToClipboard() {
      const tempTextArea = document.createElement('textarea')
      tempTextArea.value = `
      ${this.accountNumber} ${this.$t('donation.bankName')}
      `
      tempTextArea.className = 'temp-textarea'
      this.$el.appendChild(tempTextArea)
      tempTextArea.focus()
      tempTextArea.setSelectionRange(0, 9999)
      document.execCommand('copy')
      tempTextArea.parentElement.removeChild(tempTextArea)
      new Dialog().alert(this.$t('donation.copied'))
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/main';

#donation {
  text-align: center;

  .page-content {
    display: flex;
    align-items: center;
    justify-content: center;

    .kakaobank-account {
      width: 10rem;
      height: 10rem;
      border-radius: 1rem;
      margin: 8vh 0;
      @include larger-than($width-step--1) {
        width: 13rem;
        height: 13rem;

        border-radius: 2rem;
        margin: 5rem 0;
      }
      @include bgImg('~assets/images/kakaobank-account-white.svg', center);

      @include dark-mode {
        @include bgImg('~assets/images/kakaobank-account-white.svg', center);
      }
    }
  }

  .card {
    position: relative;
    background-color: #ffe600;
    color: #281d20;
    border-radius: radius(3);
    width: 100%;
    max-width: 20rem;
    cursor: pointer;

    &::before {
      content: '';
      display: block;
      padding-top: 60%;
    }

    @include dark-mode {
      background-color: #33272a;
      color: #ffe600;
    }

    .card-info {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding: space(5);

      .bank {
        display: flex;
        align-items: flex-end;

        .bank-logo {
          height: head(1);
          margin-right: space(2);
        }

        .bank-name {
          font-size: head(1);
          line-height: lh(1);
        }
      }

      .card-body {
        display: flex;
        flex-direction: column;
        height: 100%;
        align-items: center;
        justify-content: center;

        .press-to-copy {
          font-size: body(2);
          margin-bottom: space(3);
          color: $base-gray;
        }

        .bank-account-number {
          font-size: head(1);
          @include overlay-inverted;
          padding: space(2);
          border-radius: radius(2);
        }
      }
    }
  }

  .temp-textarea {
    opacity: 0;
    width: 0;
    height: 0;
    padding: 0;
    margin: 0;
    overflow: hidden;
    font-size: 20px;
  }
}
</style>
