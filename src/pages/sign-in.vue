<template>
  <AuthCommonForm page-mode="signIn" />
</template>

<script>
import pageBase from '~/mixins/page-base'
import AuthCommonForm from '~/components/auth/AuthCommonForm'
import autoHead from '~/modules/auto-head'

export default {
  name: 'sign-in',
  components: { AuthCommonForm },
  mixins: [pageBase],
  head() {
    return {
      title: this.$t('auth.signIn'),
      meta: [...autoHead(this.$t('auth.signIn'))],
    }
  },
}
</script>
