<template>
  <div>{{ $route.params.topic }}</div>
</template>

<script>
import EodiroPageBase from '~/components/EodiroPageBase.vue'

export default {
  name: 'clubs-topic',
  extends: EodiroPageBase,
  meta: {
    depth: 2
  }
}
</script>
