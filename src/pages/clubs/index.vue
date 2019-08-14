<template>
  <div class="clubs-topics">
    <Grid proportion="small">
      <nuxt-link
        :to="localePath({
          name: 'clubs-topic',
          params: {
            topic: 'all'
          }
        })"
      >
        <ArrowBlock class="ct-item">
          <template v-slot:icon>
            <span class="icon icon--all" />
          </template>
          <template v-slot:content>
            <h1 class="topic-name">
              {{ $t('global.seeAll') }}
            </h1>
          </template>
        </ArrowBlock>
      </nuxt-link>
      <nuxt-link
        v-for="topic in topics"
        :key="topic.name"
        :to="localePath({
          name: 'clubs-topic',
          params: {
            topic: topic.url
          }
        })"
      >
        <ArrowBlock class="ct-item">
          <template v-slot:icon>
            <span class="icon" :class="`icon--${topic.url}`" />
          </template>
          <template v-slot:content>
            <h1 class="topic-name">
              {{ topic.name }}
            </h1>
          </template>
        </ArrowBlock>
      </nuxt-link>
    </Grid>
  </div>
</template>

<script>
import EodiroPageBase from '~/components/global/EodiroPageBase.vue'
import { Grid, ArrowBlock } from '~/components/ui'

export default {
  name: 'clubs-index',
  components: { Grid, ArrowBlock },
  extends: EodiroPageBase,
  meta: {
    depth: 1
  },
  data () {
    return {
      topics: [
        {
          name: '스포츠',
          url: 'sports'
        },
        {
          name: '음악',
          url: 'music'
        },
        {
          name: '미술',
          url: 'art'
        },
        {
          name: '종교',
          url: 'religion'
        },
        {
          name: '학술',
          url: 'scholarship'
        },
        {
          name: '봉사',
          url: 'service'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/main.scss';

.clubs-topics {
  .ct-item {
    .icon {
      margin-right: $slight-gap;
      $icon-size: 1.7rem;
      width: $icon-size;
      height: $icon-size;
    }

    .icon--all {
      background-image: url('~assets/images/eodiro/list.svg');

      @include dark-mode {
        background-image: url('~assets/images/eodiro/list-white.svg');
      }
    }

    .icon--art {
      background-image: url('~assets/images/eodiro/clubs/palette-black.svg');

      @include dark-mode {
        background-image: url('~assets/images/eodiro/clubs/palette-white.svg');
      }
    }

    .icon--scholarship {
      background-image: url('~assets/images/eodiro/clubs/scholarship-black.svg');

      @include dark-mode {
        background-image: url('~assets/images/eodiro/clubs/scholarship-white.svg');
      }
    }

    .icon--religion {
      background-image: url('~assets/images/eodiro/clubs/religion-black.svg');

      @include dark-mode {
        background-image: url('~assets/images/eodiro/clubs/religion-white.svg');
      }
    }

    .icon--service {
      background-image: url('~assets/images/eodiro/clubs/sprout-black.svg');

      @include dark-mode {
        background-image: url('~assets/images/eodiro/clubs/sprout-white.svg');
      }
    }

    .icon--sports {
      background-image: url('~assets/images/eodiro/clubs/baseball-black.svg');

      @include dark-mode {
        background-image: url('~assets/images/eodiro/clubs/baseball-white.svg');
      }
    }

    .icon--music {
      background-image: url('~assets/images/eodiro/clubs/note-black.svg');

      @include dark-mode {
        background-image: url('~assets/images/eodiro/clubs/note-white.svg');
      }
    }

    .topic-name {
      font-weight: 500;
      font-size: 1.2rem;
    }
  }
}
</style>
