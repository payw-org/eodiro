<i18n>
{
  "ko": {
    "title": "어디로",
    "description": "대학교 빈 강의실 찾기 서비스",
    "start": "대학교 선택",
    "colorMode": "색상 모드 설정",
    "changeCollege": "학교 변경",
    "done": "완료",
    "light_mode": "라이트 모드",
    "dark_mode": "다크 모드",
    "adaptive": "적응형",
    "contact": "문의하기"
  },
  "en": {
    "title": "eodiro",
    "description": "Find Empty Classrooms",
    "start": "Select University",
    "colorMode": "Set Color Scheme",
    "changeCollege": "Change College",
    "done": "Done",
    "light_mode": "Light Mode",
    "dark_mode": "Dark Mode",
    "adaptive": "Adaptive",
    "contact": "Contact"
  },
  "zh": {
    "title": "eodiro",
    "description": "找到空的教室",
    "start": "选择大学",
    "colorMode": "设置配色方案",
    "changeCollege": "改变大学",
    "done": "DONE",
    "light_mode": "光模式",
    "dark_mode": "黑暗模式",
    "adaptive": "自适应",
    "contact": "联系"
  },
  "fr": {
    "title": "eodiro",
    "description": "Trouver Une Classe Vide",
    "start": "Choisir L'Université",
    "colorMode": "Définir Les Couleurs",
    "changeCollege": "Changer DE Collège",
    "done": "Terminé",
    "light_mode": "Mode Lumière",
    "dark_mode": "Mode Sombre",
    "adaptive": "Adaptatif",
    "contact": "Contact"
  }
}
</i18n>

<template>
  <div id="home">
    <p class="about-developers">{{ thisYear }} © eodiro |&nbsp;<a href="mailto:support@eodiro.com" class="contact">{{ $t('contact') }}</a></p>
    <!-- <transition
      appear
      name="zoom"
    > -->
      <div class="start-box">
        <div class="content-area">
          <div class="main" v-show="!isSettingsActive" key="1">
            <div class="logo-container">
              <svg width="122px" height="198px" viewBox="0 0 122 198" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <!-- Generator: Sketch 54.1 (76490) - https://sketchapp.com -->
                <title>Fill 3</title>
                <desc>Created with Sketch.</desc>
                <defs>
                  <linearGradient x1="52.8981037%" y1="0%" x2="38.2508483%" y2="101.650823%" id="linearGradient-1">
                    <stop stop-color="#FFDF00" offset="0%"></stop>
                    <stop stop-color="#FF006D" offset="100%"></stop>
                  </linearGradient>
                </defs>
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="eodiro_logo_r" transform="translate(-102.000000, -52.000000)" fill="url(#linearGradient-1)">
                    <g id="eodiro_logo" transform="translate(102.000000, 52.000000)">
                      <path d="M66.059,33.499 L57.209,24.649 C55.111,22.551 53.933,19.705 53.933,16.738 C53.933,13.771 55.111,10.926 57.209,8.828 C58.796,7.241 60.464,5.573 62.051,3.986 C64.149,1.888 66.994,0.71 69.962,0.71 C72.929,0.71 75.774,1.888 77.872,3.986 C88.646,14.76 107.822,33.936 118.596,44.71 C122.965,49.079 122.965,56.162 118.596,60.531 C107.822,71.305 88.646,90.481 77.872,101.255 C75.774,103.353 72.929,104.532 69.962,104.532 C66.994,104.532 64.149,103.353 62.051,101.255 C60.464,99.668 58.796,98.001 57.209,96.414 C55.111,94.316 53.933,91.47 53.933,88.503 C53.933,85.536 55.111,82.69 57.209,80.592 L66.007,71.794 L49.985,71.794 C43.807,71.794 38.798,76.803 38.798,82.982 C38.798,106.787 38.798,162.225 38.798,186.031 C38.798,192.209 33.789,197.218 27.611,197.218 C22.599,197.218 16.702,197.218 11.69,197.218 C8.722,197.218 5.877,196.039 3.779,193.941 C1.681,191.843 0.502,188.998 0.502,186.031 C0.502,161.446 0.502,101.962 0.502,64.963 C0.502,56.618 3.817,48.615 9.718,42.714 C15.619,36.813 23.622,33.499 31.966,33.499 L66.059,33.499 Z" id="Fill-3"></path>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <h1 class="logo-text">{{ $t('title') }}</h1>
            <p class="description base-gray">{{ $t('description') }}</p>
            <router-link :to="'/' + startLink"><button class="go-btn eodiro-btn">{{ startMsg }} <span class="arrow">→</span></button></router-link>
          </div>
          <div class="color-scheme-config" v-show="isSettingsActive" key="2">
            <button
              class="mode-btn light"
              @click="$emit('changeColorScheme', 'light')"
            >{{ $t('light_mode') }}</button>
            <button
              class="mode-btn dark"
              @click="$emit('changeColorScheme', 'dark')"
            >{{ $t('dark_mode') }}</button>
            <button
              class="mode-btn auto"
              v-if="autoDarkModeSupport"
              @click="$emit('changeColorScheme', 'auto')"
            >{{ $t('adaptive') }} (macOS Mojave)</button>
          </div>
        </div>
        <div class="settings-area">
          <button
            class="config-btn color-scheme-pref"
            @click="isSettingsActive = !isSettingsActive"
          >
            <span v-if="!isSettingsActive">{{ $t('colorMode') }}</span>
            <span v-else>{{ $t('done') }}</span>
          </button>
          <router-link to="/university">
          <button class="config-btn" v-if="isDefaultUniversityExist && !isSettingsActive">{{ $t('changeCollege') }}</button>
          </router-link>
        </div>
      </div>
    <!-- </transition> -->
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
        return this.$t('start')
      }
    }
  },
  mounted() {
    // check if the browser supports 'prefers-color-scheme' media query
    // if the autoDarkModeSupport is true,
    // dark mode option will appear in the color scheme settings
    if (window.matchMedia('(prefers-color-scheme: dark)').media != 'not all') {
      this.autoDarkModeSupport = true
    }

    setTimeout(() => {
      this.$el.querySelector('.start-box').classList.add('appear')
    }, 200)
  }
}
</script>

