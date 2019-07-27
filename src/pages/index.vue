<template>
  <home-main />
</template>

<script>
import EodiroPageBase from '~/components/EodiroPageBase.vue'
import HomeMain from '~/components/home/HomeMain.vue'

export default {
  name: 'home',
  extends: EodiroPageBase,
  components: { HomeMain },
  meta: {
    depth: 0,
    appName: 'home'
  },
  mounted() {}
}
</script>
