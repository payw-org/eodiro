<template>
  <div id="home">
    <a href="http://payw.org" class="about-developers">{{ thisYear }} © Payw.org</a>
    <transition
      appear
      name="zoom"
    >
      <div class="start-box">

        <div class="content-area">
          <div class="main" v-show="!isSettingsActive" key="1">
            <dir class="logo-container">
              <img src="/assets/images/eodiro/logo-arrow.svg" alt="eodiro-logo">
            </dir>
            <h1 class="logo-text">어디로</h1>
            <p class="description base-gray">대학교 빈 강의실 찾기 서비스</p>
            <router-link :to="'/' + startLink"><button class="go-btn eodiro-btn">{{ startMsg }} <span class="arrow">→</span></button></router-link>
          </div>
          <div class="color-scheme-config" v-show="isSettingsActive" key="2">
            <button
              class="mode-btn light"
              @click="$emit('changeColorScheme', 'light')"
            >라이트 모드</button>
            <button
              class="mode-btn dark"
              @click="$emit('changeColorScheme', 'dark')"
            >다크 모드</button>
            <button
              class="mode-btn auto"
              v-if="autoDarkModeSupport"
              @click="$emit('changeColorScheme', 'auto')"
            >적응형 (macOS Mojave)</button>
          </div>
        </div>
        <div class="settings-area">
          <button
            class="config-btn color-scheme-pref"
            @click="isSettingsActive = !isSettingsActive"
          >
            <span v-if="!isSettingsActive">색상 모드 설정</span>
            <span v-else>완료</span>
          </button>
          <router-link to="/university">
          <button class="config-btn" v-if="isDefaultUniversityExist && !isSettingsActive">학교 변경</button>
          </router-link>
        </div>

        <!-- <div class="wrapper top-dummy"></div>
        <div class="wrapper">
          
          
        </div>
         -->
      </div>
    </transition>
    <HomeBGTile/>
  </div>
</template>

<script>
import HomeBGTile from 'Components/HomeBGTile'

export default {
  name: 'home',
  components: { HomeBGTile },
  data() {
    return {
      autoDarkModeSupport: false,
      isSettingsActive: false,
      isDefaultUniversityExist: false,
      startLink: ''
    }
  },
  computed: {
    thisYear() {
      return new Date().getFullYear()
    },
    startMsg() {
      if (window.localStorage.getItem('defaultUniversity')) {
        const defaultUniversity = JSON.parse(window.localStorage.getItem('defaultUniversity'))
        this.isDefaultUniversityExist = true
        this.startLink = defaultUniversity.vendor
        return defaultUniversity.name
      } else {
        this.startLink = 'university'
        return '대학교 선택'
      }
    }
  },
  mounted() {
    // set document title
    document.title = '어디로 | 대학교 빈강의실 찾기'

    // check if the browser supports 'prefers-color-scheme' media query
    if (window.matchMedia('(prefers-color-scheme: dark)').media != 'not all') {
      this.autoDarkModeSupport = true
    }
  }
}
</script>

<style lang="scss">
@import 'SCSS/global-variables.scss';
@import 'SCSS/global-mixins.scss';

