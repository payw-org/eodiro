<template>
  <div class="wrapper">
    <nuxt></nuxt>
    <eodiro-modal></eodiro-modal>
  </div>
</template>

<script>
import EodiroModal from '~/plugins/eodiro-modal/EodiroModal'

export default {
  components: { EodiroModal }
}
</script>
