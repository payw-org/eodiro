<template>
  <div id="clubs-profile" :class="{ active: active }">
    <div class="background">
      <NuxtLink
        :to="localePath($route.meta.prevRouteName)"
        class="absolute-link bg-go-back"
      />
    </div>
    <div class="cp-info">
      <button class="close-btn">
        <NuxtLink
          :to="localePath($route.meta.prevRouteName)"
          class="absolute-link"
        />
      </button>
      <div ref="scrollElm" class="cp-content" @scroll="onScroll">
        <div class="cpc-wrapper">
          <!-- club name -->
          <h1 class="cp-name">
            {{ $route.params.clubId }}
          </h1>

          <div style="height: 1px;" />

          <!-- club poster(image) -->
          <div class="cp-hero-wrapper">
            <img
              :src="`https://picsum.photos/${Math.floor(Math.random() * 1000)}`"
              alt=""
              class="cp-hero"
            />
          </div>

          <!-- club summary -->
          <p class="cp-summary">
            {{ summary }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { LoremIpsum } from 'lorem-ipsum'
import pageBase from '~/mixins/page-base'

export default {
  name: 'clubs-profile',
  transition: 'clubs-to-profile',
  mixins: [pageBase],
  data() {
    return {
      pop: true,
      active: false,
      summary: new LoremIpsum().generateSentences(
        Math.floor(Math.random() * 100)
      ),
    }
  },
  mounted() {
    setTimeout(() => {
      this.active = true

      // prevent body scrolling issue
      this.$refs.scrollElm.scrollTo(0, 1)
    }, 0)
  },
  methods: {
    onScroll() {
      // prevent body scrolling issue by
      // simply just adding a subtle 1 pixel scroll position
      const scrollElm = this.$refs.scrollElm
      if (scrollElm && scrollElm.scrollTop === 0) {
        scrollElm.scrollTo(0, 1)
      } else if (
        scrollElm &&
        scrollElm.scrollHeight === scrollElm.scrollTop + scrollElm.clientHeight
      ) {
        scrollElm.scrollTo(
          0,
          scrollElm.scrollHeight - scrollElm.clientHeight - 1
        )
      }
    },
  },
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/main';

#clubs-profile {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10001;

  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(#000, 0.6);
    @include dark-mode {
      background-color: rgba(#000, 0.8);
    }
    opacity: 0;
    transition: opacity 300ms ease;
    pointer-events: none;

    .bg-go-back {
      cursor: default;
    }
  }

  .cp-info {
    display: flex;
    position: relative;
    width: calc(100% - #{s(5) * 2});
    height: calc(100% - #{s(5) * 2});
    max-width: 30rem;
    max-height: 60rem;
    @include elm-fill;
    border-radius: r(4);
    padding: 0 s(4);
    z-index: 100;
    opacity: 0;

    .close-btn {
      position: absolute;
      z-index: 2;
      left: 50%;
      bottom: s(5);
      transform: translateX(-50%);
      // @include bg;
      background-color: #fff;
      $btn-width: 3rem;
      width: $btn-width;
      height: $btn-width;
      border-radius: 50px;
      box-shadow: 0 0.2rem 0.5rem rgba(#000, 0.17);
      @include bgImg('~assets/images/x.svg', 'center', '30%');
      @include dark-mode {
        background-color: #444;
        @include bgImg('~assets/images/x-white.svg', 'center', '30%');
      }
    }

    .cp-content {
      height: 100%;
      overflow: auto;
      -webkit-overflow-scrolling: touch;

      .cpc-wrapper {
        padding-bottom: 5rem;

        .cp-name {
          text-align: center;
          padding: s(5) 0 s(4);
          font-size: h(3);
          font-weight: fw(5);
          position: sticky;
          top: 0;
          @include elm-fill;
        }

        .cp-hero-wrapper {
          border-radius: r(3);
          overflow: hidden;
          margin-top: s(2);

          .cp-hero {
            display: block;
            width: 100%;
          }
        }

        .cp-summary {
          color: $base-gray;
          line-height: lh(3);
          padding-top: s(3);
          margin-top: s(3);
          border-top: solid;
          @include separator;
        }
      }
    }
  }

  &.active {
    .background {
      opacity: 1;
      pointer-events: all;
    }

    .cp-info {
      animation: springZoomInGentle 500ms linear;
      animation-fill-mode: both;
    }
  }

  &.clubs-to-index-leave-to {
    .background {
      opacity: 0;
      pointer-events: none !important;
    }

    .cp-info {
      animation: springZoomInOut 500ms linear;
      animation-fill-mode: both;
    }
  }
}
</style>
