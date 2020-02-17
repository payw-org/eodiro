<template>
  <div class="eodiro-auth-common-form">
    <div class="input-box">
      <!-- Portal ID input -->
      <div class="input-id-wrapper">
        <input
          ref="portalIdInput"
          v-model="inputs.portalId"
          type="text"
          :placeholder="$t('auth.portalId')"
          :disabled="isValidating"
          class="input-id entry"
          spellcheck="false"
          autofocus
          @keydown="handleKeydown"
          @keypress.enter="enterPortalId"
          @input="validatePi"
          @focus="resetSignInFail"
        />
        <div class="email-host">
          @cau.ac.kr
        </div>
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
        v-if="!isForgot"
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

      <!-- Password confirmation input -->
      <input
        v-if="isSignUp"
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

      <!-- Sign in failed message -->
      <p v-if="isSignInFailed" class="error-msg">
        아이디 또는 패스워드를 확인해주세요.
      </p>

      <!-- Process button -->
      <Button
        full
        class="process-btn entry"
        :disabled="isValidating"
        @click="process"
      >
        <!-- Different button lables -->
        <span v-if="isSignUp">{{ $t('auth.signUp') }}</span>
        <span v-else-if="isSignIn">{{ $t('auth.signIn') }}</span>
        <span v-else-if="isForgot">{{ $t('auth.reissue') }}</span>
      </Button>

      <div>
        <!-- Redirect to sign in -->
        <NuxtLink v-if="!isSignIn" class="redirect" :to="localePath('sign-in')">
          {{ $t('auth.signIn') }} →
        </NuxtLink>

        <!-- Redirect to sign up -->
        <NuxtLink v-if="!isSignUp" class="redirect" :to="localePath('sign-up')">
          {{ $t('auth.signUp') }} →
        </NuxtLink>

        <!-- Forgot password -->
        <NuxtLink v-if="isSignIn" :to="localePath('forgot')" class="redirect">
          {{ $t('auth.didYouForgot') }}
        </NuxtLink>

        <!-- Privacy policy -->
        <NuxtLink :to="localePath('privacy')" class="redirect">
          {{ $t('privacy.title') }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import handleInputEnter from './mixins/handle-input-enter'
import handleInput from './mixins/handle-input'
import { Button } from '~/components/ui'
import Auth from '~/modules/auth'
import { AuthApi } from '~/modules/eodiro-api'
import EodiroDialog from '~/modules/eodiro-dialog'

export default {
  components: { Button },
  mixins: [handleInputEnter, handleInput],
  middleware: 'require-unauth',
  props: {
    pageMode: {
      type: String,
      default: 'signIn',
      validator(mode) {
        return ['signIn', 'signUp', 'forgot'].includes(mode)
      },
    },
  },
  data() {
    return {
      inputs: {
        portalId: '',
        nickname: '',
        password: '',
        passwordConfirm: '',
      },
      pwTimeout: 0,
      isPwSame: true,
      isValidating: false,
      isSignInFailed: false,
    }
  },
  computed: {
    isSignIn() {
      return this.pageMode === 'signIn'
    },
    isSignUp() {
      return this.pageMode === 'signUp'
    },
    isForgot() {
      return this.pageMode === 'forgot'
    },
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
      if (e && e.key && e.key.match(/[@ ]/)) {
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
    async process() {
      if (this.isSignUp) {
        this.validatePi()
        this.validateNn()
        this.validatePw()

        if (
          this.inputs.portalId.length === 0 ||
          this.inputs.nickname.length === 0 ||
          this.inputs.password.length === 0 ||
          this.inputs.passwordConfirm.length === 0 ||
          !this.isPwSame ||
          !this.piInfo.isValid ||
          !this.nnInfo.isValid ||
          !this.pwInfo.isValid
        ) {
          await new EodiroDialog().alert(this.$t('auth.checkFields'))
          return
        }

        // Start validation from server
        this.isValidating = true

        const isSignedUp = await new AuthApi().signUp(
          this.inputs.portalId,
          this.inputs.nickname,
          this.inputs.password
        )
        if (isSignedUp) {
          new EodiroDialog().alert(this.$t('auth.signUpSuccess'))
          this.$router.replace(this.localePath('index'))
        } else {
          await new EodiroDialog().alert(this.$t('auth.checkFields'))
        }

        // Restore validation state
        this.isValidating = false
      } else {
        this.isValidating = true

        // Sign In
        const portalId = `${this.inputs.portalId
          .trim()
          .toLowerCase()}@cau.ac.kr`
        const password = this.inputs.password

        // Use UserApi module
        const signInResult = await new AuthApi().signIn(portalId, password)
        if (signInResult) {
          // Sign in success
          Auth.setJwt(signInResult.accessToken, signInResult.refreshToken)
          this.$store.commit('SET_SIGNED_IN', true)
          this.$router.replace(this.localePath('index'))
        } else {
          this.isSignInFailed = true
        }

        this.isValidating = false
      }
    },
  },
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
    padding: s(3) 0;
    font-size: b(3);
    @include separator('top');

    @include dark-mode {
      color: #987eff;
    }

    &:first-child {
      margin-top: f(2);
    }

    &:last-child {
      @include separator('bottom');
    }
  }

  .error-msg {
    color: #ff1f50;
    padding-top: s(2);
    text-align: center;
  }
}
</style>
