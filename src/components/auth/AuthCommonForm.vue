<template>
  <div class="eodiro-auth-common-form">
    <div class="input-box">
      <h1 v-if="isSignUp" class="headline ui6-s-mb-6">
        {{ $t('auth.signUp') }}
      </h1>
      <h1 v-else class="headline ui6-s-mb-6">{{ $t('auth.signIn') }}</h1>

      <!-- Portal ID input -->
      <div class="input-id-wrapper">
        <input
          ref="portalIdInput"
          v-model="inputs.portalId"
          type="email"
          :placeholder="$t('auth.portalId')"
          :disabled="isValidating"
          class="input-id entry"
          @keydown="handleKeydown"
          @keypress.enter="enterPortalId"
          @input="validatePi"
          @focus="resetSignInFail"
        />
        <div class="email-host">@cau.ac.kr</div>
      </div>
      <p
        v-if="isSignUp && !piInfo.isValid && inputs.portalId.length > 0"
        class="error-msg"
      >
        사용할 수 없는 아이디입니다
      </p>

      <!-- Nickname input -->
      <input
        v-if="isSignUp"
        ref="nicknameInput"
        v-model="inputs.nickname"
        type="text"
        class="input-nickname entry"
        :placeholder="$t('auth.nickname')"
        :disabled="isValidating"
        @keydown="handleKeydown"
        @keypress.enter="enterNickname"
        @input="validateNn"
      />
      <p
        v-if="isSignUp && !nnInfo.isValid && inputs.nickname.length > 0"
        class="error-msg"
      >
        사용할 수 없는 닉네임입니다
      </p>

      <!-- Password input -->
      <input
        ref="passwordInput"
        v-model="inputs.password"
        type="password"
        :placeholder="$t('auth.password')"
        :disabled="isValidating"
        class="input-pw entry"
        @keypress.enter="enterPassword"
        @input="validatePw"
        @focus="resetSignInFail"
      />
      <p
        v-if="isSignUp && !pwInfo.isValid && inputs.password.length > 0"
        class="error-msg"
      >
        사용할 수 없는 패스워드입니다
      </p>

      <div v-if="isSignUp">
        <!-- Password confirmation input -->
        <input
          ref="passwordConfirmInput"
          v-model="inputs.passwordConfirm"
          type="password"
          :placeholder="$t('auth.passwordConfirm')"
          :disabled="isValidating"
          class="input-pw-confirm entry"
          @input="validatePasswordMatch"
          @keypress.enter="enterPasswordConfirm"
        />
        <p
          v-if="!isPwSame && inputs.passwordConfirm.length > 0"
          class="error-msg"
        >
          패스워드가 일치하지 않습니다.
        </p>
      </div>

      <!-- Sign in failed message -->
      <p v-if="isSignInFailed" class="error-msg">
        아이디 또는 패스워드를 확인해주세요.
      </p>

      <Button
        full
        class="process-btn entry"
        :disabled="isValidating"
        @click="process"
      >
        <span v-if="isSignUp">{{ $t('auth.signUp') }}</span>
        <span v-else>{{ $t('auth.signIn') }}</span>
      </Button>

      <NuxtLink v-if="isSignUp" class="redirect" :to="localePath('sign-in')">
        {{ $t('auth.signIn') }} →
      </NuxtLink>
      <NuxtLink v-else class="redirect" :to="localePath('sign-up')">
        {{ $t('auth.signUp') }} →
      </NuxtLink>

      <NuxtLink :to="localePath('privacy')" class="privacy-policy">
        {{ $t('privacy.title') }}
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'
import { Button } from '~/components/ui'
import ApiUrl from '~/modules/api-url'
import Auth from '~/modules/auth'
import handleInputEnter from './mixins/handle-input-enter'
import handleInput from './mixins/handle-input'

