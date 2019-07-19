<template>
  <div>
    <new-home />
  </div>
</template>

<script>
import Home from '~/components/home/Home'
import NewHome from '~/components/home/NewHome'
import Modal from '~/plugins/eodiro-modal'

export default {
  components: { Home, NewHome },
  mounted() {
    const modal = new Modal()
  }
}
</script>
