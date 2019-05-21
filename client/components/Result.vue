<i18n>
{
  "ko": {
    "nextClass": "다음 수업",
    "noNextClassMsg": "다음 수업이 없습니다.",
    "hour": "시간",
    "min": "분",
    "remain": "남았어요",
    "timetable": "강의 시간표",
    "no_timetable": "강의 시간표가 없습니다"
  },
  "en": {
    "nextClass": "Next Class",
    "noNextClassMsg": "다음 수업이 없습니다.",
    "hour": "h",
    "min": "m",
    "remain": "Left",
    "timetable": "Timetable",
    "no_timetable": "No Timetable"
  },
  "zh": {
    "nextClass": "下一課",
    "noNextClassMsg": "다음 수업이 없습니다.",
    "hour": "小時",
    "min": "分鐘",
    "remain": "留",
    "timetable": "時間表",
    "no_timetable": "강의 시간표가 없습니다"
  },
  "fr": {
    "nextClass": "Prochain Cours",
    "noNextClassMsg": "다음 수업이 없습니다.",
    "hour": "h",
    "min": "m",
    "remain": "Reste",
    "timetable": "Calendrier",
    "no_timetable": "강의 시간표가 없습니다"
  }
}
</i18n>

<template>
  <div class="content-item result">
    <div class="empty-classrooms-container">
      <Loading v-if="classrooms.length === 0" />
      <div
        class="ec-item-wrapper"
        v-for="room in classrooms"
        :key="room.number"
      >
        <div
          class="ec-item"
          :class="[
            'gradient--' + (room.expireTimeLevel + 1),
            {
              grayed: room.expireTimeLevel === -1,
              'full-time': !room.nextClass
            }
          ]"
          @click="openTimeTable(room, new Date().getDay())"
        >
          <h1 class="room-number">{{ room.number }}</h1>
          <p class="info">
            <span v-if="room.nextClass && room.expireTimeLevel >= 0">
              <div>{{ $t('nextClass') }}: <b>{{ room.nextClass }}</b></div>
              <div>
                <span class="time">
                  <span class="hour" v-if="room.hour">
                    <b>{{ room.hour + $t('hour') }}</b>
                  </span>
                  <span class="min" v-if="room.min">
                    <b>{{ room.min + $t('min') }}</b>
                  </span>
                </span>
                {{ $t('remain') }}
              </div>
            </span>
            <span v-else-if="room.expireTimeLevel === -1">
              <div>현재 수업중입니다</div>
            </span>
            <span v-else>
              {{ $t('noNextClassMsg') }}
            </span>
          </p>
        </div>
      </div>
      <div class="ec-item-wrapper grid-dummy" v-for="i in 3" :key="'gridDummy' + i"></div>
    </div>

    <div class="timetable-container" :class="{show: timeTableShow}">
      <div class="background" @click="closeTimeTable()"></div>
      <div class="timetable">
        <button class="close"></button>
        <h1 class="title">{{ selectedRoom.number + ' ' + $t('timetable') }}</h1>
        <div class="day-select-wrapper">
          <div class="day-select">
            <button class="day mon" :class="{selected: timetableDay === 1}" @click="setTimeTableAtDay(1)">Mon</button>
            <button class="day tue" :class="{selected: timetableDay === 2}" @click="setTimeTableAtDay(2)">Tue</button>
            <button class="day wed" :class="{selected: timetableDay === 3}" @click="setTimeTableAtDay(3)">Wed</button>
            <button class="day thu" :class="{selected: timetableDay === 4}" @click="setTimeTableAtDay(4)">Thu</button>
            <button class="day fri" :class="{selected: timetableDay === 5}" @click="setTimeTableAtDay(5)">Fri</button>
            <button class="day sat" :class="{selected: timetableDay === 6}" @click="setTimeTableAtDay(6)">Sat</button>
            <!-- <button class="day sun" :class="{selected: timetableDay === 0}" @click="setTimeTableAtDay(0)">Sun</button> -->
          </div>
        </div>
        <div class="lecture-container">
          <div v-if="selectedLectures.length > 0">
            <div
              v-for="(l, i) in selectedLectures"
              :key="l.name + i"
              class="lecture"
              :class="{current: isCurrentLecture(l.time.start, l.time.end, l.time.day)}"
            >
              <div class="time">
                <div>{{ l.time.start.slice(0, 2) + ':' + l.time.start.slice(2, 4) }}</div>
                <div>|</div>
                <div>{{ l.time.end.slice(0, 2) + ':' + l.time.end.slice(2, 4) }}</div>
              </div>
              <div class="instructor">{{ l.instructor }}</div>
              <div class="name">{{ l.name }}</div>
            </div>
          </div>
          <div v-else class="no-timetable-msg">{{ $t('no_timetable') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Content from 'Components/Content'
import Loading from 'Components/Loading'
import SimpleBar from 'simplebar'
import 'SCSS/simplebar-custom.scss'
import Stagger from 'Modules/Stagger'
import ExpireCounter from 'Modules/ExpireCounter'
import axios from 'axios'
import DTS from 'Modules/DayToString'
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import ApiUrl from 'Modules/ApiUrl'

export default {
  name: 'result',
  extends: Content,
  components: {Loading},
  data() {
    return {
      classrooms: [],
      timeTableShow: false,
      selectedRoom: {},
      simplebarTimeTableElm: undefined,
      timetableDay: new Date().getDay(),
      selectedLectures: []
    }
  },
  computed: {
    timeInterval(start, end) {
      return start + end
    }
  },
  methods: {
    random() {
      return Math.floor(Math.random() * 4) + 1
    },
    closeTimeTable() {
      this.timeTableShow = false

      // unlock body scroll
      enableBodyScroll(this.$el.querySelector('.simplebar-content-wrapper'))
    },
    openTimeTable(room) {
      // lock body scroll
      disableBodyScroll(this.$el.querySelector('.simplebar-content-wrapper'))

      this.timetableDay = new Date().getDay()
      this.timeTableShow = true
      this.selectedRoom = room

      // set table data
      this.setTimeTableAtDay(this.timetableDay)
  
      // recalculate and reset simplebar
      setTimeout(() => {
        this.simplebarTimeTableElm.getScrollElement().scrollTo(0,0)
      }, 0)
  
      const interval = window.setInterval(() => {
        this.simplebarTimeTableElm.recalculate()
      }, 100)
      window.setTimeout(() => {
        window.clearInterval(interval)
      }, 300)
    },
    setTimeTableAtDay(dayNum) {
      this.timetableDay = dayNum
      let dayStr = DTS.dts(dayNum)

      let lectures = this.selectedRoom.lectures.filter(l => {
        return l.time.day === dayStr
      })
      this.selectedLectures = lectures
    },
    buildIn() {
      Stagger.show(this.$el.querySelectorAll('.ec-item'), true)
    },
    buildOut() {
      Stagger.hide(this.$el.querySelectorAll('.ec-item'))
    },
    fetchTimeTable() {
      axios.get(ApiUrl.get() + location.pathname)
        .then(r => {
          if (r.data.err) {
            location.replace('/404')
            return
          }

          this.classrooms = r.data.classrooms
      
          let counter = new ExpireCounter(this.classrooms)
          let date = new Date()
      
          for (let i = 0; i < this.classrooms.length; i++) {
            let c = this.classrooms[i]
            let counterResult = counter.run(c.number, date)

            c.remainingTime = counterResult.expireTime
            counterResult.expireTime = Math.round(counterResult.expireTime)
            c.expireTimeLevel = counterResult.expireTimeLevel

            // max expireTimeLevel should be 10
            // since we use 11 colors (red ~ purple)
            if (c.expireTimeLevel > 10) {
              c.expireTimeLevel = 10
            }

            c.nextClass = counterResult.nextClassName
            c.hour = parseInt(counterResult.expireTime / 60)
            c.min = counterResult.expireTime - c.hour * 60
          }
      
          // sort the result classrooms
          // default is sort by the classroom number
          // this.classrooms.sort(function (a, b) {
          //   if (!a.remainingTime) {
          //     return -1
          //   } else if (!b.remainingTime) {
          //     return 1
          //   } else {
          //     return b.remainingTime - a.remainingTime
          //   }
          // })
        })
    },
    isCurrentLecture(start, end, day) {
      let date = new Date()
      let hours = (date.getHours()<10?'0':'') + date.getHours()
      let mins = (date.getMinutes()<10?'0':'') + date.getMinutes()
      let time = Number(hours + mins)
      if (Number(start) < Number(time) && Number(time) < Number(end) && DTS.dts(date.getDay()) === day) {
        return true
      } else {
        return false
      }
    }
  },
  created() {
    this.fetchTimeTable()
  },
  updated() {
    this.buildIn()
  },
  mounted() {
    this.simplebarTimeTableElm = new SimpleBar(this.$el.querySelector('.timetable'), {})
    ;['touchstart', 'mouseover'].forEach(eventName => {
      this.simplebarTimeTableElm.getScrollElement().addEventListener(eventName, e => {
        this.simplebarTimeTableElm.recalculate()
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
    position: relative;
    display: grid;
    grid-gap: 3rem 2.5rem;
    grid-template-columns: repeat(auto-fit, minmax($grid-max-width, 1fr));
    width: calc(100% - 6rem);
    max-width: 80rem;
    margin: auto;

    @include smaller-than($mobile-width-threshold) {
      grid-gap: 1rem;
      width: calc(100% - 2rem);
    }

    .ec-item-wrapper {
      .ec-item {
        opacity: 0;
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
    pointer-events: none;
    visibility: hidden;
    opacity: 0;
    transform: scale(1.05);
    transition: opacity 300ms ease, visibility 300ms ease, transform 300ms ease;

    &.show {
      pointer-events: all;
      visibility: visible;
      opacity: 1;
      transform: scale(1);

      .timetable {

      }
    }

    .background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      background-color: rgba(0,0,0,0.6);
      backdrop-filter: blur(20px);
    }

    .timetable {
      padding: 0 1.5rem;
      width: calc(100% - 2rem);
      height: calc(100% - 2rem);
      max-width: 25rem;
      max-height: 35rem;
      background-color: $base-white;
      border-radius: 1rem;
      overflow-x: hidden;
      overflow-y: auto;

      @include dark-mode() {
        background-color: #333;
        box-shadow: dark-mode-border-shadow(#333);
      }

      .close {
        position: sticky;
        top: 0;
        display: none;
      }

      .title {
        font-size: 2rem;
        font-weight: 700;
        margin-top: 2rem;
        line-height: 1;
      }

      .day-select-wrapper {
        position: sticky;
        top: 0;
        background-color: $base-white;
        padding: 0.5rem 0;
        margin-top: 1rem;
        height: 3.2rem;

        @include dark-mode() {
          background-color: #333;
        }

        .day-select {
          display: block;
          font-size: 0;
          white-space: nowrap;
          overflow-x: auto;
          overflow-y: hidden;
          height: 100%;
        
          .day {
            display: inline-block;
            width: unquote(100/6 + '%');
            min-width: 40px;
            border: none;
            border-radius: 0.3rem;
            font-size: 0.9rem;
            height: 100%;
            cursor: pointer;
            font-weight: 500;
            background-color: $base-white;
            color: $base-black;

            @include dark-mode() {
              color: $base-white;
              background-color: #333;
            }
        
            &.selected {
              background-color: $light-blue;
              color: $base-white;
        
              @include dark-mode() {
                background-color: $light-yellow;
                color: $base-black;
              }
            }
          }
        }
      }

      .lecture-container {
        margin-top: 1rem;

        .lecture {
          display: flex;
          align-items: center;
          background-color: $base-white-blue;
          border-radius: 0.4rem;
          overflow: hidden;
          margin-bottom: 1rem;
          font-size: 1rem;
          text-align: center;

          @include dark-mode() {
            background-color: #222;
          }

          &.current {
            box-shadow: 0 0 0 0.2rem $light-blue;

            @include dark-mode() {
              box-shadow: 0 0 0 0.2rem $light-yellow;
            }
          }

          .time, .instructor, .name {
            padding: 1rem;
            min-width: 0;
            text-align: center;
          }

          .time {
            &, & * {
              font-weight: 700;
            }
            flex: 1;
            line-height: 1.5;
            color: darken($light-blue, 10%);
            color: $light-blue;

            @include dark-mode() {
              color: lighten($light-yellow, 10%);
            }
          }
          .instructor {
            flex: 1;
          }
          .name {
            flex: 2;
          }
        }

        .no-timetable-msg {
          font-size: 1rem;
          font-weight: 400;
          text-align: center;
          padding-top: calc(50% - 1rem);
        }
      }
    }
  }
}
</style>
