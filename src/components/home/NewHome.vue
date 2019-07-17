<i18n>
{
  "kr": {
    "menu_vacant": "빈 강의실 조회 및 대여",
    "menu_meal": "학식 메뉴 보기",
    "menu_class": "강의 검색",
    "menu_preferences": "설정"
  },
  "en": {
    "menu_vacant": "Find/lend a Vacant Classroom",
    "menu_meal": "Restaurant Menu",
    "menu_class": "Search Classes",
    "menu_preferences": "Preferences"
  }
}
</i18n>

<template>
  <div id="home">
    <div class="banner">
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
        <nuxt-link :to="localePath('vacant')">
          <menu-item class="vacant">
            <template v-slot:title>{{ $t('menu_vacant') }}</template>
          </menu-item>
        </nuxt-link>
        <menu-item class="meal">
          <template v-slot:title>{{ $t('menu_meal') }}</template>
        </menu-item>
        <menu-item class="class">
          <template v-slot:title>{{ $t('menu_class') }}</template>
        </menu-item>
        <menu-item class="preferences">
          <template v-slot:title>{{ $t('menu_preferences') }}</template>
        </menu-item>
      </div>
    </div>
  </div>
</template>

<script>
import MenuItem from '~/components/home/MenuItem'
import Modal from '~/plugins/eodiro-modal'

export default {
  components: { MenuItem },
  mounted() {}
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/scss/global-variables.scss';

.banner {
  width: 100%;
  background-image: linear-gradient(to bottom, $c-step--3, $c-step--4);
  height: 12rem;
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
    max-width: 50rem;
    padding: 1rem 0 0 0;
    width: calc(100% - 2rem);
    margin: auto;
    display: grid;
    grid-column-gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  }
}
</style>
