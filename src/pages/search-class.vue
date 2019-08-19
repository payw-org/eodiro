<template>
  <div id="search-class">
    <div class="page-content">
      <!-- form-section -->
      <div class="form-wrapper">
        <Button class="filter-button" @click="filterIsFold = !filterIsFold">
          {{ filterButtonMsg }}
        </Button>
        <div class="search-bar-wrapper">
          <Input v-model="searchClassQuary" class="search-input" :placeholder="initInputText" />
          <button class="search-button" />
        </div>
      </div>
      <!-- filter section -->
      <div v-if="!filterIsFold" class="background" @click="filterIsFold = !filterIsFold" />
      <transition name="filter-fold">
        <div v-if="!filterIsFold" class="filter-category-container">
          <div class="fc-category-main">
            <div v-for="item in mainCategory" :key="item.name" class="fc-item" @click="clickMainCategoryItem(item)">
              {{ item.name }}
            </div>
          </div>
          <transition name="filter-fold">
            <div v-if="!unfoldCategory.subCategory" class="fc-category-sub">
              <div v-for="name in unfoldCategory" :key="name" class="fc-item">
                {{ name }}
              </div>
            </div>
          </transition>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import pageBase from '~/mixins/page-base'
import { Input, Button } from '~/components/ui'

export default {
  name: 'search-class',
  components: { Input, Button },
  mixins: [pageBase],
  meta: {
    depth: 1,
    hamletName: 'searchClass'
  },
  head () {
    return {
      title: this.$t('searchClass.title'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('searchClass.head.description')
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.$t('global.head.title')
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.$t('global.head.description')
        }
      ]
    }
  },
  data () {
    return {
      searchClassQuary: '',
      initInputText: this.$t('searchClass.initInputText'),
      filterButtonMsg: this.$t('searchClass.filterButtonMsg'),
      searchButtonMsg: this.$t('searchClass.searchButtonMsg'),
      filterIsFold: true,
      mainCategory: [
        {
          name: this.$t('searchClass.filterTitleYear'),
          isFold: true,
          subCategory: [
            '2019',
            '2018',
            '2017',
            '2016',
            '2015',
            '2014',
            '2013',
            '2012',
            '2011',
            '2010',
            '2009',
            '2008'
          ]
        },
        {
          name: this.$t('searchClass.filterTitleSemester'),
          isFold: true,
          subCategory: ['1학기', '여름방학', '2학기', '겨울방학']
        },
        {
          name: this.$t('searchClass.filterTitleProcess'),
          isFold: true,
          subCategory: ['학부', '대학원']
        },
        {
          name: this.$t('searchClass.filterTitleCampus'),
          isFold: true,
          subCategory: ['서울캠퍼스', '안성캠퍼스']
        },
        {
          name: this.$t('searchClass.filterTitleCollege'),
          isFold: true,
          subCategory: [
            '교양',
            '연계전공',
            '융합전공',
            '인문대학(2011)',
            '사회과학대학(2011)',
            '사범대학(2011)',
            '자연과학대학(2011)',
            '공과대학(2011)',
            '창의ICT공과대학'
          ]
        },
        {
          name: this.$t('searchClass.filterTitleMajor'),
          isFold: true,
          subCategory: ['aa', 'bb']
        }
      ],
      courseExample: {
        name: '운영체제 (영어A 강의)',
        instructor: '김성조',
        locations: [
          {
            gwan: '310',
            ho: '727'
          }
        ],
        times: [
          {
            day: 2,
            start: '11:00',
            end: '13:00'
          },
          {
            day: 4,
            start: '11:00',
            end: '12:00'
          }
        ]
      }
    }
  },
  computed: {
    unfoldCategory () {
      const nothingSelected = {
        name: '',
        isFold: true,
        subCategory: ['XX', 'YY']
      }

      for (let i = 0; i < this.mainCategory.length; i++) {
        if (this.mainCategory[i].isFold === false) {
          return this.mainCategory[i].subCategory
        }
      }
      return nothingSelected
    }
  },
  mounted () {},
  methods: {
    clickMainCategoryItem (item) {
      item.isFold = !item.isFold
      for (let i = 0; i < this.mainCategory.length; i++) {
        if (
          this.mainCategory[i].isFold === false &&
          this.mainCategory[i] !== item
        ) {
          this.mainCategory[i].isFold = true
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/main.scss';

#search-class {
  .form-wrapper {
    display: flex;

    .filter-button {
      margin-right: 1rem;
      padding: 0 1.3rem !important;
    }
    .search-bar-wrapper {
      position: relative;
      flex-grow: 1;
      .search-input {
        padding-right: 2.5rem;
      }
      .search-button {
        position: absolute;
        top: 0;
        right: 0;
        height: 3rem;
        width: 3rem;

        @include bgImg('~assets/images/magnifier-black.svg', 'center', '80%');

        @include dark-mode {
          @include bgImg('~assets/images/magnifier-white.svg');
        }
      }
    }
  }

  .background {
    position: fixed;
    z-index: 159265;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .filter-category-container {
    position: fixed;
    z-index: 1592653;
    top: $banner-height;
    height: calc(100vh - #{$banner-height} - 2rem);

    border-radius: $border-radius;
    margin: space(4) 0;

    font-size: body(5);
    background-color: #fff;
    box-shadow: 0 0.2rem 0.7rem rgba(#000, 0.2);

    @include smaller-than($width-step--1) {
      left: 0;
      height: calc(100vh - #{$banner-height});
      margin: 0;
      border-radius: 0 !important;
    }
    @include larger-than($width-step--2) {
    }

    .fc-category-main,
    .fc-category-sub {
      float: left;
      display: block;

      height: 100%;
      overflow: auto;
      // max-width: $master-content-max-width/3;
      // height: calc(100vh - #{$banner-height} - 2rem);
    }

    .fc-item {
      width: 20vw;
      height: 4rem;
      line-height: 4rem;
      // max-width: $master-content-max-width/3;
      margin: 0 space(4);
      text-align: center;
      border-top: solid;
      @include separator;

      &:first-child {
        border-top: none;
      }
    }
  }
}

.filter-fold-enter-active,
.filter-fold-leave-active {
  transition: opacity 0.3s;
}
.filter-fold-enter,
.filter-fold-leave-to {
  opacity: 0;
}
</style>
