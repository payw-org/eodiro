<template>
  <div id="eodiro-verification" />
</template>

<script>
import Axios from 'axios'
import apiUrl from '~/modules/api-url'

export default {
  mounted() {
    const token = this.$route.query.token
    if (!token) {
      location.replace('/')
    }

    // TODO: replace with authApi module
    Axios({
      ...apiUrl.user.verify,
      data: {
        token,
      },
    })
      .then(() => {
        // Verify success
        alert('🎉 인증되었습니다!')
        this.$router.replace(this.localePath('sign-in'))
      })
      .catch(() => {
        alert('이미 인증되었거나 만료된 인증 코드입니다.')
        this.$router.replace(this.localePath('sign-up'))
      })
  },
}
</script>