export default {
  components: { Button },
  mixins: [handleInputEnter, handleInput],
  middleware: 'require-unauth',
  props: {
    form: {
      type: String,
      default: 'sign-in',
      validator(value) {
        return ['sign-in', 'sign-up'].includes(value)
      }
    }
  },
  data() {
    return {
      inputs: {
        portalId: '',
        nickname: '',
        password: '',
        passwordConfirm: ''
      },
      pwTimeout: 0,
      isPwSame: true,
      isValidating: false,
      isSignInFailed: false
    }
  },
  computed: {
    isSignUp() {
      return this.form === 'sign-up'
    }
  },
  methods: {
    resetSignInFail() {
      this.isSignInFailed = false
    },
    /**
     * Prevent typing space character
     * @param {KeyboardEvent} e
     */
    handleKeydown(e) {
      if (e.key.match(/[@ ]/)) {
        e.preventDefault()
      }
    },
    /**
     * @param {InputEvent} e
     */
    refineNickname(e) {
      this.inputs.nickname = this.inputs.nickname.replace(/\s/g, '')
    },
    validatePasswordMatch() {
      if (this.pwTimeout) {
        window.clearTimeout(this.pwTimeout)
      }
      this.pwTimeout = window.setTimeout(() => {
        if (this.inputs.password === this.inputs.passwordConfirm) {
          this.isPwSame = true
        } else {
          this.isPwSame = false
        }
      }, 300)
    },
    /**
     * Process sign in or sign up
     */
    process() {
      if (this.isSignUp) {
        this.validatePi()
        this.validateNn()
        this.validatePw()

        if (
          !this.inputs.portalId.length === 0 ||
          !this.inputs.nickname.length === 0 ||
          !this.inputs.password.length === 0 ||
          !this.isPwSame ||
          !this.piInfo.isValid ||
          !this.nnInfo.isValid ||
          !this.pwInfo.isValid
        ) {
          alert('조건을 한 번 더 확인해주세요')
          return
        }

        // Start validation from server
        this.isValidating = true

        // Sign Up
        // Refine input data to lowercase
        const portalId = `${this.inputs.portalId.toLowerCase()}@cau.ac.kr`
        const password = this.inputs.password.toLowerCase()
        const nickname = this.inputs.nickname.toLowerCase()

        Axios({
          ...ApiUrl.user.signUp,
          data: { portalId, password, nickname }
        })
          .then((res) => {
            // Sign up success
            alert(
              '회원가입이 완료되었습니다.\nCAU 포탈에서 인증 메일을 확인해주세요!\n인증 코드는 30분동안 유효합니다.'
            )
            this.$router.replace(this.localePath('index'))
          })
          .catch((err) => {
            if (!err.response) {
              console.error('❌ API server network error')
              alert(this.$t('global.error.networkError'))
            } else {
              alert('조건을 한 번 더 확인해주세요')
            }
          })
          .finally(() => {
            // Restore validation state
            this.isValidating = false
          })
      } else {
        // Sign In
        const portalId = `${this.inputs.portalId
          .trim()
          .toLowerCase()}@cau.ac.kr`
        const password = this.inputs.password

        Axios({
          url: ApiUrl.user.signIn.url,
          method: ApiUrl.user.signIn.method,
          data: { portalId, password }
        })
          .then((res) => {
            // Sign in success
            const { data } = res
            Auth.setJwt(data.accessToken, data.refreshToken)
            this.$store.commit('SET_SIGNED_IN', true)
            this.$router.replace(this.localePath('index'))
          })
          .catch((err) => {
            if (!err.response) {
              console.error('❌ API server network error')
              alert(this.$t('global.error.networkError'))
              return
            }

            if (err.response.status === 401) {
              this.isSignInFailed = true
            }
          })
          .finally(() => {
            this.isValidating = false
          })
      }
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/main';

.input-box {
  max-width: 20rem;
  margin: auto;

  .headline {
    text-align: center;
  }

  .entry {
    text-align: center;
    margin-top: s(3);

    &.input-id {
      margin-top: 0;
    }
  }

  .input-id-wrapper {
    display: flex;

    .input-id {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      flex: 1;
      border-right: none;
    }

    .email-host {
      @include bordered;
      @include rounded;
      @include elm-fill;
      font-size: b(2);
      font-weight: fw(4);
      padding: s(3);
      line-height: lh(1);
      display: flex;
      align-items: center;
      justify-content: center;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }

  .input-pw,
  .input-pw-confirm {
    -webkit-ime-mode: active;
    -moz-ime-mode: active;
    -ms-ime-mode: active;
    ime-mode: active;
  }

  .redirect {
    display: block;
    width: 100%;
    color: #5f14be;
    text-align: center;
    margin-top: s(4);
    padding-top: s(3);
    @include separator('top');

    @include dark-mode {
      color: #987eff;
    }
  }

  .error-msg {
    color: #ff1f50;
    padding-top: s(2);
    text-align: center;
  }

  .privacy-policy {
    text-align: center;
    display: block;
    margin-top: f(1);
    @include bg-inverted;
    @include text-color-inverted;
    padding: s(3);
    border-radius: r(4);
  }
}
</style>
