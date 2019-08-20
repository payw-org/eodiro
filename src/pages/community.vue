<template>
  <NuxtChild />
</template>

<script>
import pageBase from '~/mixins/page-base'

export default {
  name: 'community',
  meta: {
    hamletName: 'community'
  },
  mixins: [pageBase]
}
</script>