#home {
  $transition-time: 1500ms;
  $cb: cubic-bezier(.24,.49,.01,.99);
  $transition-property: $transition-time $cb;

  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: $base-white;
  transition: background-color $transition-property;

  @include dark-mode() {
    background-color: $base-black;
  }

  .wrapper {
    min-width: 100%;

    &.top-dummy {
      height: 1.5rem;

      @include smaller-than($mobile-width-threshold) {
        display: none;
      }
    }
  }

  .about-developers {
    position: fixed;
    left: 1rem;
    bottom: 1rem;
    z-index: 9999;
    font-size: 0.8rem;
    opacity: 0.7;
  }

  .start-box {
    z-index: 7777;
    display: flex;
    position: relative;
    flex-wrap: wrap;
    align-items: center;
    align-content: space-between;
    justify-content: center;
    background-color: #fff;
    border-radius: 2rem;
    width: 90%;
    max-width: 30rem;
    height: 90%;
    min-height: 22rem;
    max-height: 22rem;
    box-shadow: 0 1rem 2rem rgba(0,0,0,0.1);
    text-align: center;
    overflow: hidden;
    will-change: transform;
    transition: background-color 1s ease, box-shadow 1s ease;

    @include dark-mode() {
      background-color: #222;
      box-shadow: 0 1rem 2rem rgba(0,0,0,0.3), $dark-mode-border-shadow;
    }

    @include smaller-than(700px) {
      width: calc(100% - 2rem);
    }

    &.zoom-enter-active, &.zoom-leave-active {
      transform: scale(1);
      filter: blur(0px);
      opacity: 1;
      box-shadow: 0 1rem 2rem rgba(0,0,0,0.1);
      transition: transform $transition-time $cb, opacity $transition-time/2 $cb, filter $transition-time $cb, background-color $transition-property, box-shadow $transition-property;

      @include dark-mode() {
        box-shadow: 0 1rem 2rem rgba(0,0,0,0.3), $dark-mode-border-shadow;
      }
    }
    &.zoom-enter, &.zoom-leave-to {
      transform: scale(0.7);
      filter: blur(30px);
      opacity: 0;
      box-shadow: none;
    }

    .content-area {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      height: calc(100% - 3rem);
      display: flex;
      align-items: center;
      justify-content: center;

      .main {
        .logo-container {
          width: 5rem;
          height: 5rem;
          margin: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #f0f0f0;
          border-radius: 1.2rem;
          transition: background-color 500ms ease, border 500ms ease;

          img {
            width: 60%;
            height: 60%;
            transform: translateX(4%);
          }

          @include dark-mode() {
            border-color: #5f5f5f;
          }
        }

        .logo-text, .description {
          transition: color 500ms ease;
        }

        .logo-text {
          font-family: $font-display;
          font-size: 2.5rem;
          font-weight: 700;
          margin-top: 0.5rem;
        }

        .description {
          font-family: $font-text;
          font-size: 1rem;
          font-weight: 400;
        }

        .go-btn {
          margin: 1.5rem auto 0;
          transition: background-color $transition-time $cb, box-shadow $transition-time $cb;
          display: flex;

          .arrow {
            font-family: $font-text;
            font-weight: 700;
            animation-name: arrowMove;
            animation-duration: 1s;
            animation-iteration-count: infinite;
            margin-left: 0.2rem;
          }

          @keyframes arrowMove {
            0% {
              transform: translateX(0rem);
            }
            85% {
              transform: translateX(0.5rem);
            }
            100% {
              transform: translateX(0rem);
            }
          }
        }
      }

      .color-scheme-config {
        text-align: center;
        width: calc(100% - 2rem);

        .mode-btn {
          display: block;
          width: 100%;
          max-width: 15rem;
          border-radius: 50px;
          padding: 0.7rem 1rem;
          font-size: 1.1rem;
          font-weight: 500;
          margin: auto;
          margin-bottom: 1rem;

          &:last-child {
            margin-bottom: 0;
          }

          &.light {
            background-color: #f4f4f4;
            color: $base-black;
          }
          &.dark {
            background-color: #333;
            color: $base-white;
          }
          &.auto {
            background-color: #4442b1;
            // background-image: linear-gradient(to right, #362c57, #fdd465);
            color: $base-white;
          }
        }
      }
    }

    .settings-area {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      height: 3rem;

      .config-btn {
        height: 1.5rem;
        font-family: $font-text;
        font-size: 0.8rem;
        background-color: #f4f4f4;
        padding: 0 0.6rem;
        border-radius: 50px;
        transition: background-color $transition-time $cb, color $transition-time $cb;
        margin-right: 0.5rem;
        vertical-align: top;

        &:last-child {
          margin-right: 0;
        }
        
        @include dark-mode() {
          color: $base-white;
          background-color: #444;
        }
      }
    }
  }
}

</style>
