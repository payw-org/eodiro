<template>
  <div class="content-item select-floor">
    <div class="cf-container">
      <p>{{ text }}</p>
    </div>
  </div>
</template>

<script>
import { LoremIpsum } from 'lorem-ipsum'

const lorem = new LoremIpsum()

export default {
  data() {
    return {
      text: lorem.generateParagraphs(50)
    }
  }
}
</script>

<style lang="scss">
.cf-container {
  max-width: 80rem;
  margin: auto;
}
</style>
