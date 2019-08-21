<template>
  <div class="post-details">
    {{ $route.params.postId }}
  </div>
</template>

<script>
import pageBase from '~/mixins/page-base'

export default {
  name: 'community-post-id',
  mixins: [pageBase]
}
</script>
