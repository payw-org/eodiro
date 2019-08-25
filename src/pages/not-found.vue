<template>
  <div />
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  middleware({ error }) {
    error({
      statusCode: 404
    })
  }
})
</script>
