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
            <template v-slot:title>빈 강의실 조회 및 대여</template>
          </menu-item>
        </nuxt-link>
        <menu-item class="meal">
          <template v-slot:title>학식 메뉴 보기</template>
        </menu-item>
        <menu-item class="class">
          <template v-slot:title>강의 검색</template>
        </menu-item>
        <menu-item class="preferences">
          <template v-slot:title>설정</template>
        </menu-item>
      </div>
    </div>
  </div>
</template>

<script>
import MenuItem from '~/components/Home/MenuItem.vue'

export default {
  components: { MenuItem }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/scss/global-variables.scss';

.banner {
  width: 100%;
  background-image: linear-gradient(to bottom, $edr-step--3, $edr-step--4);
  height: 12rem;
  display: flex;
  align-items: center;
  justify-content: center;

  .logo {
    width: 3rem;
    height: 3rem;
  }
}

.menu {
  .menu-item-container {
    padding: 1rem 0 0 0;
    width: calc(100% - 2rem);
    margin: auto;
  }
}
</style>
