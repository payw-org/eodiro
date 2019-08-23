<template>
  <div id="donation">
    <div class="page-content">
      <div class="kakaobank-account" @click="pasteAccount" />
    </div>
  </div>
</template>

<script>
import pageBase from '~/mixins/page-base'
// import { Button, Textarea } from '~/components/ui'
import Dialog from '~/plugins/eodiro-dialog'

export default {
  name: 'donation',
  // components: { Button, Textarea },
  mixins: [pageBase],
  head() {
    return {
      title: this.$t('donation.title')
    }
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {
    pasteAccount() {
      const tepmDom = document.createElement('textarea')
      document.body.appendChild(tepmDom)
      tepmDom.value = '7979-13-55256 카카오뱅크'
      tepmDom.select()
      document.execCommand('copy')
      document.body.removeChild(tepmDom)
      new Dialog().alert(this.$t('donation.pasted'))
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/main.scss';

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
}
</style>
