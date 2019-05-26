<i18n>
{
  "ko": {
    "noti": "전체 강의실 개수를 표시합니다.\n건물 즐겨찾기 기능이 추가됐습니다.\n뒤로 갈 때 애니메이션을 비활성화했습니다."
  },
  "en": {
    "noti": "Added total classrooms number.\nNew feature: Favorite Buildings\nRemoved the animation when you go back."
  },
  "zh": {
    "noti": "增加了教室总数。\n新功能：最喜欢的建筑物\n你回去的时候删掉了动画。"
  },
  "fr": {
    "noti": "Ajout du nombre total de salles de classe.\nNouvelle fonctionnalité: Bâtiments préférés\nSuppression de l'animation à votre retour."
  }
}
</i18n>

<template>
  <transition name="slide">
    <aside id="notification" v-if="!isCompleted">
      <div class="banner" @click="complete">
        <div class="content">
          <p>🔧 고려대학교 안암캠퍼스와 중앙대학교 안성캠퍼스의 강의 시간표를 수정했습니다.</p>
          <p>🎉 연세대학교 신촌캠퍼스와 송도캠퍼스가 추가되었습니다. 친구들에게 알려주세요!</p>
          <p>🏃 앱이 좀 더 빨라졌습니다.</p>
        </div>
      </div>
    </aside>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      isCompleted: false,
      storageName: ['completeNoti', 'completeNoti-alt'],
      switch: 0 // 0 <-> 1
    }
  },
  methods: {
    complete() {
      this.isCompleted = true
      localStorage.setItem(this.storageName[this.switch], 'true')
    }
  },
  created() {
    // clear previous notification storage remembrance
    localStorage.removeItem(this.storageName[Math.abs(this.switch - 1)])

    // set new
    let complete = localStorage.getItem(this.storageName[this.switch])
    if (complete === null) {
      localStorage.setItem(this.storageName[this.switch], 'false')
    }
    this.isCompleted = JSON.parse(localStorage.getItem(this.storageName[this.switch]))
  }
})
</script>


<style lang="scss" scoped>
@import 'SCSS/global-variables';
@import 'SCSS/global-mixins';

.slide-enter-active, .slide-leave-active {
  transition: transform 500ms ease;
  transform: translateY(0);
}
.slide-enter, .slide-leave-to {
  transform: translateY(calc(100% + 2rem));
}

#notification {
  position: fixed;
  z-index: 9999;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;

  .banner {
    cursor: pointer;
    max-width: calc(100% - 3rem);
    position: relative;
    margin-bottom: 2rem;
    border-radius: 0.5rem;
    background-color: $base-black;
    box-shadow: $eodiro-shadow;
    border-left: 0.5rem solid $light-blue;

    @include dark-mode() {
      background-color: $base-white;
      border-left: 0.5rem solid $light-yellow;
    }

    .content {
      text-align: left;
      font-size: 1rem;
      font-weight: 500;
      color: $base-white;
      padding: 1.5rem;

      @include dark-mode() {
        color: $base-black;
      }

      p {
        position: relative;
        margin-bottom: 0.5rem;
        padding-left: 1.2rem;
        line-height: 1.4;

        &::before {
          content: '+';
          position: absolute;
          line-height: 1.2;
          top: 0;
          left: 0;
          font-weight: 700;
        }

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>
