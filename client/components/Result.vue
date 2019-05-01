<template>
  <div class="content-item result">
    <div class="empty-classrooms-container">
      <div
        class="ec-item"
        :class="'remaining-time--' + random()"
        v-for="(room, i) in emptyRooms"
        :key="i"
      >
        <h1 class="room-number">{{ room.roomID }}</h1>
        <p class="info">다음 수업()까지<br><span class="time">1시간 23분</span> 남았어요.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  activated() {
    let rooms = this.$el.querySelectorAll('.ec-item')
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

    .ec-item {
      cursor: pointer;
      padding: 1rem;
      box-shadow: $eodiro-shadow;
      border-radius: 1rem;
      color: $base-white;
      opacity: 0;
      transform: translateY(10rem);

      @include dark-mode() {
        box-shadow: $eodiro-shadow, $dark-mode-border-shadow;

        @include smaller-than($mobile-width-threshold) {
          box-shadow: $dark-mode-border-shadow;
        }
      }

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

      .room-number {
        font-family: $font-display;
        font-size: 2.5rem;
        font-weight: 700;
        text-align: right;
        line-height: 1;
      }

      .info {
        font-size: 1rem;
        margin-top: 1rem;
        line-height: 1.2;

        .time {
          font-weight: 700;
        }
      }

      &.remaining-time--1 {
        background-color: #4e99fc;
      }
      &.remaining-time--2 {
        background-color: #18d687;
      }
      &.remaining-time--3 {
        background-color: #ff9f32;
      }
      &.remaining-time--4 {
        background-color: #f73434;
      }
    }
  }
}
</style>
