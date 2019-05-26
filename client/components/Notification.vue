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
      <div class="banner">
        <button class="close" @click="complete"></button>
        <div class="content" v-html="htmlMsg"></div>
      </div>
    </aside>
  </transition>
</template>

<script>
import moment from 'moment'

export default {
  data() {
    return {
      isCompleted: false,
      msgItems: [
        {
          begin: '2019-05-26 09:00',
          end: '2019-12-31 23:59',
          content: this.$t('noti')
        },
        {
          begin: '2019-05-20 09:00',
          end: '2019-05-25 23:59',
          content: `
            🔧 고려대학교 안암캠퍼스와 중앙대학교 안성캠퍼스의 강의 시간표를 수정했습니다.
            🎉 연세대학교 신촌캠퍼스와 송도캠퍼스가 추가되었습니다. 친구들에게 알려주세요!
            🏃 앱이 좀 더 빨라졌습니다.
          `
        }
      ]
    }
  },
  computed: {
    htmlMsg() {
      let msgArr = this.msgItems[0].content.trim().split('\n')
      let html = ''
      msgArr.forEach(msg => {
        html += `<p ${this.$options._scopeId}>${msg}</p>`
      })
      return html
    }
  },
  methods: {
    complete() {
      this.isCompleted = true
      let noti = {
        completedAt: Date.now()
      }
      localStorage.setItem('notification', JSON.stringify(noti))
    },
    getLastestNoti() {
      return this.msgItems[0]
    }
  },
  created() {
    // remove old keys
    localStorage.removeItem('completeNoti')
    localStorage.removeItem('completeNoti-alt')

    // set new
    let noti = JSON.parse(localStorage.getItem('notification'))
    if (!noti) {
      noti = {
        completedAt: null
      }
      localStorage.setItem('notification', JSON.stringify(noti))
    }

    // compare the last completed time and
    // the latest notification's begin time/end time
    let beginUnix = moment(this.getLastestNoti().begin).unix()*1000
    let endUnix = moment(this.getLastestNoti().end).unix()*1000
    let now = Date.now()

    if (noti.completedAt) {
      if (now > beginUnix && now < endUnix && Number(noti.completedAt) < beginUnix) {
        // notification should appear
        this.isCompleted = false
      } else {
        // notification should not appear
        this.isCompleted = true
      }
    } else {
      if (now > beginUnix && now < endUnix) {
        this.isCompleted = false
      } else {
        this.isCompleted = true
      }
    }
  }
}
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

    .close {
      position: absolute;
      top: -1rem;
      right: 50%;
      transform: translateX(calc(50% - 0.5rem));
      width: 2rem;
      height: 2rem;
      @include bgImg('/assets/images/eodiro/x_white.svg', 'center', '1rem');
      background-color: #5c5c5c;
      border-radius: 50px;
      box-shadow: 0 0.1rem 0.5rem rgba(0,0,0,0.3);

      @include dark-mode() {
        @include bgImg('/assets/images/eodiro/x.svg', 'center', '1rem');
        background-color: #fff;
      }
    }

    .content {
      text-align: left;
      font-size: 1rem;
      font-weight: 500;
      color: $base-white;
      padding: 1.5rem 1.5rem 1.2rem;

      @include dark-mode() {
        color: $base-black;
      }

      p {
        position: relative;
        margin-bottom: 0.3rem;
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
