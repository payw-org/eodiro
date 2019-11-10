<template>
  <div id="eodiro-me">
    <h1 class="title">
      마이페이지
    </h1>
    <Button class="sign-out-btn" @click="signOut">
      로그아웃
    </Button>
    <p class="manifesto" />
  </div>
</template>

<script>
import pageBase from '~/mixins/page-base'
import Button from '~/components/ui/basic/Button'
import Auth from '~/modules/auth'

export default {
  name: 'me',
  middleware: 'require-auth',
  components: { Button },
  mixins: [pageBase],
  methods: {
    signOut() {
      this.$store.commit('SET_SIGNED_IN', false)
      Auth.clearJwt()
      this.$router.replace(this.localePath('index'))
    }
  }
}
</script>

<style lang="scss">
#eodiro-me {
  max-width: 40rem !important;

  .sign-out-btn {
    margin-top: 1rem;
  }

  .manifesto {
    margin-top: 1rem;
  }
}
</style>
