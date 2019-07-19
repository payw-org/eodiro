<i18n>
{
  "kr": {
    "menu_vacant": "빈 강의실 조회",
    "menu_meal": "학식 메뉴",
    "menu_class": "강의 검색",
    "menu_preferences": "설정",
    "menu_review": "리뷰 작성"
  },
  "en": {
    "menu_vacant": "Find Vacant Classrooms",
    "menu_meal": "Restaurant Menu",
    "menu_class": "Search Classes",
    "menu_preferences": "Preferences",
    "menu_review": "Write a review"
  }
}
</i18n>

<template>
  <div id="home">
    <div class="banner" @click="testAlert">
      <div class="tiles"></div>
      <div class="logo-wrapper">
        <img
          src="~/assets/images/eodiro/eodiro_logo_arrow_white.svg"
          alt="eodiro logo"
          class="logo"
        />
      </div>
    </div>

    <div class="menu">
      <div class="menu-item-container">
        <div class="menu-item-wrapper">
          <nuxt-link :to="localePath('vacant')">
            <menu-item class="vacant">
              <template v-slot:title>{{ $t('menu_vacant') }}</template>
            </menu-item>
          </nuxt-link>
        </div>
        <div class="menu-item-wrapper">
          <menu-item class="meal">
            <template v-slot:title>{{ $t('menu_meal') }}</template>
          </menu-item>
        </div>
        <div class="menu-item-wrapper">
          <menu-item class="class">
            <template v-slot:title>{{ $t('menu_class') }}</template>
          </menu-item>
        </div>
        <div class="menu-item-wrapper">
          <menu-item class="preferences">
            <template v-slot:title>{{ $t('menu_preferences') }}</template>
          </menu-item>
        </div>
        <div class="menu-item-wrapper">
          <menu-item class="review">
            <template v-slot:title>{{ $t('menu_review') }}</template>
          </menu-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MenuItem from '~/components/home/MenuItem'
import EodiroModal from '~/plugins/eodiro-modal'

export default {
  components: { MenuItem },
  methods: {
    testConfirm() {
      const modal = new EodiroModal()
      modal.confirm('Confirm message')
    },
    testAlert() {
      const modal = new EodiroModal()
      modal.alert('Alert')
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/global-variables.scss';

.banner {
  width: 100%;
  background-image: linear-gradient(to bottom, $c-step--3, $c-step--4);
  height: 35vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .logo {
    display: block;
    width: 3rem;
    height: 3rem;
  }
}

.menu {
  .menu-item-container {
    max-width: 40rem;
    padding: 1rem 0;
    width: calc(100% - 2rem);
    margin: auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  }
}
</style>
