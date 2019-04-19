<template>
  <div class="content-item select-building" @scroll="$emit('update-nav-view')">
    <div class="building-container">
      <router-link v-for="(building, index) in buildings" :key="index" :to="'/buildings/' + building.name.number">
        <div class="building">
          <img :src="building.imgLink" alt="" class="building-image">
          <div class="building-name">
            <span class="name--number">{{ building.name.number }}</span>
            <span class="name--text">{{ building.name.text }}</span>
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
          },
          imgLink: '/assets/images/buildings/101.png'
        },
        {
          name: {
            number: 102,
            text: '약학대학 및 R&D센터'
          },
          imgLink: '/assets/images/buildings/102.png'
        },
        {
          name: {
            number: 103,
            text: '파이퍼홀'
          },
          imgLink: '/assets/images/buildings/103.png'
        },
        {
          name: {
            number: 105,
            text: '제1의학관'
          },
          imgLink: '/assets/images/buildings/105.png'
        },
        {
          name: {
            number: 106,
            text: '제2의학관'
          },
          imgLink: '/assets/images/buildings/106.png'
        },
        {
          name: {
            number: 107,
            text: '학생회관'
          },
          imgLink: '/assets/images/buildings/107.png'
        },
        {
          name: {
            number: 201,
            text: '본관'
          },
          imgLink: '/assets/images/buildings/201.png'
        },
        {
          name: {
            number: 203,
            text: '서라벌호'
          },
          imgLink: '/assets/images/buildings/203.png'
        },
        {
          name: {
            number: 207,
            text: '봅스트홀'
          },
          imgLink: '/assets/images/buildings/207.png'
        },
        {
          name: {
            number: 208,
            text: '제2공학관'
          },
          imgLink: '/assets/images/buildings/208.png'
        },
        {
          name: {
            number: 209,
            text: '창업보육관'
          },
          imgLink: '/assets/images/buildings/209.png'
        },
        {
          name: {
            number: 310,
            text: '100주년기념관'
          },
          imgLink: '/assets/images/buildings/310.png'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
@import '../scss/global-variables.scss';
@import '../scss/global-mixins.scss';

.building-container {
  display: grid;
  grid-gap: 3rem 2.5rem;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  padding-top: 20px;
  max-width: 80rem;
  margin: auto;

  @include smaller-than(500px) {
    grid-gap: 1.5rem;
  }

  .building {
    position: relative;
    background-color: transparent;
    border-radius: 0.6rem;
    overflow: hidden;
    opacity: 0;
    transform: translateY(100px);
    will-change: transform, opacity;

    &.appear {
      opacity: 1;
      transform: translateY(0);
      transition: all 1000ms $eodiro-cb;
      pointer-events: none;

      &.done {
        transition: $smooth-transition;
        pointer-events: all;
      }
    }

    &:hover {
      box-shadow: 0 0 0 5px $light-blue, 0 20px 20px rgba(0,0,0,0.2);

      html.dark-mode & {
        box-shadow: 0 0 0 5px $light-yellow, 0 20px 20px rgba(0,0,0,0.3);
      }

      .building-image {
        filter: blur(20px);
      }
    }

    &:active {
      transform: scale(0.95);
      box-shadow: none;
    }

    &::before {
      content: '';
      display: block;
      padding-top: 60%;
    }

    @include smaller-than(500px) {
      &::before {
        padding-top: 45%;
      }
    }

    .building-image {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: blur(0);
      transition: filter 300ms ease;
    }

    .building-name {
      position: absolute;
      text-align: right;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      padding: 1rem;
      max-height: 100%;
      // background-image: linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0));
      background-color: rgba(#000, 0.3);
      color: #fff;
      font-weight: 700;
      font-size: 1.5rem;

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
    }
  }
}
</style>
