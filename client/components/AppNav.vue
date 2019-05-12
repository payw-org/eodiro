<i18n>
{
  "ko": {
    "navTitle_goBack": "뒤로가기",
    "navTitle_university": "학교를 선택하세요",
    "navTitle_building": "건물을 선택하세요",
    "navTitle_floor": "층을 선택하세요",
    "navTitle_result": "강의실 현황입니다"
  },
  "en": {
  },
  "zh": {
  },
  "fr": {
  }
}
</i18n>

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
              <h1 class="title-text" :key="navTitle">{{ navTitle }}</h1>
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
    // Nav width sould be resized on window resize
    // since the nav width is fixed by the calculation
    window.addEventListener('resize', e => {
      this.transformSB(this.navTitle)
    })

    // On first mount, set navigation title
    // based on the current route
    this.setTitle(this.$route)
  },
  props: ['isHidden'],
  data() {
    return {
      goBackTimeout: undefined,
      goBackActive: false,
      navTitle: '',
      backLink: ''
    }
  },
  watch: {
    $route() {
      this.setTitle(this.$route)
    }
  },
  methods: {
    // Set nav title based on the route name
    setTitle(route) {
      this.goBackActive = false
      window.clearTimeout(this.goBackTimeout)

      let rp = route.params
      if (route.name === 'building') {
        this.navTitle = this.$t('navTitle_building')
        this.backLink = '/'
      } else if (route.name === 'floor') {
        this.navTitle = this.$t('navTitle_floor')
        this.backLink = '/' + rp.universityVendor
      } else if (route.name === 'result') {
        this.navTitle = this.$t('navTitle_result')
        this.backLink = '/' + rp.universityVendor + '/' + rp.buildingID
      } else if (route.name === 'university') {
        this.navTitle = this.$t('navTitle_university')
        this.backLink = '/'
      }

      // Animate nav width
      this.transformSB(this.navTitle)

      // Set 'Go Back' navigation title after 2sec
      this.goBackTimeout = setTimeout(() => {
        this.goBackActive = true
        this.navTitle = '← ' + this.$t('navTitle_goBack')
        this.transformSB('← ' + this.$t('navTitle_goBack'))
      }, 2000)
    },
    // Animate nav width
    transformSB(newTitle) {
      let titleText = this.$el.querySelector('.title-text')
      titleText.getBoundingClientRect().width
      let titleTextClone = titleText.cloneNode(true)
      titleTextClone.style.visibility = 'hidden'
      titleTextClone.style.pointerEvents = 'none'
      titleTextClone.innerHTML = newTitle
      titleText.parentElement.appendChild(titleTextClone)
      
      let titleBox = this.$el.querySelector('.title-box')
      let leftTip = this.$el.querySelector('.left-tip')
      let rightTip = this.$el.querySelector('.right-tip')
      let link = this.$el.querySelector('.link')
      let shadow = this.$el.querySelector('.shadow')

      // Set timeout to fix a weird bug
      // where on the first load, nav's width
      // is slightly longer than it should be
      setTimeout(() => {
        let titleTextWidth = titleTextClone.getBoundingClientRect().width - 10
        let titleBoxWidth = titleBox.clientWidth
        let scaleX = titleTextWidth / titleBoxWidth
        let translateX = -((titleTextWidth - titleBoxWidth) / 2 - 5)
        titleBox.style.transform = 'scaleX(' + scaleX + ')'
        leftTip.style.transform = 'translateX(' + translateX + 'px)'
        rightTip.style.transform = 'translateX(' + -translateX + 'px)'
        link.style.width = 'calc(' + titleTextWidth + 'px' + ' \+ 3rem)'
        shadow.style.width = titleTextWidth + 'px'

        titleTextClone.parentElement.removeChild(titleTextClone)
      }, 100)
    }
  },
  beforeDestroy() {
    window.clearTimeout(this.goBackTimeout)
  }
}
</script>


<style lang="scss">
@import 'SCSS/global-variables.scss';
@import 'SCSS/global-mixins.scss';

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
  pointer-events: none;

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
      transition: transform 500ms $eodiro-cb, opacity 500ms $eodiro-cb;
      will-change: transform, opacity;

      @include smaller-than($mobile-width-threshold) {
        padding-top: 3rem;
      }

      &.hidden {
        transform: translateY(calc(-100% - 2rem));
        // opacity: 0;
      }

      .single-button {
        position: relative;
        $height: 58px;
        height: $height;
        pointer-events: all;

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
          width: $height / 2 + 5;
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
          width: 2rem;
          will-change: transform;
          transition: transform 700ms $eodiro-cb, background-color 700ms $eodiro-cb;
          background-color: $light-blue;
        }
        .shadow {
          // display: none;
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 50%;
          z-index: -1;
          border-radius: 50px;
          background-color: rgba($light-blue, 0.3);
          box-shadow: 0 0.5rem 1.5rem 1rem rgba($light-blue, 0.3);
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
            width: $height / 2 + 5;
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
            background-color: rgba($light-green, 0.3);
            box-shadow: 0 0.5rem 2rem 1rem rgba($light-green, 0.3);
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
            background-color: rgba(#000, 0.3);
            box-shadow: 0 0.5rem 2rem 1rem rgba(#000, 0.3);
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
