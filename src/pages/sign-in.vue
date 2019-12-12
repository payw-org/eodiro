<template>
  <AuthCommonForm form="sign-in" page-mode="signIn" />
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
  name: 'sign-in',
  components: { AuthCommonForm },
  mixins: [pageBase]
}
</script>
