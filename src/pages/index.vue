<i18n>
{
  "kr": {
    "menu_vacant": "빈 강의실 조회",
    "menu_meal": "학식 메뉴",
    "menu_class": "강의 검색",
    "menu_preferences": "설정",
    "menu_review": "리뷰 남기기",
    "menu_donation": "후원하기",
    "menu_inquiry": "자주 묻는 질문",
    "preparing": "준비중입니다."
  },
  "en": {
    "menu_vacant": "Find Vacant Classrooms",
    "menu_meal": "Restaurant Menu",
    "menu_class": "Search Classes",
    "menu_preferences": "Preferences",
    "menu_review": "Write a Review",
    "menu_donation": "Donate",
    "menu_inquiry": "Frequently Asked",
    "preparing": "We're working on this feature."
  }
}
</i18n>

<template>
  <div id="home">
    <div class="page-content-wrapper">
      <div class="page-content">
        <div class="menu-item-container">
          <nuxt-link :to="localePath('vacant').replace(/\/$/, '')">
            <div class="menu-item-wrapper">
              <home-menu-item class="vacant">
                <template v-slot:title>{{ $t('menu_vacant') }}</template>
              </home-menu-item>
            </div>
          </nuxt-link>

          <div class="menu-item-wrapper" @click="preparing">
            <home-menu-item class="meal">
              <template v-slot:title>{{ $t('menu_meal') }}</template>
            </home-menu-item>
          </div>

          <div class="menu-item-wrapper" @click="preparing">
            <home-menu-item class="class">
              <template v-slot:title>{{ $t('menu_class') }}</template>
            </home-menu-item>
          </div>

          <div class="menu-item-wrapper" @click="preparing">
            <home-menu-item class="review">
              <template v-slot:title>{{ $t('menu_review') }}</template>
            </home-menu-item>
          </div>

          <div class="menu-item-wrapper" @click="preparing">
            <home-menu-item class="donation">
              <template v-slot:title>
                <span v-html="$t('menu_donation')"></span>
              </template>
            </home-menu-item>
          </div>

          <div class="menu-item-wrapper" @click="preparing">
            <home-menu-item class="inquiry">
              <template v-slot:title>
                <span v-html="$t('menu_inquiry')"></span>
              </template>
            </home-menu-item>
          </div>

          <nuxt-link :to="localePath('preferences').replace(/\/$/, '')">
            <div class="menu-item-wrapper">
              <home-menu-item class="preferences">
                <template v-slot:title>{{ $t('menu_preferences') }}</template>
              </home-menu-item>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EodiroPageBase from '~/components/EodiroPageBase.vue'
import HomeMenuItem from '~/components/home/HomeMenuItem.vue'
import EodiroDialog from '~/plugins/eodiro-dialog'

export default {
  name: 'home',
  extends: EodiroPageBase,
  components: { HomeMenuItem },
  meta: {
    depth: 0,
    appName: 'home'
  },
  methods: {
    preparing() {
      new EodiroDialog().alert(this.$t('preparing'))
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/global-variables.scss';
@import '~/assets/styles/scss/global-mixins.scss';

#home {
  .page-content-wrapper {
    width: 100%;

    .page-content {
      background-color: #fff;

      @include dark-mode {
        background-color: #000;
      }

      .menu-item-container {
        max-width: 55rem;
        padding-top: 2rem;
        width: calc(100% - 2rem);
        margin: auto;
        display: grid;
        grid-gap: 1rem 1rem;
        grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));

        .menu-item-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
}
</style>