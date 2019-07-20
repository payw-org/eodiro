<template>
  <new-home />
</template>

<script>
import NewHome from '~/components/home/NewHome'
import Modal from '~/plugins/eodiro-modal'

export default {
  components: { NewHome },
  mounted() {
    const modal = new Modal()
  }
}
</script>
