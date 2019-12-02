<template>
  <div id="eodiro-me">
    <h1 class="title ui6-fw-6 ui6-s-mb-4">
      {{ $t('me.title') }}
    </h1>

    <div class="registration-information">
      <h2 class="ui6-h-1 ui6-s-mb-3">
        {{ $t('me.information') }}
      </h2>
      <h3 class="ui6-b-3">
        {{ $t('me.portalEmailId') }}
      </h3>
      <p>{{ myInfo.portal_id }}</p>
      <h3 class="ui6-b-3 ui6-s-mt-2">
        {{ $t('me.nickname') }}
      </h3>
      <p>{{ myInfo.nickname }}</p>
      <h3 class="ui6-b-3 ui6-s-mt-2">
        {{ $t('me.randomNickname') }}
      </h3>
      <p>{{ myInfo.random_nickname }}</p>
    </div>

    <Button class="sign-out-btn ui6-s-mb-3" full @click="signOut">
      {{ $t('me.signOut') }}
    </Button>

    <Button class="sign-out-all-btn" full @click="signOutFromAll">
      {{ $t('me.signOutFromAll') }}
    </Button>
    <p class="manifesto" />
  </div>
</template>

<script>
import pageBase from '~/mixins/page-base'
import Button from '~/components/ui/basic/Button'
import Auth from '~/modules/auth'
import apiUrl from '~/modules/api-url'
import autoHead from '~/modules/auto-head'
import requireAuthMixin from '~/mixins/require-auth-mixin'
import useAxios from '~/modules/use-axios'

export default {
  name: 'me',
  components: { Button },
  mixins: [pageBase, requireAuthMixin],
  head() {
    return {
      title: this.$t('me.title'),
      meta: [...autoHead(this.$t('me.title'))]
    }
  },
  data() {
    return {
      myInfo: {}
    }
  },
  async asyncData({ app, req, res, store }) {
    if (!store.state.auth.isSignedIn) return

    const [err, axRes] = await useAxios({
      ...apiUrl.user.information,
      headers: {
        accessToken: Auth.getAccessToken({ req, res })
      }
    })

    if (err) {
      console.error(app.i18n.t('global.error.networkError'))
    } else {
      return {
        myInfo: axRes.data
      }
    }
  },
  methods: {
    signOut() {
      this.$store.commit('SET_SIGNED_IN', false)
      Auth.clearJwt()
      this.$router.replace(this.localePath('index'))
    },
    async signOutFromAll() {
      const [err] = await useAxios({
        ...apiUrl.user.clearToken,
        headers: {
          accessToken: Auth.getAccessToken()
        }
      })

      if (err) {
        console.error(err)
        alert(this.$t('global.error.networkError'))
      } else {
        this.$store.commit('SET_SIGNED_IN', false)
        Auth.clearJwt()
        this.$router.replace(this.localePath('sign-in'))
      }
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
