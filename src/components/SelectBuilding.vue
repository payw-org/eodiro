<template>
  <div class="content-item select-building">
    <div class="building-container">
      <router-link v-for="(building, index) in buildings" :key="index" :to="'/buildings/' + building.name.number">
        <div class="building">
          <div class="building-name">
            <div class="wrapper">
              <span class="name--number">{{ building.name.number }}</span>
              <span class="name--text">{{ building.name.text }}</span>
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
  },
  mounted() {
    let buildings = this.$el.querySelectorAll('.building')
    let data = []
    buildings.forEach(building => {
      let colorCode
      while (1) {
        colorCode = Math.floor(Math.random() * 76) + 1
        if (data[colorCode] === undefined) {
          data[colorCode] = 1
          break
        }
      }
      building.classList.add('gradient--' + colorCode)
    })
  },
  activated() {
    let buildings = this.$el.querySelectorAll('.building')
    buildings.forEach((building, index) => {
      building.classList.remove('appear')
      building.classList.remove('done')
      building.style.transitionDelay = (index / 15) + 0.1 + 's'
    })
    setTimeout(() => {
      buildings.forEach(building => {
        building.classList.add('appear')
        building.addEventListener('transitionend', e => {
          if (!building.classList.contains('done')) {
            building.style = ''
            building.classList.add('done')
          }
        })
      })
    }, 50)
  },
  data() {
    return {
      buildings: [
        {
          name: {
            number: 101,
            text: '영신관'
          }
        },
        {
          name: {
            number: 102,
            text: '약학대학 및 R&D센터'
          }
        },
        {
          name: {
            number: 103,
            text: '파이퍼홀'
          }
        },
        {
          name: {
            number: 104,
            text: '수림과학관'
          }
        },
        {
          name: {
            number: 105,
            text: '제1의학관'
          }
        },
        {
          name: {
            number: 106,
            text: '제2의학관'
          }
        },
        {
          name: {
            number: 107,
            text: '학생회관'
          }
        },
        {
          name: {
            number: 201,
            text: '본관'
          }
        },
        {
          name: {
            number: 203,
            text: '서라벌호'
          }
        },
        {
          name: {
            number: 207,
            text: '봅스트홀'
          }
        },
        {
          name: {
            number: 208,
            text: '제2공학관'
          }
        },
        {
          name: {
            number: 209,
            text: '창업보육관'
          }
        },
        {
          name: {
            number: 301,
            text: '중앙문화예술관'
          }
        },
        {
          name: {
            number: 303,
            text: '법학관'
          }
        },
        {
          name: {
            number: 310,
            text: '100주년기념관'
          }
        }
      ]
    }
  }
}
</script>

<style lang="scss">
@import '../scss/global-variables.scss';
@import '../scss/global-mixins.scss';
@import '../scss/gradients.scss';

$width-threshold: 500px;

.building-container {
  display: grid;
  grid-gap: 3rem 2.5rem;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  padding-top: 20px;
  width: calc(100% - 6rem);
  max-width: 80rem;
  margin: auto;
  padding-bottom: 10rem;

  @include smaller-than($width-threshold) {
    grid-gap: 0.5rem;
    width: 100%;
  }

  .building {
    position: relative;
    background-color: transparent;
    border-radius: 0.6rem;
    overflow: hidden;
    opacity: 0;
    transform: translateY(100px);
    will-change: transform, opacity;
    box-shadow: 0 5px 10px rgba(0,0,0,0.2);

    @include smaller-than($width-threshold) {
      border-radius: 0;
      box-shadow: none;
    }

    &.appear {
      opacity: 1;
      transform: translateY(0);
      transition: all 1000ms $eodiro-cb;
      // pointer-events: none;

      &.done {
        transition: $smooth-transition;
        pointer-events: all;
      }
    }

    &:active {
      transform: scale(0.95);
      box-shadow: none;

      @include smaller-than($width-threshold) {
        transform: none;
      }
    }

    &::before {
      content: '';
      display: block;
      padding-top: 60%;
    }

    @include smaller-than(500px) {
      &::before {
        padding-top: 35%;
      }
    }

    .building-name {
      display: flex;
      align-items: flex-start;
      justify-content: flex-end;
      text-shadow: 0 3px 15px rgba(0,0,0,0.15);
      position: absolute;
      text-align: right;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      padding: 1rem;
      max-height: 100%;
      color: $base-white;
      font-weight: 700;
      font-size: 1.5rem;
      transition: background-color 300ms ease;

      .name--number, .name--text {
        display: block;
      }

      .name--number {
        font-size: 3rem;
        line-height: 1;
        font-family: $font-display;
      }

      .name--text {
        font-size: 1.2rem;
        font-weight: 500;
        line-height: 1.2;
        margin-top: 0.1rem;
      }

      @include smaller-than($width-threshold) {
        align-items: center;
        justify-content: center;
        text-align: center;

        .name--number {
          font-size: 2.5rem;
          line-height: 1;
          font-family: $font-display;
        }
        
        .name--text {
          font-size: 1rem;
          font-weight: 500;
          line-height: 1.2;
          margin-top: 0.1rem;
        }
      }
    }
  }
}
</style>
