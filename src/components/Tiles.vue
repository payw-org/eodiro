<template>
  <div class="Tiles-container">
    <div v-for="item in items" :key="item.id + item.time + item.from">{{ item.message }}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          message: 'AAA',
          time: '',
          from: ''
        },
        {
          message: 'BBB',
          time: '',
          from: ''
        }
      ]
    }
  }
}
</script>
<style lang="sass">

</style>
