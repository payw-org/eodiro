<template>
  <AuthCommonForm form="sign-in" />
</template>

<script>
import pageBase from '~/mixins/page-base'
import AuthCommonForm from '~/components/auth/AuthCommonForm'

export default {
  name: 'signin',
  components: { AuthCommonForm },
  mixins: [pageBase]
}
</script>
