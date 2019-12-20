<template>
  <div id="eodiro-me">
    <h1 class="title ui6-fw-6">
      {{ $t('me.title') }}
    </h1>

    <section class="registration-information ui6-s-mt-5">
      <h2 class="ui6-h-2 ui6-s-mb-3">
        {{ $t('me.information') }}
      </h2>
      <h3 class="ui6-b-4">
        {{ $t('me.portalEmailId') }}
      </h3>
      <p>{{ myInfo.portal_id }}</p>
      <h3 class="ui6-b-4 ui6-s-mt-2">
        {{ $t('me.nickname') }}
      </h3>
      <p>{{ myInfo.nickname }}</p>
      <h3 class="ui6-b-4 ui6-s-mt-2">
        {{ $t('me.randomNickname') }}
      </h3>
      <p>{{ myInfo.random_nickname }}</p>
    </section>

    <section class="mail-subscription ui6-s-mt-5">
      <h2 class="ui6-h-2">
        이메일 알림
      </h2>
      <div class="ms-item ms-comment flex align-center">
        <input
          id="comment-subscription"
          type="checkbox"
          name="comment-subscription"
        />
        <label for="comment-subscription">댓글 알림</label>
      </div>
    </section>

    <div class="sign-out-section ui6-f-mt-3">
      <div>
        <Button class="sign-out-btn" full @click="signOut">
          {{ $t('me.signOut') }}
        </Button>
      </div>

      <div>
        <Button class="sign-out-all-btn" full @click="signOutFromAll">
          {{ $t('me.signOutFromAll') }}
        </Button>
      </div>
    </div>
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
import { UserApi } from '~/modules/eodiro-api'

export default {
  name: 'me',
  components: { Button },
  mixins: [pageBase, requireAuthMixin],
  async asyncData({ app, req, res, store }) {
    if (!store.state.auth.isSignedIn) return

    const myInfo = await UserApi.getUserInfo({ req, res })

    return myInfo ? { myInfo } : undefined
  },
  data() {
    return {
      myInfo: {}
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
  },
  head() {
    return {
      title: this.$t('me.title'),
      meta: [...autoHead(this.$t('me.title'))]
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/main';

#eodiro-me {
  max-width: 40rem !important;

  .manifesto {
    margin-top: 1rem;
  }

  .mail-subscription {
    .ms-item {
      margin-top: s(3);

      input {
      }

      label {
        padding-left: s(2);
        font-size: b(3);
      }
    }
  }

  .sign-out-section {
    @include separator('top');
    padding-top: s(5);
    display: grid;
    gap: s(3);
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  }
}
</style>
