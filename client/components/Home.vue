<template>
  <div id="home">
    <transition
      appear
      name="zoom"
    >
      <div class="start-box">

        <div class="content-area">
          <div class="main" v-show="!isSettingsActive">
            <dir class="logo-container">
              <img src="/assets/images/eodiro/app-icon_sq_b.svg" alt="">
            </dir>
            <h1 class="logo-text">어디로</h1>
            <p class="description base-gray">대학교 빈 강의실 찾기 서비스</p>
            <router-link to="/cau"><button class="go-btn eodiro-btn">시작하기 →</button></router-link>
          </div>
          <div class="color-scheme-config" v-show="isSettingsActive">
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
            >자동 (macOS Mojave)</button>
          </div>
        </div>
        <div class="settings-area">
          <button
            class="color-scheme-pref"
            @click="isSettingsActive = !isSettingsActive"
          >
            <span v-if="!isSettingsActive">색상 모드 변경</span>
            <span v-else>홈으로</span>
          </button>
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
  name: 'Home',
  components: { HomeBGTile },
  mounted() {
    // set document title
    document.title = '어디로 | 대학교 빈강의실 찾기'

    // check if the browser supports 'prefers-color-scheme' media query
    if (window.matchMedia('(prefers-color-scheme: dark)').media != 'not all') {
      this.autoDarkModeSupport = true
      console.log('support auto dark mode')
    }
  },
  data() {
    return {
      autoDarkModeSupport: false,
      isSettingsActive: false
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

  .start-box {
    z-index: 7777;
    display: flex;
    position: relative;
    flex-wrap: wrap;
    align-items: center;
    align-content: space-between;
    justify-content: center;
    background-color: #fff;
    border-radius: 3rem;
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
      background-color: #111;
      box-shadow: 0 1rem 2rem rgba(0,0,0,0.3), $dark-mode-border-shadow;
    }

    @include smaller-than(700px) {
      width: calc(100% - 2rem);
      border-radius: 2rem;
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
          img {
            width: 5rem;
          }
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
          margin-top: 2rem;
          transition: background-color $transition-time $cb, box-shadow $transition-time $cb;
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
            // background-color: $light-blue;
            background-image: linear-gradient(to right, #362c57, #fdd465);
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

      .color-scheme-pref {
        height: 2rem;
        font-family: $font-text;
        font-size: 0.8rem;
        background-color: #f4f4f4;
        padding: 0 0.8rem;
        border-radius: 50px;
        transition: background-color $transition-time $cb, color $transition-time $cb;
      
        @include dark-mode() {
          color: $base-white;
          background-color: #444;
        }
      }
    }
  }
}

</style>