<style lang="scss">
@import 'SCSS/global-variables.scss';
@import 'SCSS/global-mixins.scss';

#home {
  $transition-time: 1200ms;
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
    left: 0;
    right: 0;
    bottom: 1.5rem;
    height: 2rem;
    z-index: 9999;
    font-size: 1rem;
    opacity: 0.9;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: default;

    a.contact {
      color: $light-blue;
      font-weight: 500;

      @include dark-mode() {
        color: $light-yellow;
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
    border-radius: 1.5rem;
    opacity: 0;
    width: 90%;
    max-width: 30rem;
    height: 90%;
    min-height: 23rem;
    max-height: 23rem;
    box-shadow: 0 1.5rem 5rem rgba(0,0,0,0.15);
    text-align: center;
    overflow: hidden;
    will-change: transform;
    transition: background-color 1s ease, box-shadow 1s ease;

    &.appear {
      animation: springZoomOut 1s linear;
      animation-fill-mode: both;
    }

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
      transition-delay: 0.2;
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
      bottom: 3rem;
      display: flex;
      align-items: center;
      justify-content: center;

      .main {
        margin-top: 1.5rem;

        .logo-container {
          width: 3.5rem;
          height: 3.5rem;
          margin: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          // border: 1px solid #f0f0f0;
          border-radius: 1.2rem;
          transition: background-color 500ms ease, border 500ms ease;

          svg {
            width: auto;
            height: 100%;
            transform: translateX(4%);
          }

          @include dark-mode() {
            // border-color: #5f5f5f;
          }
        }

        .logo-text, .description {
          transition: color 500ms ease;
        }

        .logo-text {
          font-family: $font-display;
          font-size: 2.5rem;
          font-weight: 700;
          margin-top: 0.7rem;
        }

        .description {
          font-family: $font-text;
          font-size: 1rem;
          font-weight: 400;
        }

        .go-btn {
          margin: 2rem auto 0;
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
        width: calc(100% - 3rem);

        .mode-btn {
          display: block;
          width: 100%;
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
      top: calc(100% - 3rem);
      right: 0;
      bottom: 0;
      left: 0;

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
