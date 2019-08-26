<template>
  <ArrowBlock
    class="post-item"
    :link="
      localePath({
        name: 'community-postId',
        params: {
          postId: postData.id
        }
      })
    "
  >
    <template v-slot:content>
      <div class="pi-content">
        <div class="pi-author">
          {{ postData.author }}
        </div>
        <div class="pi-title">
          {{ postData.title }}
        </div>
        <div class="pi-posted-at">
          {{ postedAt }}
        </div>
      </div>
    </template>
  </ArrowBlock>
</template>

<script>
import dayjs from 'dayjs'
import { ArrowBlock } from '~/components/ui'

export default {
  components: { ArrowBlock },
  props: {
    postData: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    postedAt() {
      let postedAt = dayjs(this.postData.at).format('YYYY. MM. DD. HH:mm')

      const now = dayjs()
      const atObj = dayjs(this.postData.at)

      const secDiff = now.diff(atObj, 'second')
      if (secDiff < 10) {
        postedAt = this.$t('global.time.now')

        return postedAt
      } else if (secDiff < 60) {
        postedAt = `
        ${secDiff}${this.$t('global.time.second')} ${this.$t('global.time.ago')}
        `

        return postedAt
      }

      const minDiff = now.diff(atObj, 'minute')
      if (minDiff > 0 && minDiff < 60) {
        postedAt = `
        ${minDiff}${this.$t('global.time.minute')} ${this.$t('global.time.ago')}
        `

        return postedAt
      }

      const hourDiff = now.diff(atObj, 'hour')
      if (hourDiff > 0 && hourDiff < 24) {
        postedAt = `${hourDiff}시간 전`

        return postedAt
      }

      return postedAt
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/main';

.post-item {
  margin-top: space(4);
  min-height: unset;

  &:first-child {
    margin-top: 0;
  }

  .pi-content {
    display: block;

    .pi-author {
      display: inline-block;
      font-weight: fw(5);
      font-size: body(3);
      margin-bottom: space(2);
    }

    .pi-title {
      font-size: body(3);
    }

    .pi-posted-at {
      font-size: body(1);
      color: $base-gray;
      margin-top: space(2);
    }
  }
}
</style>
