<template>
  <div id="go-back-wrapper">
    <div v-show="prevRouteName" id="go-back" :class="{ hidden: isHidden }">
      <EodiroLink
        :to="jumpLink"
        class="jump-link"
        :class="{ exists: isJumpExists }"
      >
        <button class="jump-btn" />
      </EodiroLink>

      <EodiroLink
        class="prev-link"
        :to="prevRouteName ? localePath(prevRouteName) : localePath('index')"
      >
        <button class="prev-btn">
          <span class="icon" />
          {{ $t('global.goBack') }}
        </button>
      </EodiroLink>

      <EodiroLink :to="localePath('index')">
        <button class="go-home" />
      </EodiroLink>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { CEM } from '~/modules/custom-event-manager'
import EodiroLink from '~/components/global/EodiroLink'

export default {
  components: { EodiroLink },
  data() {
    return {
      isHidden: false,
      scrollEventCallback: null,
    }
  },
  computed: {
    prevRouteName() {
      return this.$route.meta.prevRouteName
    },
    ...mapState({
      jumpHistory: (state) => state.jumpHistory,
    }),
    isJumpExists() {
      return this.jumpHistory.length > 0
    },
    jumpLink() {
      return this.isJumpExists
        ? this.localePath(this.jumpHistory[this.jumpHistory.length - 1])
        : ''
    },
  },
  mounted() {
    const that = this // alias

    // Create scroll event callback function
    this.scrollEventCallback = function() {
      if (!this.anchor || this.anchor > this.scrollY) {
        this.anchor = this.scrollY
      }

      if (
        this.oldScroll > this.scrollY &&
        window.innerHeight + this.scrollY < document.body.scrollHeight
      ) {
        // Scroll up
        if (that.isHidden) {
          // Dispatch scroll up custom event
          CEM.dispatchEvent('gobackbtnappeared')
        }

        // Show go back button
        that.isHidden = false
        this.anchor = this.scrollY
      } else if (this.anchor < this.scrollY - 100) {
        // Scroll down
        if (!that.isHidden) {
          // Dispatch scroll down custom event
          CEM.dispatchEvent('gobackbtnhidden')
        }

        // Hide go back button
        that.isHidden = true

        // When the scroll hits the bottom
        if (window.innerHeight + this.scrollY >= document.body.scrollHeight) {
          if (that.isHidden) {
            // Dispatch scroll up custom event
            CEM.dispatchEvent('gobackbtnappeared')
          }

          that.isHidden = false
        }
      }

      // else if (this.scrollY > 0) {
      //   // Scroll down
      //   if (!that.isHidden) {
      //     // Dispatch scroll down custom event
      //     CEM.dispatchEvent('gobackbtnhidden')
      //   }

      //   // Hide go back button
      //   that.isHidden = true

      //   // When the scroll hits the bottom
      //   if (window.innerHeight + this.scrollY >= document.body.scrollHeight) {
      //     if (that.isHidden) {
      //       // Dispatch scroll up custom event
      //       CEM.dispatchEvent('gobackbtnappeared')
      //     }

      //     that.isHidden = false
      //   }
      // }

      this.oldScroll = this.scrollY
    }

    // Add scroll event listener for the first time
    window.addEventListener('scroll', this.scrollEventCallback)

    const goBackElm = document.getElementById('go-back')

    // Remove scroll event when go back
    CEM.addEventListener('beforepageleave', goBackElm, () => {
      window.removeEventListener('scroll', this.scrollEventCallback)
    })

    // When route changes(page move),
    // add scroll event listener again
    // to determine the visibility of goback element
    CEM.addEventListener('scrollrestored', goBackElm, () => {
      window.removeEventListener('scroll', this.scrollEventCallback)
      setTimeout(() => {
        window.addEventListener('scroll', this.scrollEventCallback)
      }, 100)
    })

    // When the route moves forward
    // forcedly show go back button
    CEM.addEventListener('beforepageenter', goBackElm, () => {
      this.isHidden = false
    })
  },
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/main';

$go-back-btn-height: 2.7rem;

#app.transitioning #go-back {
  pointer-events: none !important;
}

#go-back-wrapper {
  position: fixed;
  width: 100%;
  bottom: 3.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  pointer-events: none;

  #go-back {
    &.fade-enter-active,
    &.fade-leave-active {
      transition: opacity 500ms flex;
      opacity: 1;
    }
    &.fade-enter,
    &.fade-leave-to {
      opacity: 0;
    }

    pointer-events: all;
    z-index: 9999;
    background-color: #fff;
    cursor: pointer;
    // position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    // left: 50%;
    // bottom: 3.1rem;
    height: $go-back-btn-height;
    opacity: 1;
    // transform: translateX(-50%) scale(1);
    border-radius: 50px;
    box-shadow: 0 1.1rem 3rem rgba(#000, 0.2);
    transition: transform 300ms ease, opacity 300ms ease,
      background-color $color-scheme-transition-time ease;

    @include dark-mode {
      background-color: #444;
    }

    &.hidden {
      transform: scale(0.9);
      opacity: 0;
      pointer-events: none;
    }

    .jump-link {
      // display: flex;
      display: block;
      width: 0;
      height: $go-back-btn-height;
      overflow: hidden;
      transition: width 200ms ease;

      &.exists {
        width: $go-back-btn-height * 1.3;

        .jump-btn {
          opacity: 1;
        }
      }

      .jump-btn {
        opacity: 0;
        width: $go-back-btn-height * 1.3;
        padding: 0 s(4);
        height: $go-back-btn-height;
        @include bgImg(
          '~assets/images/icons/jump-arrow.svg',
          '57% center',
          '1.5rem 1.5rem'
        );
        @include dark-mode {
          @include bgImg(
            '~assets/images/icons/jump-arrow-dark.svg',
            '57% center',
            '1.5rem 1.5rem'
          );
        }
        @include separator('right');
      }
    }

    .prev-btn {
      padding: 0 s(4);
      display: flex;
      align-items: center;
      justify-content: center;
      height: $go-back-btn-height;
      @include text-color;
      font-size: 1rem;
      font-weight: 500;

      .icon {
        width: 0.5rem;
        height: 1rem;
        margin-right: 0.5rem;
        transform: scaleX(-1);

        @include bgImg('~assets/images/arrow_right_black.svg', center, contain);

        @include dark-mode {
          @include bgImg(
            '~assets/images/arrow_right_white.svg',
            center,
            contain
          );
        }
      }
    }

    .go-home {
      padding: 0 s(4);
      // margin-right: $slight-gap;
      display: flex;
      height: $go-back-btn-height;
      width: $go-back-btn-height * 1.3;
      border-left: solid;
      @include separator;
      @include bgImg('~assets/images/home_black.svg', '43% center', '45%');

      @include dark-mode {
        @include bgImg('~assets/images/home_white.svg', '43% center', '45%');
      }
    }
  }
}
</style>
