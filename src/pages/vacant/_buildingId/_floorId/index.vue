<template>
  <div class="content-item result">
    <Grid class="empty-classrooms-container">
      <div v-for="room in classrooms" :key="room.number" class="grid-wrapper">
        <ArrowBlock class="classroom" no-arrow @click="openTimeTable(room)">
          <template v-slot:content>
            <h1 class="room-number">
              {{ room.number }}
            </h1>
            <div class="info">
              <span v-if="room.nextClass && room.expireTimeLevel >= 0">
                <p class="label">
                  {{ $t('vacant.nextClass') }}:
                  <b>{{ room.nextClass }}</b>
                </p>
                <div>
                  <p class="time label">
                    <span v-if="room.hour" class="hour">
                      <b>{{ room.hour + $t('vacant.hour') }}</b>
                    </span>
                    <span v-if="room.min" class="min">
                      <b>{{ room.min + $t('vacant.min') }}</b>
                    </span>
                    {{ $t('vacant.remain') }}
                  </p>
                </div>
              </span>
              <p v-else-if="room.expireTimeLevel === -1" class="label">
                {{ $t('vacant.inClass') }}
              </p>
              <p v-else class="no-next-class-label label">
                {{ $t('vacant.noNextClassMsg') }}
              </p>
            </div>
          </template>
        </ArrowBlock>
      </div>
    </Grid>

    <transition name="custom">
      <div
        v-if="isTimeTableVisible"
        ref="timeTableContainer"
        class="timetable-container"
        :class="{ active: isTimeTableActive }"
      >
        <div class="background" @click="closeTimeTable" />
        <div ref="timetable" class="timetable" @scroll="fixScroll">
          <button class="close" @click="closeTimeTable" />
          <div class="content">
            <h1 class="title">
              {{ selectedRoom.number + ' ' + $t('vacant.timetable') }}
            </h1>
            <div class="day-select-wrapper">
              <div class="day-select">
                <button
                  class="day mon"
                  :class="{ selected: timetableDay === 1 }"
                  @click="setTimeTableAtDay(1)"
                >
                  Mon
                </button>
                <button
                  class="day tue"
                  :class="{ selected: timetableDay === 2 }"
                  @click="setTimeTableAtDay(2)"
                >
                  Tue
                </button>
                <button
                  class="day wed"
                  :class="{ selected: timetableDay === 3 }"
                  @click="setTimeTableAtDay(3)"
                >
                  Wed
                </button>
                <button
                  class="day thu"
                  :class="{ selected: timetableDay === 4 }"
                  @click="setTimeTableAtDay(4)"
                >
                  Thu
                </button>
                <button
                  class="day fri"
                  :class="{ selected: timetableDay === 5 }"
                  @click="setTimeTableAtDay(5)"
                >
                  Fri
                </button>
                <button
                  class="day sat"
                  :class="{ selected: timetableDay === 6 }"
                  @click="setTimeTableAtDay(6)"
                >
                  Sat
                </button>
              </div>
            </div>

            <div class="lecture-container">
              <div v-if="selectedLectures.length > 0">
                <div
                  v-for="(l, i) in selectedLectures"
                  :key="l.name + i"
                  class="lecture"
                  :class="{
                    current: isCurrentLecture(
                      l.time.start,
                      l.time.end,
                      l.time.day
                    ),
                  }"
                >
                  <div class="time">
                    <div>
                      {{
                        l.time.start.slice(0, 2) +
                          ':' +
                          l.time.start.slice(2, 4)
                      }}
                    </div>
                    <div>|</div>
                    <div>
                      {{
                        l.time.end.slice(0, 2) + ':' + l.time.end.slice(2, 4)
                      }}
                    </div>
                  </div>
                  <div class="instructor">
                    {{ l.instructor }}
                  </div>
                  <div class="name">
                    {{ l.name }}
                  </div>
                </div>
              </div>
              <div v-else class="no-timetable-msg">
                {{ $t('vacant.noTimetable') }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from 'axios'
import pageBase from '~/mixins/page-base'
import modalScroll from '~/mixins/modal-scroll'
import ExpireCounter from '~/modules/expire-counter'
import { Grid, ArrowBlock } from '~/components/ui'

export default {
  name: 'vacant-result',
  components: { Grid, ArrowBlock },
  mixins: [pageBase, modalScroll],
  asyncData({ app, redirect, route }) {
    const campus = 'seoul'
    const url = `https://api.eodiro.com/v2/campuses/${campus}/vacant/buildings/${route.params.buildingId}/floors/${route.params.floorId}/classrooms`

    return axios(url, {
      method: 'get',
    })
      .then((res) => {
        if (res.data.err) {
          console.error(res.data.err.msg)
        } else {
          return {
            classrooms: res.data.classrooms,
          }
        }
      })
      .catch(() => {
        redirect(app.localePath('not-found'))
      })
  },
  data() {
    return {
      classrooms: [],
      isTimeTableVisible: false,
      isTimeTableActive: false,
      selectedRoom: {},
      timetableDay: new Date().getDay(),
      selectedLectures: [],
    }
  },
  computed: {
    timeInterval(start, end) {
      return start + end
    },
  },
  mounted() {
    // Calculate remaining time of each class after load
    const counter = new ExpireCounter(this.classrooms)
    const date = new Date()

    for (const classroom of this.classrooms) {
      const counterResult = counter.run(classroom.number, date)
      classroom.remainingTime = counterResult.expireTime
      counterResult.expireTime = Math.round(counterResult.expireTime)
      classroom.expireTimeLevel = counterResult.expireTimeLevel

      // max expireTimeLevel should be 10
      // since we use 11 colors (red ~ purple)
      if (classroom.expireTimeLevel > 10) {
        classroom.expireTimeLevel = 10
      }

      classroom.nextClass = counterResult.nextClassName
      classroom.hour = parseInt(counterResult.expireTime / 60)
      classroom.min = counterResult.expireTime - classroom.hour * 60
    }

    // Server side rendered view will not be rerendered
    // on client side even if you manipulate the data
    // after mounted
    this.$forceUpdate()
  },
  methods: {
    closeTimeTable() {
      // Enable body scroll and
      this.isTimeTableActive = false
      this.isTimeTableVisible = false
    },
    openTimeTable(room) {
      this.timetableDay = new Date().getDay()
      this.selectedRoom = room

      this.isTimeTableVisible = true
      this.$nextTick(() => {
        this.$refs.timeTableContainer.getBoundingClientRect()
        this.isTimeTableActive = true
      })

      // Set table data
      this.setTimeTableAtDay(this.timetableDay)
    },
    setTimeTableAtDay(dayNum) {
      this.timetableDay = dayNum

      const lectures = this.selectedRoom.lectures.filter((l) => {
        return l.time.day === this.timetableDay
      })

      this.selectedLectures = lectures
    },
    isCurrentLecture(start, end, day) {
      const date = new Date()
      const hours = (date.getHours() < 10 ? '0' : '') + date.getHours()
      const mins = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
      const time = Number(hours + mins)
      if (
        Number(start) < Number(time) &&
        Number(time) < Number(end) &&
        date.getDay() === day
      ) {
        return true
      } else {
        return false
      }
    },
  },
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/main';

.result {
  .empty-classrooms-container {
    .classroom {
      .room-number {
        font-size: 2.5rem;
        font-weight: 700;
      }

      .info {
        color: $base-gray;
        margin-top: 0.5rem;

        .label {
          font-size: 0.9rem;
          font-weight: 500;
        }
      }
    }
  }

  .timetable-container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    z-index: 10000;

    &.active {
      .background {
        opacity: 1;
      }

      .timetable {
        animation: springSlideUp 600ms linear;
      }
    }

    &.custom-leave-active {
      .timetable {
        animation: springSlideDown 600ms linear both;
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
      opacity: 0;
      transition: opacity 400ms ease;
    }

    .timetable {
      width: 100%;
      height: calc(100% - 5rem);
      max-width: 30rem;
      max-height: 40rem;
      background-color: #fff;
      border-radius: r(6);
      overflow-x: hidden;
      overflow-y: auto;

      @include dark-mode {
        background-color: #111;
      }

      .close {
        display: block;
        width: 100%;
        position: sticky;
        top: 0;
        height: 3rem;
        background-image: url('~assets/images/down_arrow.svg');
        background-repeat: no-repeat;
        background-position: center;
        background-size: 2rem;
        border-radius: r(6);
        background-color: #fff;

        @include dark-mode {
          background-color: #111;
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
          background-color: #fff;
          padding: 0 0 0.5rem;
          margin-top: 1rem;
          height: 3rem;

          @include dark-mode() {
            background-color: #111;
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
              background-color: #fff;
              color: $base-black;

              @include dark-mode() {
                color: $base-white;
                background-color: #111;
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
            background-color: $base-white-blue;
            display: flex;
            align-items: center;
            border-radius: 0.4rem;
            overflow: hidden;
            margin-bottom: 1rem;
            font-size: 1rem;
            text-align: center;

            @include dark-mode() {
              background-color: #000;
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
              font-weight: 700;
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
