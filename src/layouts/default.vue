<template>
  <div>
    <nuxt id="app"></nuxt>
    <eodiro-modal></eodiro-modal>
  </div>
</template>

<script>
import EodiroModal from '~/plugins/eodiro-modal/EodiroModal'

export default {
  components: { EodiroModal }
}
</script>

