<template>
  <transition name="fade">
    <div v-show="prevRouteName" id="go-back" :class="{ hidden: isHidden }">
      <NuxtLink
        class="prev-link"
        :to="prevRouteName ? localePath(prevRouteName) : localePath('index')"
      >
        <button class="prev-btn">
          <span class="icon" />
          {{ $t('global.goBack') }}
        </button>
      </NuxtLink>

      <NuxtLink :to="localePath('index')">
        <button class="go-home" />
      </NuxtLink>
    </div>
  </transition>
</template>

<script>
import { CEM } from '~/modules/custom-event-manager'

export default {
  data() {
    return {
      isHidden: false,
      scrollEventCallback: null
    }
  },
  computed: {
    prevRouteName() {
      return this.$route.meta.prevRouteName
    }
  },
  mounted() {
    const that = this // alias

    // Create scroll event callback function
    this.scrollEventCallback = function() {
      if (
        this.oldScroll > this.scrollY &&
        window.innerHeight + this.scrollY < document.body.scrollHeight
      ) {
        // Up
        if (that.isHidden) {
          // Dispatch scroll up custom event
          CEM.dispatchEvent('gobackbtnappeared')
        }

        // Show go back button
        that.isHidden = false
      } else if (this.scrollY > 0) {
        // Down
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
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/main';

$go-back-btn-height: 2.7rem;

#go-back {
  &.fade-enter-active,
  &.fade-leave-active {
    transition: opacity 500ms ease;
    opacity: 1;
  }
  &.fade-enter,
  &.fade-leave-to {
    opacity: 0;
  }

  z-index: 9999;
  background-color: #fff;
  cursor: pointer;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 50%;
  bottom: 3.1rem;
  height: $go-back-btn-height;
  opacity: 1;
  transform: translateX(-50%) scale(1);
  border-radius: 50px;
  box-shadow: 0 1rem 10rem rgba(#000, 0.6);
  transition: transform 300ms ease, opacity 300ms ease,
    background-color $color-scheme-transition-time ease;

  @include dark-mode {
    background-color: #444;
  }

  &.hidden {
    transform: translateX(-50%) scale(0.9);
    opacity: 0;
    pointer-events: none;
  }

  .prev-btn {
    padding: 0 $gentle-gap;
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
        @include bgImg('~assets/images/arrow_right_white.svg', center, contain);
      }
    }
  }

  .go-home {
    padding: 0 $gentle-gap;
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
</style>
