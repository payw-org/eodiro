<template>
  <div id="donation">
    <div class="page-content">
      <div class="manifesto-and-card">
        <p class="manifesto">
          {{ $t('donation.manifesto') }}
        </p>
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

      <div class="the-hall-of-fame-wrapper">
        <div class="thof">
          <h1 class="title">
            {{ $t('donation.hallOfFame') }}
          </h1>
          <ol class="donator-list">
            <li class="donator-item">
              <div class="identity">
                <span class="num-badge">1</span>
                황창재
              </div>
              <span class="amount">₩12억</span>
            </li>
            <li class="donator-item">
              <div class="identity">
                <span class="num-badge">2</span>
                장해민
              </div>
              <span class="amount">₩10억</span>
            </li>
            <li class="donator-item">
              <div class="identity">
                <span class="num-badge">3</span>
                황치훈
              </div>
              <span class="amount">₩5억</span>
            </li>
            <li class="donator-item">
              <div class="identity">
                <span class="num-badge">4</span>
                우승진
              </div>
              <span class="amount">₩1억</span>
            </li>
            <li class="donator-item">
              <div class="identity">
                <span class="num-badge">5</span>
                이성민
              </div>
              <span class="amount">₩50,000,000</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pageBase from '~/mixins/page-base'

export default {
  name: 'donation',
  mixins: [pageBase],
  data() {
    return {
      accountNumber: '7979-13-55256',
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

      window.alert(this.$t('donation.copied'))
    },
  },
  head() {
    return {
      title: this.$t('donation.title'),
    }
  },
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/main';

#donation {
  text-align: center;
  // max-width: 50rem !important;

  .page-content {
    display: flex;
    align-items: flex-start;
    justify-content: center;

    @include on-mobile {
      flex-direction: column;
    }

    .manifesto-and-card {
      flex: 1;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      margin-right: s(5);

      @include on-mobile {
        margin-right: 0;
        margin-bottom: f(2);
      }

      .manifesto {
        min-width: 100%;
        text-align: left;
        margin-bottom: s(4);
        padding: 0 r(2);
      }

      .card {
        position: relative;
        background-color: #ffe600;
        color: #281d20;
        border-radius: r(3);
        width: 100%;
        max-width: 22rem;
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
          padding: s(5);

          .bank {
            display: flex;
            align-items: flex-end;

            .bank-logo {
              height: h(1);
              margin-right: s(2);
            }

            .bank-name {
              font-size: h(1);
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
              font-size: b(2);
              margin-bottom: s(3);
              color: $base-gray;
            }

            .bank-account-number {
              font-size: h(1);
              @include overlay-inverted;
              padding: s(2);
              border-radius: r(2);
            }
          }
        }
      }
    }

    .the-hall-of-fame-wrapper {
      flex: 1;
      width: 100%;

      .thof {
        text-align: left;
        @include elm-fill;
        border-radius: r(5);
        padding: s(4);

        .title {
          font-size: h(2);
          padding-left: r(1);
        }

        .donator-list {
          .donator-item {
            @include bg;
            border-radius: r(3);
            padding: s(3);
            margin-top: s(4);
            display: flex;
            align-items: center;
            justify-content: space-between;

            .identity {
              display: flex;
              align-items: center;
            }

            .num-badge {
              background-color: #8c00ff;
              font-weight: fw(5);
              font-size: b(2);
              color: #fff;
              border-radius: 50px;
              width: 1.5rem;
              height: 1.5rem;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-right: s(3);
            }

            .amount {
              font-size: b(2);
              color: #0077ff;
            }
          }
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
