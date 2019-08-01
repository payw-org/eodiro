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
        <textarea class="write"></textarea>
        <cushion class="send">
          <button @click="sendEmail()">send</button>
        </cushion>
      </div>
    </div>
  </div>
</template>

<script>
import EodiroPageBase from '~/components/EodiroPageBase.vue'
import Cookies from 'js-cookie'
import Cushion from '~/components/Cushion.vue'

export default {
  name: 'review',
  extends: EodiroPageBase,
  meta: {
    depth: 1,
    appName: 'review'
  },
  components: { Cushion },
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
        padding: 0.5rem;
        border: 2px solid #f0f0f0;
        border-radius: 0.7rem;
        margin-bottom: 1rem;
      }

      .send {
        height: 3rem;
        width: 8rem;

        border: 1px solid #f0f0f0;
        border-radius: 0.7rem;
        margin: auto;
      }
    }
  }
}
</style>
