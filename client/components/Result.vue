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
          :class="'remaining-time--' + random()"
        >
          <h1 class="room-number">{{ room.roomID }}</h1>
          <p class="info">다음 수업<br><b>[휴먼입니까? ICT - 송노스]</b> 까지<br><span class="time">150시간 2300분</span> 남았어요.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  activated() {
    let rooms = this.$el.querySelectorAll('.ec-item-wrapper')
    rooms.forEach(room => {
      room.classList.remove('appear')
    })
    setTimeout(() => {
      rooms.forEach(room => {
        room.classList.add('appear')
      })
    }, 4)
    
    if (this.isRightDirection) {
      window.scrollTo(0, 0)
    } else {
      window.scrollTo(0, this.scrollPos)
    }
  },
  methods: {
    random() {
      return Math.floor(Math.random() * 4) + 1
    }
  },
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
      ]
    }
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

      @for $i from 0 through 50 {
        &:nth-child(#{$i}) {
          transition-delay: unquote(($i/15) + 's');
        }
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
}
</style>
