<template>
  <AuthCommonForm form="sign-up" />
</template>

<script>
import pageBase from '~/mixins/page-base'
import AuthCommonForm from '~/components/auth/AuthCommonForm'
import autoHead from '~/modules/auto-head'

export default {
  head() {
    return {
      title: this.$t('auth.signUp'),
      meta: [...autoHead(this.$t('auth.signUp'))]
    }
  },
  name: 'sign-up',
  components: { AuthCommonForm },
  mixins: [pageBase]
}
</script>
