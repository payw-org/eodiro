<i18n>
{
  "kr": {
    "go_back": "뒤로가기"
  },
  "en": {
    "go_back": "Go Back"
  }
}
</i18n>

<template>
  <transition name="fade">
    <nuxt-link
      class="prev-link"
      v-if="$store.state.prevPath"
      :to="localePath($store.state.prevPath)"
    >
      <button id="go-back" :class="{ hidden: isHidden }">
        <span class="icon"></span>
        {{ $t('go_back') }}
      </button>
    </nuxt-link>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      isHidden: false,
      scrollEventCallback: null
    }
  },
  watch: {
    $route() {
      if (this.$store.state.routeDirection === 'backward') {
        window.removeEventListener('scroll', this.scrollEventCallback)

        window.$nuxt.$once('triggerScroll', () => {
          setTimeout(() => {
            window.addEventListener('scroll', this.scrollEventCallback)
          }, 50)
        })
      }
    }
  },
  mounted() {
    const that = this
    this.scrollEventCallback = function(e) {
      if (
        this.oldScroll > this.scrollY &&
        window.innerHeight + this.scrollY < document.body.scrollHeight
      ) {
        // up
        that.isHidden = false
      } else if (this.scrollY > 0) {
        // down
        that.isHidden = true
      }
      this.oldScroll = this.scrollY
    }

    window.addEventListener('scroll', this.scrollEventCallback)
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/global-variables.scss';
@import '~/assets/styles/scss/global-mixins.scss';
@import '~/assets/styles/scss/eodiro-ui.scss';

#go-back {
  cursor: pointer;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 50%;
  bottom: 4rem;
  padding: 0 1rem;
  height: 3rem;
  opacity: 1;
  transform: translateX(-50%) scale(1);
  background-color: #fff;
  border-radius: 50px;
  box-shadow: 0 0.15rem 0.5rem rgba(#000, 0.2);
  font-size: 1rem;
  font-weight: 500;
  transition: transform 300ms ease, opacity 300ms ease;

  &.hidden {
    // transform: translateX(-50%) translateY(6rem);
    transform: translateX(-50%) scale(0.9);
    opacity: 0;
  }

  .icon {
    width: 0.6rem;
    height: 1rem;
    margin-right: 0.5rem;
    transform: scaleX(-1);

    @include bgImg(
      '~assets/images/eodiro/arrow_right_step4.svg',
      center,
      contain
    );

    @include dark-mode {
      @include bgImg(
        '~assets/images/eodiro/arrow_right_white.svg',
        center,
        contain
      );
    }
  }

  @include dark-mode {
    background-color: $c-step--4;
    color: $base-white;
  }
}
</style>
