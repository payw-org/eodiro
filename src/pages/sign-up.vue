<template>
  <AuthCommonForm form="sign-up" />
</template>

<script>
import pageBase from '~/mixins/page-base'
import AuthCommonForm from '~/components/auth/AuthCommonForm'
import autohead from '~/modules/autohead'

export default {
  head() {
    return {
      title: this.$t('auth.signUp'),
      meta: [...autohead(this.$t('auth.signUp'))]
    }
  },
  name: 'sign-up',
  components: { AuthCommonForm },
  mixins: [pageBase]
}
</script>
