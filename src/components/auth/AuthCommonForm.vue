<template>
  <div class="eodiro-auth-common-form">
    <div class="input-box">
      <input
        v-model="inputs.portalId"
        type="text"
        :placeholder="$t('auth.portalId')"
        class="input-id"
      />
      <input
        v-if="isSignUp"
        v-model="inputs.nickname"
        type="text"
        :placeholder="$t('auth.nickname')"
        @input="refineNickname"
      />
      <input
        v-model="inputs.password"
        type="password"
        :placeholder="$t('auth.password')"
        class="input-pw"
      />
      <div v-if="isSignUp">
        <input
          v-model="inputs.passwordConfirm"
          type="password"
          :placeholder="$t('auth.passwordConfirm')"
          class="input-pw-confirm"
          @input="validatePasswordMatch"
        />
        <p
          v-if="!isPwValidated && inputs.passwordConfirm.length > 0"
          class="diff-pw-msg"
        >
          패스워드가 다릅니다.
        </p>
      </div>
      <Button full class="process-btn" @click="process">
        <span v-if="isSignUp">{{ $t('auth.signUp') }}</span>
        <span v-else>{{ $t('auth.signIn') }}</span>
      </Button>
      <NuxtLink v-if="isSignUp" class="redirect" :to="localePath('signin')">
        {{ $t('auth.signIn') }}
      </NuxtLink>
      <NuxtLink v-else class="redirect" :to="localePath('signup')">
        {{ $t('auth.signUp') }}
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Axios from 'axios'
import { Button } from '~/components/ui'

export default Vue.extend({
  components: { Button },
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
      isPwValidated: true
    }
  },
  computed: {
    isSignUp(): boolean {
      return this.form === 'sign-up'
    }
  },
  methods: {
    refineNickname() {
      this.inputs.nickname = this.inputs.nickname.replace(/\s/g, '')
    },
    validatePasswordMatch(): void {
      if (this.pwTimeout) {
        window.clearTimeout(this.pwTimeout)
      }
      this.pwTimeout = window.setTimeout(() => {
        if (this.inputs.password === this.inputs.passwordConfirm) {
          this.isPwValidated = true
        } else {
          this.isPwValidated = false
        }
      }, 500)
    },
    process(): void {
      if (this.isSignUp) {
        const { portalId, password, nickname } = this.inputs
        Axios({
          url: 'https://api2.eodiro.com/auth/sign-up',
          method: 'post',
          data: { portalId, password, nickname }
        })
      } else {
        const { portalId, password } = this.inputs
        Axios({
          url: 'https://api2.eodiro.com/auth/sign-in',
          method: 'get',
          data: { portalId, password }
        })
      }
    }
  }
})
</script>

<style lang="scss">
@import '~/assets/styles/scss/main';

.input-box {
  max-width: 20rem;
  margin: auto;

  input {
    text-align: center;
    margin-bottom: s(3);
  }

  .input-pw-confirm {
    margin-bottom: 0;
  }

  .diff-pw-msg {
    margin-top: s(1);
    margin-bottom: s(3);
    text-align: center;
    color: red;
  }

  .process-btn {
    margin-top: s(3);
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
}
</style>
