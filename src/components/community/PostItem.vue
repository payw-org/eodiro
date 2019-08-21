<template>
  <ArrowBlock
    class="post-item"
    :link="localePath({
      name: 'community-postId',
      params: {
        postId: postData.id
      }
    })"
  >
    <template v-slot:content>
      <div class="pi-content">
        <div class="pi-author">
          {{ postData.author }}
        </div>
        <div class="pi-title">
          {{ postData.title }}
        </div>
      </div>
    </template>
  </ArrowBlock>
</template>

<script>
import { ArrowBlock } from '~/components/ui'

export default {
  components: { ArrowBlock },
  props: {
    postData: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/main';

.post-item {
  margin-bottom: space(4);
  min-height: unset;

  .pi-content {
    display: block;
  }
}
</style>
