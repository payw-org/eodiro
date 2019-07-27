<i18n>
{
  "kr": {
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
  }
}
</i18n>

<template>
  <div class="content-item result">
    <div class="empty-classrooms-container">
      <Loading v-if="classrooms.length === 0" />
      <div class="ec-item-wrapper" v-for="room in classrooms" :key="room.number">
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
              <div>
                {{ $t('nextClass') }}:
                <b>{{ room.nextClass }}</b>
              </div>
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
            <span v-else>{{ $t('noNextClassMsg') }}</span>
          </p>
        </div>
      </div>
      <div class="ec-item-wrapper grid-dummy" v-for="i in 3" :key="'gridDummy' + i"></div>
    </div>

    <div class="timetable-container" :class="{show: timeTableShow}">
      <div class="background" @click="closeTimeTable"></div>
      <div class="timetable">
        <button class="close" @click="closeTimeTable"></button>
        <div class="content">
          <h1 class="title">{{ selectedRoom.number + ' ' + $t('timetable') }}</h1>
          <div class="day-select-wrapper">
            <div class="day-select">
              <button
                class="day mon"
                :class="{selected: timetableDay === 1}"
                @click="setTimeTableAtDay(1)"
              >Mon</button>
              <button
                class="day tue"
                :class="{selected: timetableDay === 2}"
                @click="setTimeTableAtDay(2)"
              >Tue</button>
              <button
                class="day wed"
                :class="{selected: timetableDay === 3}"
                @click="setTimeTableAtDay(3)"
              >Wed</button>
              <button
                class="day thu"
                :class="{selected: timetableDay === 4}"
                @click="setTimeTableAtDay(4)"
              >Thu</button>
              <button
                class="day fri"
                :class="{selected: timetableDay === 5}"
                @click="setTimeTableAtDay(5)"
              >Fri</button>
              <button
                class="day sat"
                :class="{selected: timetableDay === 6}"
                @click="setTimeTableAtDay(6)"
              >Sat</button>
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
  </div>
</template>

<script>
import EodiroPageBase from '~/components/EodiroPageBase.vue'
import Loading from '~/components/Loading'
import SimpleBar from 'simplebar'
import '~/assets/styles/scss/simplebar-custom.scss'
import Stagger from '~/plugins/Stagger'
import ExpireCounter from '~/plugins/ExpireCounter'
import axios from 'axios'
import DTS from '~/plugins/DayToString'
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks
} from 'body-scroll-lock'
import ApiUrl from '~/plugins/ApiUrl'
import { spring, styler } from 'popmotion'

export default {
  extends: EodiroPageBase,
  meta: {
    depth: 3
  },
  components: { Loading },
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
        this.simplebarTimeTableElm.getScrollElement().scrollTo(0, 0)
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
      let url = `https://api.eodiro.com/cau/${this.$route.params.buildingId}/${this.$route.params.floorId}`

      axios.get(url).then(r => {
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

        this.$nextTick(() => {
          this.buildIn()
        })

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
      let hours = (date.getHours() < 10 ? '0' : '') + date.getHours()
      let mins = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
      let time = Number(hours + mins)
      if (
        Number(start) < Number(time) &&
        Number(time) < Number(end) &&
        DTS.dts(date.getDay()) === day
      ) {
        return true
      } else {
        return false
      }
    }
  },
  mounted() {
    this.fetchTimeTable()
    this.simplebarTimeTableElm = new SimpleBar(
      this.$el.querySelector('.timetable'),
      {}
    )
    ;['touchstart', 'mouseover'].forEach(eventName => {
      this.simplebarTimeTableElm
        .getScrollElement()
        .addEventListener(eventName, e => {
          this.simplebarTimeTableElm.recalculate()
        })
    })
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/global-variables.scss';
@import '~/assets/styles/scss/global-mixins.scss';

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
    align-items: flex-end;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10000;
    pointer-events: none;
    visibility: hidden;
    transition: opacity 400ms ease, visibility 400ms ease;

    &.show {
      pointer-events: all;
      visibility: visible;
      opacity: 1;

      .background {
        opacity: 1;
      }

      .timetable {
        transform: translateY(0%);
        visibility: visible;
      }
    }

    .background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      background-color: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(20px);
      opacity: 0;
      transition: opacity 400ms ease;
    }

    .timetable {
      width: calc(100% - 2rem);
      height: calc(100% - 4rem);
      max-width: 30rem;
      max-height: 40rem;
      background-color: $base-white;
      border-radius: 1rem 1rem 0 0;
      transform: translateY(calc(100% + 3rem));
      visibility: hidden;
      transition: transform 400ms ease, visibility 400ms ease;
      overflow-x: hidden;
      overflow-y: auto;

      @include dark-mode() {
        background-color: #333;
        box-shadow: dark-mode-border-shadow(#333);
      }

      .close {
        display: block;
        width: 100%;
        position: sticky;
        top: 0;
        height: 3rem;
        background-image: url('~assets/images/eodiro/down_arrow.svg');
        background-repeat: no-repeat;
        background-position: center;
        background-size: 2rem;
        background-color: $base-white;

        @include dark-mode() {
          background-color: $base-black;
        }
      }

      .content {
        margin-top: 1rem;
        padding: 0 1.5rem;

        .title {
          font-size: 2rem;
          font-weight: 700;
          line-height: 1;
        }

        .day-select-wrapper {
          position: sticky;
          top: calc(3rem - 1px);
          background-color: $base-white;
          padding: 0 0 0.5rem;
          margin-top: 1rem;
          margin-left: -0.2rem;
          margin-right: -0.2rem;
          height: 3rem;

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
              border-radius: 0.5rem;
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

            .time,
            .instructor,
            .name {
              padding: 1rem;
              min-width: 0;
              text-align: center;
            }

            .time {
              &,
              & * {
                font-weight: 700;
              }
              white-space: nowrap;
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
              padding: 1rem;
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
}
</style>
