<template>
  <div id="eodiro-me">
    <section class="info-section registration-information">
      <h2 class="section-title">
        {{ $t('me.information') }}
      </h2>
      <Grid proportion="small" gap="small">
        <div>
          <div class="info-block">
            <h3 class="ib-title">
              {{ $t('me.portalEmailId') }}
            </h3>
            <p class="ib-body">
              {{ myInfo.portal_id }}
            </p>
          </div>
        </div>
        <div>
          <div class="info-block">
            <h3 class="ib-title">
              {{ $t('me.nickname') }}
            </h3>
            <p class="ib-body">
              {{ myInfo.nickname }}
            </p>
          </div>
        </div>
        <div>
          <div class="info-block">
            <h3 class="ib-title">
              {{ $t('me.randomNickname') }}
            </h3>
            <p class="ib-body">
              {{ myInfo.random_nickname }}
            </p>
          </div>
        </div>
      </Grid>
    </section>

    <!-- Email Subscriptions -->
    <section class="info-section mail-subscription ui6-s-mt-5">
      <h2 class="section-title">
        <!-- Localization -->
        이메일 알림
      </h2>
      <div class="ms-item ms-comment flex align-center">
        <input
          id="comment-subscription"
          type="checkbox"
          name="comment-subscription"
        />
        <!-- Localization -->
        <label for="comment-subscription">댓글 알림</label>
      </div>
    </section>

    <!-- My Posts -->
    <section class="info-section">
      <h2 class="section-title">
        나의 포스트
      </h2>
      <div class="my-posts">
        <div v-for="post in myPosts" :key="post.id" class="my-post-item">
          <ArrowBlock
            :link="
              localePath({
                name: 'pepero-square-postId',
                params: {
                  postId: post.id,
                },
              })
            "
            fit
            @click="showTopbar"
          >
            <template v-slot:content>
              <h1 class="post-title">
                {{ post.title }}
              </h1>
              <p class="post-body">
                {{ post.body }}
              </p>
            </template>
          </ArrowBlock>
        </div>
      </div>
    </section>

    <section class="info-section">
      <h2 class="section-title">
        나의 댓글
      </h2>
    </section>

    <div class="sign-out-section ui6-f-mt-3">
      <div>
        <!-- <Button class="sign-out-btn" full @click="signOut">
          {{ $t('me.signOut') }}
        </Button> -->
        <EodiroLink :hook="signOut" :to="localePath('index')" replace>
          <Button class="sign-out-btn" full @click="signOut">
            {{ $t('me.signOut') }}
          </Button>
        </EodiroLink>
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
import Auth from '~/modules/auth'
import apiUrl from '~/modules/api-url'
import autoHead from '~/modules/auto-head'
import requireAuthMixin from '~/mixins/require-auth-mixin'
import useAxios from '~/modules/use-axios'
import { UserApi } from '~/modules/eodiro-api'
import { Button, Grid, ArrowBlock } from '~/components/ui'
import { isCached } from '~/modules/nuxt/is-cached'
import EodiroLink from '~/components/global/EodiroLink'

export default {
  name: 'me',
  components: { Button, Grid, ArrowBlock, EodiroLink },
  mixins: [pageBase, requireAuthMixin],
  async asyncData({ app, req, res, store, route }) {
    if (!store.state.auth.isSignedIn) return

    if (isCached(store, route)) return

    const userApi = new UserApi()
    const myInfo = await userApi.getUserInfo({ req, res })
    const myPosts = await userApi.myPosts({
      http: { req, res },
      amount: 5,
    })

    return { myInfo: myInfo || {}, myPosts: myPosts || {} }
  },
  data() {
    return {
      myInfo: {},
      myPosts: {},
    }
  },
  methods: {
    signOut() {
      this.$store.commit('SET_SIGNED_IN', false)
      Auth.clearJwt()
      // this.$router.replace(this.localePath('index'))
    },
    async signOutFromAll() {
      const [err] = await useAxios({
        ...apiUrl.user.clearToken,
        headers: {
          accessToken: Auth.getAccessToken(),
        },
      })

      if (err) {
        console.error(err)
        alert(this.$t('global.error.networkError'))
      } else {
        this.$store.commit('SET_SIGNED_IN', false)
        Auth.clearJwt()
        this.$router.replace(this.localePath('sign-in'))
      }
    },
  },
  head() {
    return {
      title: this.$t('me.title'),
      meta: [...autoHead(this.$t('me.title'))],
    }
  },
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/main';

#eodiro-me {
  max-width: 40rem !important;

  .title {
    @include resolve-optical-illusion;
  }

  .info-section {
    margin-top: s(6);

    .section-title {
      font-size: h(1);
      margin-bottom: s(3);
      @include resolve-optical-illusion;
    }

    .info-block {
      @include elm-fill;
      @include rounded;
      padding: s(3);

      .ib-title {
        font-size: b(3);
      }

      .ib-body {
        font-size: b(2);
        margin-top: s(2);
      }
    }

    .my-posts {
      .my-post-item {
        position: relative;
        margin-top: s(3);

        .post-title {
          font-size: b(3);
          font-weight: fw(5);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .post-body {
          font-size: b(2);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-top: s(2);
          line-height: 1;
          color: $base-gray;
        }
      }
    }
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
