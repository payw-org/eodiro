<template>
  <transition
    appear
    name="trans"
  >
    <nav id="app-navigation"
      :class="{
        hidden: isHidden
      }"
    >
      <div class="an-container">
        <!-- <router-link :to="backLink"><button class="go-back"></button></router-link> -->
        <div class="dummy"></div>
        <router-link :to="backLink">
          <h1 class="title">
            <transition name="slide-fade">
              <span class="text" :key="mutateNavTitle">{{ mutateNavTitle }}</span>
            </transition>
          </h1>
        </router-link>
        <div class="dummy"></div>
      </div>
    </nav>
  </transition>
</template>

<script>
export default {
  mounted() {
    this.titleElm = this.$el.querySelector('.title')

    ;['mouseenter', 'touchstart'].forEach(eventName => {
      this.titleElm.addEventListener(eventName, e => {
        this.mutateNavTitle = this.goBackTitle
        this.titleElm.classList.add('hover')
      })
    })
    
    this.titleElm.addEventListener('click', e => {
      this.titleElm.classList.remove('hover')
    })

    ;['mouseleave', 'touchend'].forEach(eventName => {
      this.titleElm.addEventListener(eventName, e => {
        this.mutateNavTitle = this.generateNavTitle(this.navTitle)
        this.titleElm.classList.remove('hover')
      })
    })

    window.addEventListener('resize', e => {
      this.mutateNavTitle = this.generateNavTitle(this.navTitle)
      this.transformTitleWidth(this.titleElm.clientWidth, this.getNewWidth(this.mutateNavTitle))
    })
  },
  props: ['navTitle', 'backLink', 'isHidden'],
  data() {
    return {
      originalWidth: 0,
      goBackTitle: '← Go back',
      titleElm: undefined,
      mutateNavTitle: undefined
    }
  },
  watch: {
    navTitle: function (newTitle) {
      this.$el.querySelector('.title').classList.remove('hover')
      if (this.$route.params.buildingID) {
        this.mutateNavTitle = this.generateNavTitle(newTitle)
      } else {
        this.mutateNavTitle = newTitle
      }
    },
    mutateNavTitle: function (newTitle, oldTitle) {
      this.transformTitleWidth(this.titleElm.clientWidth, this.getNewWidth(newTitle))
    }
  },
  methods: {
    getNewWidth(newTitle) {
      let titleElmDup = this.titleElm.cloneNode(true)
      titleElmDup.style.width = ''
      titleElmDup.style.position = 'absolute'
      titleElmDup.style.visibility = 'hidden'
      titleElmDup.style.pointerEvents = 'none'
      this.titleElm.parentElement.appendChild(titleElmDup)
      titleElmDup.innerHTML = newTitle
      let newWidth = titleElmDup.clientWidth
      titleElmDup.parentElement.removeChild(titleElmDup)

      return newWidth
    },
    transformTitleWidth(from, to) {
      this.titleElm.style.width = from + 'px'
      this.titleElm.getBoundingClientRect().width
      this.titleElm.style.width = to + 'px'
    },
    generateNavTitle(title) {
      let newTitle = this.navTitle
      if (this.$route.params.buildingID) {
        newTitle = title + this.$route.params.buildingID
      }

      return newTitle
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
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  $time: 800ms;
  transform: translateY(0);
  opacity: 1;
  transition: all $time $eodiro-cb;

  &.trans-enter-active, &.trans-leave-active {
    transition: all $time $eodiro-cb;
    transform: translateY(0);
  }
  &.trans-enter, &.trans-leave-to,
  &.hidden {
    transform: translateY(calc(-100% - 2rem));
  }

  .an-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 4rem;
    width: calc(100% - 3rem);
    max-width: 80rem;
    margin: auto;

    $go-back-width: 2rem;

    .go-back {
      width: $go-back-width;

      @include smaller-than(700px) {
        width: $go-back-width/1.2;
      }
    }

    .title {
      position: relative;
      height: 3rem;
      text-align: center;
      white-space: nowrap;
      font-family: $font-display;
      font-weight: 700;
      font-size: 1.3rem;
      border-radius: 50px;
      color: #fff;
      padding: 0 1.4rem;
      text-align: center;
      margin: 0 1rem;
      transition: transform 700ms $eodiro-cb, width 700ms $eodiro-cb, border-radius 700ms $eodiro-cb, background-color 200ms ease;
      background-color: $light-blue;
      box-shadow: 0 0.5rem 1.5rem rgba($light-blue, 0.3);
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;

      @include smaller-than(700px) {
        font-size: 1rem;
        height: 2.3rem;
      }

      .text {
        position: absolute;
      }

      &.hover {
        background-color: $light-green;
        box-shadow: 0 0.5rem 1.5rem rgba($light-green, 0.3);
        border-radius: 50px 0.7rem 0.7rem 50px;
      }

      &:active {
        background-color: darken($light-green, 8);
        transform: $click-transform;
      }

      @include dark-mode() {
        background-color: $light-yellow;
        box-shadow: 0 0.5rem 1.5rem rgba(#000, 0.3);

        &.hover {
          background-color: $light-red;
          box-shadow: 0 0.5rem 1.5rem rgba(#000, 0.3);
        }

        &:active {
          background-color: darken($light-red, 8);
        }
      }
    }

    .dummy {
      width: $go-back-width;
    }
  }
}
</style>
