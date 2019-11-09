<template>
  <div class="eodiro-me" />
</template>

<script>
import requireAuth from '~/mixins/require-auth'
import pageBase from '~/mixins/page-base'

export default {
  mixins: [pageBase, requireAuth]
}
</script>
