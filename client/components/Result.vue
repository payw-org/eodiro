<i18n>
{
  "ko": {
    "nextClass": "다음 수업",
    "hour": "시간",
    "min": "분",
    "remain": "남았어요",
    "timetable": "강의 시간표"
  },
  "en": {
    "nextClass": "Next class",
    "hour": "Hour",
    "min": "Minute",
    "remain": "left",
    "timetable": "Lecture Schedule"
  },
  "zh": {
    "nextClass": "下一課",
    "hour": "小時",
    "min": "分鐘",
    "remain": "留",
    "timetable": "講座時間表"
  },
  "fr": {
    "nextClass": "Prochain cours",
    "hour": "heure",
    "min": "Minute",
    "remain": "Reste",
    "timetable": "Calendrier des cours"
  }
}
</i18n>

<template>
  <div class="content-item result">
    <div class="empty-classrooms-container">
      <div
        class="ec-item-wrapper"
        :class="{appear: room.appear}"
        v-for="(room, i) in classRooms"
        :key="i"
      >
        <div
          class="ec-item"
          :class="'gradient--' + room.level"
          @click="loadTimeTable(room)"
        >
          <h1 class="room-number">{{ room.roomID }}</h1>
          <p class="info">{{ $t('nextClass') }}: <b>{{ room.nextClass }}</b><br><span class="time">{{ room.remainingTime }}</span> {{ $t('remain') }}</p>
        </div>
      </div>
    </div>

    <transition name="zoom">
      <div class="timetable-container" v-show="timeTableShow">
        <div class="background" @click="closeTimeTable()"></div>
        <div class="timetable">
          <button class="close"></button>
          <h1 class="title">{{ selectedRoom }} {{ $t('timetable') }}</h1>
          <div class="lecture-container" v-for="i in 10" :key="i">
            <div class="lecture">
              <div v-for="i in 20" :key="i">{{ i }}</div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Content from 'Components/Content.vue'
import SimpleBar from 'simplebar'
import 'SCSS/simplebar-custom.scss'
import Stagger from 'Modules/Stagger'
import ExpireCounter from 'Modules/ExpireCounter'

export default {
  name: 'result',
  extends: Content,
  data() {
    return {
      classRooms: [],
      timeTableShow: false,
      selectedRoom: undefined,
      sbTimeTable: undefined
    }
  },
  methods: {
    random() {
      return Math.floor(Math.random() * 4) + 1
    },
    closeTimeTable() {
      this.timeTableShow = false
    },
    loadTimeTable(room) {
      this.timeTableShow = true
      this.selectedRoom = room.roomID
  
      // recalculate and reset simplebar
      setTimeout(() => {
        this.sbTimeTable.getScrollElement().scrollTo(0,0)
      }, 0)
  
      const interval = window.setInterval(() => {
        this.sbTimeTable.recalculate()
      }, 100)
      window.setTimeout(() => {
        window.clearInterval(interval)
      }, 300)
    },
    buildIn() {
      Stagger.animate(this.classRooms)
    }
  },
  created() {
    let fetchedClassrooms = []
    for (let i = 0; i < 10; i++) {
      fetchedClassrooms.push({
        roomID: i + 1,
        nextClass: '알고리즘',
        remainingTime: '123',
        level: i % 15 + 1,
        appear: false
      })
    }
    this.classRooms = fetchedClassrooms
  },
  mounted() {
    console.log(this.$el.querySelector('.timetable'))
    this.sbTimeTable = new SimpleBar(this.$el.querySelector('.timetable'), {})
    ;['touchstart', 'mouseover'].forEach(eventName => {
      this.sbTimeTable.getScrollElement().addEventListener(eventName, e => {
        this.sbTimeTable.recalculate()
      })
    })
  }
}
</script>

<style lang="scss">
@import 'SCSS/global-variables.scss';
@import 'SCSS/global-mixins.scss';

.result {
  .empty-classrooms-container {
    display: grid;
    grid-gap: 3rem 2.5rem;
    grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
    width: calc(100% - 6rem);
    max-width: 80rem;
    margin: auto;

    @include smaller-than($mobile-width-threshold) {
      grid-gap: 1rem;
      width: calc(100% - 2rem);
    }

    .ec-item-wrapper {
      opacity: 0;
      transform: translateY($stagger-gap);

      &.appear {
        animation: $spring-time springFadeUp linear;
        animation-fill-mode: both;
      }

      .ec-item {
        cursor: pointer;
        padding: 1rem;
        box-shadow: $eodiro-shadow;
        border-radius: 1rem;
        color: $base-white;
      
        @include dark-mode() {
          box-shadow: $eodiro-shadow, $dark-mode-border-shadow;
      
          @include smaller-than($mobile-width-threshold) {
            box-shadow: $dark-mode-border-shadow;
          }
        }
      
        .room-number {
          font-family: $font-display;
          font-size: 2.5rem;
          font-weight: 700;
          text-align: right;
          line-height: 1;
        }
      
        .info {
          font-size: 1rem;
          margin-top: 2rem;
          line-height: 1.4;
          // background-color: rgba(#000, 0.1);
          border-radius: 0.5rem;
          // padding: 1rem;
      
          .time {
            font-weight: 700;
          }
        }
      }
    }
  }

  .timetable-container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10000;

    &.zoom-enter-active, &.zoom-leave-active {
      transition: opacity 200ms ease;
      opacity: 1;

      .timetable {
        transition: opacity 200ms ease, transform 200ms ease;
        transform: none;
        opacity: 1;
      }
    }
    &.zoom-enter, &.zoom-leave-to {
      opacity: 0;
      
      .timetable {
        opacity: 0;
        transform: scale(1.05);
      }
    }

    .background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      background-color: rgba(0,0,0,0.5);
      backdrop-filter: blur(20px);
    }

    .timetable {
      padding: 0 1rem;
      width: calc(100% - 2rem);
      height: calc(100% - 2rem);
      max-width: 22rem;
      max-height: 30rem;
      background-color: $base-white;
      border-radius: 1rem;
      overflow-x: hidden;
      overflow-y: auto;

      @include dark-mode() {
        background-color: #333;
        box-shadow: $dark-mode-border-shadow;
      }

      .close {
        position: sticky;
        top: 0;
        display: none;
      }

      .title {
        font-size: 2rem;
        font-weight: 700;
        margin-top: 1.5rem;
      }

      .lecture-container {
        .lecture {
          
        }
      }
    }
  }
}
</style>
