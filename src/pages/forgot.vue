<template>
  <AuthCommonForm page-mode="forgot" />
</template>

<script>
import pageBase from '~/mixins/page-base'
import AuthCommonForm from '~/components/auth/AuthCommonForm'
import autoHead from '~/modules/auto-head'

export default {
  head() {
    return {
      title: this.$t('auth.signIn'),
      meta: [...autoHead(this.$t('auth.signIn'))]
    }
  },
  name: 'forgot',
  components: { AuthCommonForm },
  mixins: [pageBase]
}
</script>
