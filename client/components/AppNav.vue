<template>
  <nav id="app-navigation">
    <div class="an-container">
      <div class="dummy"></div>
        <div class="single-button-wrapper" :class="{ hidden: isHidden }">
          <div class="single-button" :class="{'go-back-active': goBackActive}">
            <router-link class="link" :to="backLink"></router-link>
            <div class="left-tip"></div>
            <div class="title-box"></div>
            <div class="right-tip"></div>
            <div class="shadow"></div>
            <transition name="fade" mode="out-in">
              <h1 class="title-text" :key="mutateNavTitle">{{ mutateNavTitle }}</h1>
            </transition>
          </div>
        </div>
      <div class="dummy"></div>
    </div>
  </nav>
</template>

<script>
export default {
  mounted() {
    this.titleElm = this.$el.querySelector('.title-text')

    window.addEventListener('resize', e => {
      this.transformSB(this.mutateNavTitle)
    })
  },
  props: ['navTitle', 'backLink', 'isHidden'],
  data() {
    return {
      originalWidth: 0,
      goBackTitle: '← 뒤로가기',
      goBackTimeout: undefined,
      goBackActive: false,
      titleElm: undefined,
      mutateNavTitle: undefined
    }
  },
  watch: {
    navTitle: function (newTitle) {
      this.goBackActive = false
      if (this.$route.name === 'floors') {
        this.mutateNavTitle = this.generateNavTitle(newTitle)
      } else {
        this.mutateNavTitle = newTitle
      }
      window.clearTimeout(this.goBackTimeout)
      this.goBackTimeout = setTimeout(() => {
        this.goBackActive = true
        this.mutateNavTitle = this.goBackTitle
      }, 1700)
    },
    mutateNavTitle: function (newTitle, oldTitle) {
      this.transformSB(newTitle)
    }
  },
  methods: {
    generateNavTitle(title) {
      let newTitle = this.navTitle
      // if (this.$route.params.buildingID) {
      //   newTitle = title + this.$route.params.buildingID
      // }
      return newTitle
    },
    transformSB(newTitle) {
      let titleText = this.$el.querySelector('.title-text')
      let titleTextClone = titleText.cloneNode(true)
      titleTextClone.style.position = 'absolute'
      titleTextClone.style.visibility = 'hidden'
      titleTextClone.style.pointerEvents = 'none'
      titleTextClone.innerHTML = newTitle
      titleText.parentElement.appendChild(titleTextClone)
      let titleTextWidth = titleTextClone.getBoundingClientRect().width
      let titleBox = this.$el.querySelector('.title-box')
      let leftTip = this.$el.querySelector('.left-tip')
      let rightTip = this.$el.querySelector('.right-tip')
      let link = this.$el.querySelector('.link')
      let shadow = this.$el.querySelector('.shadow')

      let titleBoxWidth = titleBox.clientWidth
      let scaleX = titleTextWidth / titleBoxWidth
      let translateX = -((titleTextWidth - titleBoxWidth) / 2 - 2)
      titleBox.style.transform = 'scaleX(' + scaleX + ')'
      leftTip.style.transform = 'translateX(' + translateX + 'px)'
      rightTip.style.transform = 'translateX(' + -translateX + 'px)'
      link.style.width = 'calc(' + titleTextWidth + 'px' + ' \+ 3rem)'
      shadow.style.width = titleTextWidth + 'px'

      titleTextClone.parentElement.removeChild(titleTextClone)
    }
  }
}
</script>


<style lang="scss">
@import '../scss/global-variables.scss';
@import '../scss/global-mixins.scss';

#app-navigation {
  $top-gap: 4rem;

  will-change: transform;
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  $time: 800ms;

  .an-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: calc(100% - 3rem);
    max-width: 80rem;
    margin: auto;

    .single-button-wrapper {
      padding-top: 4rem;
      transform: translateY(0);
      transition: transform $time $eodiro-cb;
      will-change: transform;

      @include smaller-than($mobile-width-threshold) {
        padding-top: 3rem;
      }

      &.hidden {
        transform: translateY(calc(-100% - 2rem));
      }

      .single-button {
        position: relative;
        $height: 58px;
        height: $height;

        @include smaller-than($mobile-width-threshold) {
          height: 44px;
        }

        .link {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 100%;
          height: 100%;
          transform: translateX(-50%) translateY(-50%);
          z-index: 3;
          transition: width 700ms $eodiro-cb, border-radius 700ms $eodiro-cb, box-shadow 700ms $eodiro-cb;
          border-radius: 50px;
          background-color: transparent;
        }
        .left-tip, .right-tip {
          position: absolute;
          top: 0;
          background-color: $light-blue;
          will-change: transform;
          width: $height / 2 + 2;
          height: $height;
          z-index: 1;
        }
        .left-tip {
          right: 100%;
          border-radius: 50px 0 0 50px;
          transition: transform 700ms $eodiro-cb, background-color 700ms $eodiro-cb;
        }
        .right-tip {
          left: 100%;
          border-radius: 0 50px 50px 0;
          transition: transform 700ms $eodiro-cb, background-color 700ms $eodiro-cb, border-radius 700ms ease;
        }
        .title-box {
          position: relative;
          background-color: red;
          height: $height;
          width: 5rem;
          will-change: transform;
          transition: transform 700ms $eodiro-cb, background-color 700ms $eodiro-cb;
          background-color: $light-blue;
        }
        .shadow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          z-index: -1;
          border-radius: 50px;
          box-shadow: 0 0.5rem 2rem rgba($light-blue, 0.5);
          transform: translateX(-50%) translateY(-50%);
          transition: width 700ms $eodiro-cb, box-shadow 700ms $eodiro-cb;
        }
        .title-text {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translateX(-50%) translateY(-50%);
          white-space: nowrap;
          font-family: $font-display;
          font-weight: 700;
          font-size: 1.3rem;
          color: #fff;
          z-index: 2;

          &.fade-enter-active, &.fade-leave-active {
            transition: opacity 0.2s ease, transform 0.2s ease !important;
            opacity: 1 !important;
            transform: translateX(-50%) translateY(-50%);
          }
          &.fade-enter {
            opacity: 0 !important;
            // transform: translateX(-50%) translateY(calc(-50% + 1rem));
          }
          &.fade-leave-to {
            opacity: 0 !important;
            // transform: translateX(-50%) translateY(calc(-50% - 1rem));
          }
        }

        @include smaller-than($mobile-width-threshold) {
          $height: 40px;
          height: $height;

          .title-box {
            height: $height;
          }
          .left-tip, .right-tip {
            height: $height;
            width: $height / 2 + 2;
          }
        }

        &.go-back-active {
          .right-tip {
            border-radius: 0 0.5rem 0.5rem 0;
          }
          .link {
            border-radius: 50px 0.5rem 0.5rem 50px;
          }
          .shadow {
            box-shadow: 0 0.5rem 2rem rgba($light-green, 0.5);
          }
          .title-box, .left-tip, .right-tip {
            background-color: $light-green;
          }
        }
        
        @include dark-mode() {
          .title-box, .left-tip, .right-tip {
            background-color: $light-yellow;
          }
        
          .shadow {
            box-shadow: 0 0.5rem 2rem rgba(#000, 0.5);
          }
        
          &.go-back-active {
            .title-box, .left-tip, .right-tip {
              background-color: $light-red;
            }
          }
        }
      }
    }
  }
}
</style>
