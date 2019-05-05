<template>
  <div class="content-item result">
    <div class="empty-classrooms-container">
      <div
        class="ec-item-wrapper"
        v-for="(room, i) in emptyRooms"
        :key="i"
      >
        <div
          class="ec-item"
          :class="'remaining-time--' + (i % 4 + 1)"
          @click="loadTimeTable(room)"
        >
          <h1 class="room-number">{{ room.roomID }}</h1>
          <p class="info">다음 수업<br><b>[휴먼입니까? ICT - 송노스]</b> 까지<br><span class="time">150시간 2300분</span> 남았어요.</p>
        </div>
      </div>
    </div>

    <transition name="zoom">
      <div class="timetable-container" v-show="timeTableShow">
        <div class="background" @click="closeTimeTable()"></div>
        <div class="timetable">
          <button class="close"></button>
          <h1 class="title">{{ selectedRoom }}호 강의 시간표</h1>
          <div class="lecture-container" v-for="i in 10" :key="i">
            <div class="lecture">

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
// import 'simplebar/dist/simplebar.css'
import 'SCSS/simplebar-custom.scss'

export default {
  name: 'result',
  extends: Content,
  data() {
    return {
      emptyRooms: [
        {
          roomID: 727,
          timeTable: []
        },
        {
          roomID: 726,
          timeTable: []
        },
        {
          roomID: 728,
          timeTable: []
        },
        {
          roomID: 710,
          timeTable: []
        },
        {
          roomID: 715,
          timeTable: []
        },
        {
          roomID: 720,
          timeTable: []
        },
        {
          roomID: 729,
          timeTable: []
        },
        {
          roomID: 712,
          timeTable: []
        }
      ],
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
      let rooms = this.$el.querySelectorAll('.ec-item-wrapper')
      rooms.forEach(room => {
        room.classList.remove('appear')
      })
      let i = 0
      let interval = window.setInterval(() => {
        rooms[i++].classList.add('appear')
        if (i === rooms.length) {
          window.clearInterval(interval)
        }
      }, 50)
    }
  },
  mounted() {
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
@import 'SCSS/gradients.scss';

.result {
  .empty-classrooms-container {
    display: grid;
    grid-gap: 3rem 2.5rem;
    grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
    width: calc(100% - 6rem);
    max-width: 80rem;
    margin: auto;
    padding-bottom: 10rem;

    @include smaller-than($mobile-width-threshold) {
      grid-gap: 1rem;
      width: calc(100% - 2rem);
    }

    .ec-item-wrapper {
      opacity: 0;
      transform: translateY(10rem);

      &.appear {
        opacity: 1;
        transform: translateY(0);
        transition: transform 1000ms $eodiro-cb, opacity 1000ms $eodiro-cb;
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
      
        &.remaining-time--1 {
          background-color: #4e99fc;
          background-color: #006FFE;
          background-color: #18B8F9;
        }
        &.remaining-time--2 {
          background-color: #18d687;
          background-color: #42D359;
        }
        &.remaining-time--3 {
          background-color: #ff9f32;
          background-color: #FF8902;
        }
        &.remaining-time--4 {
          background-color: #f73434;
          background-color: #FF264B;
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
      transition: opacity 0.3s ease;
      opacity: 1;

      .timetable {
        transition: opacity 0.3s ease, transform 0.3s ease, filter 0.3s ease;
        transform: scale(1);
        opacity: 1;
        filter: blur(0px);
      }
    }
    &.zoom-enter, &.zoom-leave-to {
      opacity: 0;
      
      .timetable {
        opacity: 0;
        transform: scale(0.8);
        filter: blur(10px);
      }
    }

    .background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      background-color: rgba(0,0,0,0.4);
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
