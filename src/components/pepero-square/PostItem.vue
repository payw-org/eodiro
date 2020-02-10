<template>
  <ArrowBlock
    class="post-item"
    :link="
      localePath({
        name: 'pepero-square-postId',
        params: {
          postId: postData.id,
        },
      })
    "
  >
    <template v-slot:content>
      <div class="pi-content">
        <!-- <div class="pi-author">
          {{ postData.random_nickname }}
        </div> -->
        <div class="pi-title">
          {{ postData.title }}
        </div>
        <div class="pi-body">
          {{ postData.body }}
        </div>
        <div class="information">
          <div class="left">
            <div class="pi-posted-at">
              {{ postedAt }}
            </div>
            <div class="pi-random-nickname">
              {{ postData.random_nickname }}
            </div>
          </div>
          <div class="right">
            <div class="pi-comment-count">
              <IconBlocks fill="#ff3852" class="pi-cc-icon" />
              <span class="pi-cc-value">{{ postData.comment_count }}</span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </ArrowBlock>
</template>

<script>
import dayjs from 'dayjs'
import { ArrowBlock, IconBlocks } from '~/components/ui'

export default {
  components: { ArrowBlock, IconBlocks },
  props: {
    postData: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    postedAt() {
      let postedAt = dayjs(this.postData.uploaded_at).format(
        'YYYY. MM. DD. HH:mm'
      )

      const now = dayjs()
      const atObj = dayjs(this.postData.uploaded_at)

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
        postedAt = `
        ${hourDiff}${this.$t('global.time.hour')} ${this.$t('global.time.ago')}
        `

        return postedAt
      }

      if (now.year() === atObj.year()) {
        return dayjs(this.postData.uploaded_at).format('MM/DD HH:mm')
      }

      return postedAt
    },
  },
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/main';

.post-item {
  margin-top: s(4);
  min-height: unset;

  &:first-child {
    margin-top: 0;
  }

  .pi-content {
    display: block;

    .pi-author {
      display: inline-block;
      font-weight: fw(5);
      font-size: b(3);
      margin-bottom: s(2);
    }

    .pi-title,
    .pi-body {
      word-break: break-all;
    }

    .pi-title {
      font-size: b(4);
      font-weight: fw(5);
    }

    .pi-body {
      margin-top: s(1);
      font-size: b(3);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .information {
      margin-top: s(2);
      font-size: b(1);
      color: $base-gray;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;

      .left {
        display: flex;
        flex-wrap: wrap;
      }

      .right {
        .pi-comment-count {
          color: $c-step--4;
          display: flex;
          align-items: center;
          @include overlay-inverted;
          padding: s(1) s(2);
          border-radius: r(2);

          .pi-cc-icon {
            margin-right: s(1) / 2;
          }

          .pi-cc-value {
            line-height: 1.1;
            font-weight: 500;
            display: inline-block;
          }
        }
      }

      .pi-posted-at {
        margin-right: s(3);
      }

      .pi-random-nickname {
      }
    }
  }
}
</style>
