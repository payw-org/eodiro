<i18n>
{
  "ko": {
    "noti": "어디로가 더 빨라졌습니다!\n이제 층 선택 화면에서 건물명을 볼 수 있습니다."
  },
  "en": {
    "noti": "We improved the performance!\nNow you can see the building name on floor page."
  },
  "zh": {
    "noti": "我们提高了性能！\n现在，您可以在楼层页面上看到建筑物名称。"
  },
  "fr": {
    "noti": "Nous avons amélioré les performances!\nVous pouvez maintenant voir le nom du bâtiment sur la page étage."
  }
}
</i18n>

<template>
  <transition name="slide">
    <aside v-if="!isCompleted" id="notification">
      <div class="banner">
        <button class="close" @click="complete" />
        <div class="content" v-html="htmlMsg" />
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
          begin: '2019-06-12 23:00',
          end: '2019-06-20 23:59',
          content: this.$t('noti'),
        },
        {
          begin: '2019-05-20 09:00',
          end: '2019-05-25 23:59',
          content: `
            🔧 고려대학교 안암캠퍼스와 중앙대학교 안성캠퍼스의 강의 시간표를 수정했습니다.
            🎉 연세대학교 신촌캠퍼스와 송도캠퍼스가 추가되었습니다. 친구들에게 알려주세요!
            🏃 앱이 좀 더 빨라졌습니다.
          `,
        },
      ],
    }
  },
  computed: {
    htmlMsg() {
      const msgArr = this.msgItems[0].content.trim().split('\n')
      let html = ''
      msgArr.forEach((msg) => {
        html += `<p ${this.$options._scopeId}>${msg}</p>`
      })
      return html
    },
  },
  created() {
    // remove old keys
    localStorage.removeItem('completeNoti')
    localStorage.removeItem('completeNoti-alt')

    // set new
    let noti = JSON.parse(localStorage.getItem('notification'))
    if (!noti) {
      noti = {
        completedAt: null,
      }
      localStorage.setItem('notification', JSON.stringify(noti))
    }

    // compare the last completed time and
    // the latest notification's begin time/end time
    const beginUnix = moment(this.getLastestNoti().begin).unix() * 1000
    const endUnix = moment(this.getLastestNoti().end).unix() * 1000
    const now = Date.now()

    if (noti.completedAt) {
      if (
        now > beginUnix &&
        now < endUnix &&
        Number(noti.completedAt) < beginUnix
      ) {
        // notification should appear
        this.isCompleted = false
      } else {
        // notification should not appear
        this.isCompleted = true
      }
    } else if (now > beginUnix && now < endUnix) {
      this.isCompleted = false
    } else {
      this.isCompleted = true
    }
  },
  methods: {
    complete() {
      this.isCompleted = true
      const noti = {
        completedAt: Date.now(),
      }
      localStorage.setItem('notification', JSON.stringify(noti))
    },
    getLastestNoti() {
      return this.msgItems[0]
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/scss/main.scss';

.slide-enter-active,
.slide-leave-active {
  transition: transform 500ms ease;
  transform: translateY(0);
}
.slide-enter,
.slide-leave-to {
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
      @include bgImg('~assets/images/x_white.svg', 'center', '1rem');
      background-color: #5c5c5c;
      border-radius: 50px;
      box-shadow: 0 0.1rem 0.5rem rgba(0, 0, 0, 0.3);

      @include dark-mode() {
        @include bgImg('~assets/images/x.svg', 'center', '1rem');
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
