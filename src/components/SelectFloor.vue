<template>
  <div class="content-item select-floor">
    <h1>Select floor from {{ $route.params.buildingID }}</h1>
    <router-link to="/buildings">Go back to building selection</router-link>
    <p>{{ text }}</p>
  </div>
</template>

<script>
import { LoremIpsum } from 'lorem-ipsum'

const lorem = new LoremIpsum()

export default {
  data() {
    return {
      text: lorem.generateParagraphs(10)
    }
  }
}
</script>
