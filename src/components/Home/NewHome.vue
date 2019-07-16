<template>
  <div id="home">
    <div class="banner">
      <div class="tiles"></div>
      <div class="logo-wrapper">
        <img src="~/assets/images/eodiro/eodiro_logo_arrow_white.svg" alt="eodiro logo" class="logo">
      </div>
    </div>

    <div class="menu">
      <div class="menu-item-container">
        <div class="menu-item" v-for="menu in menus" :key="menu.title">
          <div class="menu-icon-area">
            <div class="menu-icon-wrapper">
              <span class="menu-icon"></span>
            </div>
          </div>
          <h1 class="title">{{ menu.title }}</h1>
          <div class="arrow-wrapper">
            <span class="arrow"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: [
        {
          title: '빈 강의실 조회 및 대여'
        },
        {
          title: '학식 메뉴 보기'
        },
        {
          title: '강의 검색'
        },
        {
          title: '설정'
        }
      ]
    }
  }
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

    .menu-item {
      display: flex;
      border-radius: 8px;
      transition: background-color 100ms ease;

      &:active {
        background-color: $eodiro-gray;
      }

      .menu-icon-area {
        width: 4rem;
        display: flex;
        align-items: center;
        justify-content: center;

        .menu-icon-wrapper {
          display: block;
          width: 2rem;
          height: 2rem;
          background-image: linear-gradient(to bottom, $edr-step--3, $edr-step--4);
          border-radius: 5px;

          .menu-icon {
            display: block;
            width: 2rem;
            height: 2rem;
            background-image: url('~assets/images/eodiro/door_white.svg');
            background-position: center;
            background-repeat: no-repeat;
            background-size: 90%;
          }
        }
      }

      .title {
        font-size: 1.5rem;
        font-weight: 600;
        flex: 1;
        margin: 2rem 0;
        color: $edr-step--4;
      }

      .arrow-wrapper {
        width: 2.5rem;
        display: flex;
        align-items: center;
        justify-content: center;

        .arrow {
          display: block;
          width: 0.6rem;
          height: 2rem;
          background-image: url('~assets/images/eodiro/arrow_right_step4.svg');
          background-position: center;
          background-repeat: no-repeat;
          background-size: contain;
        }
      }
    }
  }
}
</style>
