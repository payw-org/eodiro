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
      } else if (this.$store.state.routeDirection === 'forward') {
        this.isHidden = false
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
  @include text-color;
  background-color: #fff;
  cursor: pointer;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 50%;
  bottom: 4rem;
  padding: 0 1rem;
  height: 2.7rem;
  opacity: 1;
  transform: translateX(-50%) scale(1);
  border-radius: 50px;
  box-shadow: 0 0.12rem 0.4rem rgba(#000, 0.2);
  font-size: 1rem;
  font-weight: 500;
  transition: transform 300ms ease, opacity 300ms ease,
    background-color $color-scheme-transition-time ease;

  @include dark-mode {
    background-color: #444;
  }

  &.hidden {
    transform: translateX(-50%) scale(0.9);
    opacity: 0;
  }

  .icon {
    width: 0.5rem;
    height: 1rem;
    margin-right: 0.5rem;
    transform: scaleX(-1);

    @include bgImg(
      '~assets/images/eodiro/arrow_right_black.svg',
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
}
</style>
