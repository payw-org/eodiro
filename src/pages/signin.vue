<template>
  <AuthCommonForm form="sign-in" />
</template>

<script>
import pageBase from '~/mixins/page-base'
import AuthCommonForm from '~/components/auth/AuthCommonForm'
import autohead from '~/modules/autohead'

export default {
  head() {
    return {
      title: this.$t('auth.signIn'),
      meta: [...autohead(this.$t('auth.signIn'))]
    }
  },
  name: 'signin',
  components: { AuthCommonForm },
  mixins: [pageBase]
}
</script>
