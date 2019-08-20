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
              <span class="fc-item-details">
                {{ item.details }}
              </span>
              <span class="fc-item-name">
                {{ item.name }}
              </span>
            </div>
          </div>
          <transition name="filter-fold">
            <div v-if="categoryIsUnfold" class="fc-category-sub">
              <div v-for="name in unfoldCategory" :key="name" class="fc-item" @click="clickSubCategoryItem(name)">
                {{ name }}
              </div>
            </div>
          </transition>
        </div>
      </transition>
      <!-- search result section -->
      <div class="search-result-container">
        <Accordion v-for="item in courseExample" :key="item.classId" class="search-result-item">
          <template v-slot:face>
            <div class="src-item-title">
              {{ item.name }}
            </div>
            <div class="src-item-instructor">
              {{ item.instructor }}
            </div>
            <div class="src-item-timeTable">
              {{ item.timeTable }}
            </div>
            <div class="src-item-timeTable">
              {{ item.timeTable }}
            </div>
          </template>
          <template v-slot:content>
            <div>
              {{ item.note }}
            </div>
          </template>
        </Accordion>
      </div>
    </div>
  </div>
</template>

<script>
import pageBase from '~/mixins/page-base'
import { Input, Button, Accordion } from '~/components/ui'

export default {
  name: 'search-class',
  components: { Input, Button, Accordion },
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
          details: '',
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
          details: '',
          subCategory: ['1학기', '여름방학', '2학기', '겨울방학']
        },
        {
          name: this.$t('searchClass.filterTitleProcess'),
          isFold: true,
          details: '',
          subCategory: ['학부', '대학원']
        },
        {
          name: this.$t('searchClass.filterTitleCampus'),
          isFold: true,
          details: '',
          subCategory: ['서울캠퍼스', '안성캠퍼스']
        },
        {
          name: this.$t('searchClass.filterTitleCollege'),
          isFold: true,
          details: '',
          subCategory: [
            '교양',
            '연계전공',
            '융합전공',
            '인문대학(2011)',
            '사회과학대학(2011)',
            '사범대학(2011)',
            '자연과학대학(2011)',
            '공과대학(2011)',
            '창의ICT공과대학',
            '소프트웨어대학',
            '경영경제대학(2011)',
            '약학대학(2011)',
            '적십자간호대학(2011)',
            '적십자간호대학',
            '교양학부대학',
            '다빈치교양대학',
            '예술대학(2011)',
            '의과대학(2011)',
            '문과대학',
            '자연과학대학',
            '공과대학',
            '사범대학',
            '법과대학',
            '정경대학',
            '경영대학',
            '약학대학',
            '의과대학',
            '미디어공연영상대학',
            '자유전공학부',
            '공공인재학부',
            '글로벌지식학부',
            '교양학부대학(2011)'
          ]
        },
        {
          name: this.$t('searchClass.filterTitleMajor'),
          isFold: true,
          details: '',
          subCategory: ['aa', 'bb']
        }
      ],
      courseExample: [
        {
          classId: '49872-02',
          name: '휴먼인터페이스 컴퓨터게임설계 (영어A강의)',
          instructor: '이창하',
          college: '소프트웨어대학',
          subject: '소프트웨어학부',
          grade: '4',
          course: '학사',
          type: '전공',
          unit: '3',
          term: '3',
          closed: '',
          flexible: '',
          note: '공학주제',
          timeTable: '207관 102호 월 14:00~15:00 / 207관 102호 수 13:00~15:00'
        },
        {
          classId: '49872-01',
          name: '휴먼인터페이스 컴퓨터게임설계 (영어A강의)',
          instructor: '이창하',
          timeTable: '207관 102호 월 14:00~15:00 / 207관 102호 수 13:00~15:00'
        },
        {
          classId: '49872-03',
          name: '휴먼인터페이스 컴퓨터게임설계 (영어A강의)',
          instructor: '이창하',
          timeTable: '207관 102호 월 14:00~15:00 / 207관 102호 수 13:00~15:00'
        },
        {
          classId: '49872-04',
          name: '휴먼인터페이스 컴퓨터게임설계 (영어A강의)',
          instructor: '이창하',
          timeTable: '207관 102호 월 14:00~15:00 / 207관 102호 수 13:00~15:00'
        },
        {
          classId: '49872-05',
          name: '휴먼인터페이스 컴퓨터게임설계 (영어A강의)',
          instructor: '이창하',
          timeTable: '207관 102호 월 14:00~15:00 / 207관 102호 수 13:00~15:00'
        },
        {
          classId: '49872-06',
          name: '휴먼인터페이스 컴퓨터게임설계 (영어A강의)',
          instructor: '이창하',
          timeTable: '207관 102호 월 14:00~15:00 / 207관 102호 수 13:00~15:00'
        },
        {
          classId: '49872-07',
          name: '휴먼인터페이스 컴퓨터게임설계 (영어A강의)',
          instructor: '이창하',
          timeTable: '207관 102호 월 14:00~15:00 / 207관 102호 수 13:00~15:00'
        },
        {
          classId: '49872-08',
          name: '휴먼인터페이스 컴퓨터게임설계 (영어A강의)',
          instructor: '이창하',
          timeTable: '207관 102호 월 14:00~15:00 / 207관 102호 수 13:00~15:00'
        }
      ]
    }
  },
  computed: {
    categoryIsUnfold () {
      for (let i = 0; i < this.mainCategory.length; i++) {
        if (this.mainCategory[i].isFold === false) {
          return true
        }
      }
      return false
    },
    unfoldCategory () {
      const nothingUnfold = {
        isFold: true
      }
      for (let i = 0; i < this.mainCategory.length; i++) {
        if (this.mainCategory[i].isFold === false) {
          return this.mainCategory[i].subCategory
        }
      }
      return nothingUnfold
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
    },
    clickSubCategoryItem (name) {
      for (let i = 0; i < this.mainCategory.length; i++) {
        if (this.mainCategory[i].isFold === false) {
          this.mainCategory[i].isFold = true
          if (this.mainCategory[i].details === name) {
            this.mainCategory[i].details = ''
          } else {
            this.mainCategory[i].details = name
          }
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
      font-size: body(2);
    }
    @include larger-than($width-step--2) {
    }

    .fc-category-main,
    .fc-category-sub {
      float: left;
      display: block;

      height: 100%;
      margin-left: 1.5rem;
      overflow: auto;
      // max-width: $master-content-max-width/3;
      // height: calc(100vh - #{$banner-height} - 2rem);

      &:last-child {
        margin-right: 1.5rem;
      }
    }
    .fc-item {
      width: 35vw;
      min-height: 4rem;
      max-width: $master-content-max-width/3;
      padding: space(2) 0;
      text-align: right;
      border-top: solid;
      @include separator;

      &:first-child {
        border-top: none;
      }
      display: flex;
      align-items: center;
      justify-content: flex-end;
      word-break: break-all;
      .fc-item-details {
      }
      .fc-item-name {
        padding: 0 space(3);
      }
    }
  }

  .search-result-container {
    .search-result-item {
      margin: 1rem 0;
      > div:nth-child(1) {
        padding: 0.5rem 0;
      }
      .src-item-title {
        font-size: body(6);
        font-weight: bold;
      }
      .src-item-instructor {
        font-size: body(2);
      }
      .src-item-timeTable {
        font-size: body(1);
        color: $base-gray;
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
