<template>
  <AuthCommonForm page-mode="signUp" />
</template>

<script>
import pageBase from '~/mixins/page-base'
import AuthCommonForm from '~/components/auth/AuthCommonForm'
import autoHead from '~/modules/auto-head'

export default {
  name: 'sign-up',
  components: { AuthCommonForm },
  mixins: [pageBase],
  head() {
    return {
      title: this.$t('auth.signUp'),
      meta: [...autoHead(this.$t('auth.signUp'))],
    }
  },
}
</script>
