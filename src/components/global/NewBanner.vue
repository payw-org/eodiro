<template>
  <div id="eodiro-banner" :class="{ 'nav-mode': isNavMode }">
    <HomeBgTile v-if="!isNavMode && isHome" />
    <!-- <div class="hamlet-icon" :class="hamletName" /> -->
    <transition v-if="!isNavMode" name="global-soft-fade">
      <h1 class="header" :class="hamletName">
        {{ header }}
      </h1>
    </transition>
    <transition name="global-soft-fade">
      <nav v-if="isNavMode" class="nav">
        <h2 class="header" :class="hamletName">
          {{ header }}
        </h2>
      </nav>
    </transition>
    <div class="sentinel" />
  </div>
</template>

<script>
import HomeBgTile from '~/components/home/HomeBgTile'

export default {
  components: { HomeBgTile },
  data() {
    return {
      isNavMode: false,
      hamletName: 'home',
      isHome: true,
      header: 'eodiro',
    }
  },
  watch: {
    '$route.meta.hamletName'(value) {
      this.setHamletName(value)
      this.convertHamletToTitle(value)
    },
  },
  created() {
    this.hamletName = this.$route.meta.hamletName
    this.setHamletName(this.hamletName)
    this.convertHamletToTitle(this.hamletName)
  },
  mounted() {
    const sentinel = this.$el.querySelector('.sentinel')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target.isSameNode(sentinel)) {
          if (entry.isIntersecting) {
            this.isNavMode = false
          } else {
            this.isNavMode = true
          }
        }
      })
    })
    observer.observe(sentinel)
  },
  methods: {
    convertHamletToTitle(hamletName) {
      switch (hamletName) {
        case 'home':
          this.header = 'eodiro'
          break
        case 'pepero-square':
          this.header = this.$t('peperoSquare.title')
          break
        case 'me':
          this.header = this.$t('me.title')
          break
        case 'lectures':
          this.header = this.$t('lectures.title')
          break
        case 'opensource':
          this.header = this.$t('opensource.title')
          break
        case 'inquiry':
          this.header = this.$t('inquiry.title')
          break
        case 'cafeteria':
          this.header = this.$t('cafeteria.title')
          break
        case 'preferences':
          this.header = this.$t('pref.title')
          break
        case 'sign-in':
          this.header = this.$t('auth.signIn')
          break
        case 'sign-up':
          this.header = this.$t('auth.signUp')
          break
        case 'forgot':
          this.header = this.$t('auth.reissue')
          break
        case 'privacy':
          this.header = this.$t('privacy.title')
          break
        default:
          this.header = 'eodiro'
          break
      }
    },
    setHamletName(hamletName) {
      if (hamletName !== 'home') {
        this.isHome = false
      } else {
        this.isHome = true
      }
      setTimeout(() => {
        this.hamletName = hamletName
      }, 200)
    },
  },
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/main';

#app.is-banner-forced-mini #eodiro-banner {
  min-height: unset;
  height: $nav-height;
  top: 0;
}

#eodiro-banner {
  // max-width: $master-content-max-width;
  @include separator('bottom');
  background-color: rgba(#fff, 0.7);
  backdrop-filter: blur(20px) saturate(1.7);
  @include dark-mode {
    background-color: rgba($base-black-soft, 0.7);
  }
  z-index: 9999;
  margin: auto;
  // margin-bottom: 2rem;
  height: 45vh;
  // min-height: 15rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 200ms ease, transform 200ms ease, border 200ms ease;
  position: sticky;
  top: calc(-45vh + #{$nav-height});
  overflow-x: hidden;

  .header {
    font-size: h(12);
    @include text-color;
    letter-spacing: -0.03em;
    transition: color 300ms ease;
    padding: 0 s(5);
    text-align: center;
    line-height: lh(1);

    &.pepero-square {
      color: #ff3e78;
      @include dark-mode {
        color: #ff79b9;
      }
    }
    &.me,
    &.sign-in,
    &.sign-up,
    &.forgot {
      color: #5f14be;
      @include dark-mode {
        color: #7b5aff;
      }
    }
    &.lectures {
      color: #02ba41;
      @include dark-mode {
        color: #6ccf2f;
      }
    }
    &.opensource {
      color: #b221f6;
      @include dark-mode {
        color: #e751ff;
      }
    }
    &.inquiry {
      color: #ff9922;
      @include dark-mode {
        color: #ffcf26;
      }
    }
    &.cafeteria {
      color: #305dff;
      @include dark-mode {
        color: #31a8ff;
      }
    }
    &.preferences {
      color: #636363;
      @include dark-mode {
        color: #939393;
      }
    }
    &.privacy {
      color: #04ab65;
      @include dark-mode {
        color: #33d9a7;
      }
    }
  }

  .hamlet-icon {
    $icon-size: 5rem;
    width: $icon-size;
    height: $icon-size;

    &.home {
      @include bgImg('~assets/images/icons/eodiro-arrow.svg');

      @include dark-mode {
        @include bgImg('~assets/images/icons/eodiro-arrow-white.svg');
      }
    }

    &.sign-in,
    &.sign-up,
    &.forgot {
      @include bgImg('~assets/images/key.svg');

      @include dark-mode {
        @include bgImg('~assets/images/key-white.svg');
      }
    }
  }

  .nav {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: $nav-height;
    display: flex;
    align-items: center;
    justify-content: center;

    .header {
      font-size: h(1);
      font-weight: fw(5);
    }
  }

  .sentinel {
    position: absolute;
    bottom: calc(#{$nav-height} + 1px);
    left: 0;
    width: 100%;
    height: 1px;
  }
}
</style>
