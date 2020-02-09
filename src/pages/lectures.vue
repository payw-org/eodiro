<template>
  <div id="eodiro-lectures">
    <div class="page-content">
      <!-- form-section -->
      <div class="form-wrapper">
        <div class="search-bar-wrapper">
          <button class="search-button" />
          <input
            v-model="searchClassState.search.word"
            class="search-input"
            :placeholder="$t('searchClass.initInputText')"
            type="search"
            autocomplete="off"
            aria-autocomplete="both"
            aria-haspopup="false"
            autocapitalize="off"
            autocorrect="off"
          />
        </div>
        <Button class="filter-button" @click="filterIsFold = !filterIsFold">
          {{ $t('searchClass.filterButtonMsg') }}
        </Button>
      </div>
      <!-- filter section -->
      <div
        v-if="!filterIsFold"
        class="background"
        @click="filterIsFold = !filterIsFold"
      />
      <transition name="filter-fold">
        <div class="filter-category-wrapper">
          <div v-if="!filterIsFold" class="filter-category-container">
            <transition name="filter-fold">
              <!-- sub category -->
              <div v-if="mainCategoryIsUnfold" class="fc-category-sub">
                <div
                  v-if="noFilterIsPossible"
                  class="fc-item"
                  @click="clickSubCategoryItem('')"
                >
                  전체
                </div>
                <div
                  v-for="name in unfoldCategory"
                  :key="name"
                  class="fc-item"
                  @click="clickSubCategoryItem(name)"
                >
                  {{ name }}
                </div>
              </div>
            </transition>
            <!-- main category -->
            <div class="fc-category-main">
              <div
                v-for="item in mainCategory"
                :key="item.name"
                class="fc-item"
                @click="clickMainCategoryItem(item)"
              >
                <span class="fc-item-details">
                  {{ searchClassState.filter[item.value] }}
                </span>
                <span class="fc-item-name">
                  {{ item.name }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <!-- search result section -->
      <div class="search-result-container">
        <Accordion
          v-for="item in searchClassList"
          :key="item.classId"
          class="search-result-item"
        >
          <template v-slot:face>
            <div class="src-item-title">
              {{ item.name }}
            </div>
            <div class="src-item-instructor">
              {{ item.instructor }}
            </div>
            <div
              v-for="timeBlock in item.timeTable"
              :key="item.extInfo + timeBlock"
              class="src-item-timeTable"
            >
              {{ timeBlock }}
            </div>
            <div class="src-item-subInfo">
              {{ item.subInfo }}
            </div>
          </template>
          <template v-slot:content>
            <div class="src-item-extInfo">
              {{ item.extInfo }}
            </div>
            <div class="src-item-note">
              {{ item.note }}
            </div>
          </template>
        </Accordion>
        <div id="infinity-scroll-observer-sentinel" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import pageBase from '~/mixins/page-base'
import { Button, Accordion } from '~/components/ui'
import autoHead from '~/modules/auto-head'

export default {
  name: 'lectures',
  components: { Button, Accordion },
  mixins: [pageBase],
  data() {
    return {
      apiURL: 'https://api.eodiro.com/v2/campuses/seoul/search-class',
      observer: null,
      sentinel: null,
      filterIsFold: true, //
      searchClassState: {
        filter: {
          isChange: true,
          year: '2019',
          semester: '2',
          campus: '서울',
          mainCourse: '학부',
        },
        search: {
          word: '',
          count: 50,
          page: 1,
        },
      },
      mainCategory: [
        {
          name: this.$t('searchClass.filterTitleYear'),
          isFold: true,
          value: 'year',
        },
        {
          name: this.$t('searchClass.filterTitleSemester'),
          isFold: true,
          value: 'semester',
        },
        {
          name: this.$t('searchClass.filterTitleCampus'),
          isFold: true,
          value: 'campus',
        },
        {
          name: this.$t('searchClass.filterTitleMainCourse'),
          isFold: true,
          value: 'mainCourse',
        },
        {
          name: this.$t('searchClass.filterTitleCollege'),
          isFold: true,
          value: 'college',
        },
        {
          name: this.$t('searchClass.filterTitleSubject'),
          isFold: true,
          value: 'subject',
        },
      ],
      searchClassList: [],
      subCategoryItemList: {
        year: '',
        semester: '',
        campus: '',
        mainCourse: '',
        college: '',
        subject: '',
      },
    }
  },
  computed: {
    noFilterIsPossible() {
      for (let i = 0; i < this.mainCategory.length; i++) {
        // some filter is unfold
        if (this.mainCategory[i].isFold === false) {
          // the filter is possible no filter
          if (
            ['year', 'semester', 'campus', 'mainCourse'].includes(
              this.mainCategory[i].value
            )
          ) {
            return false
          }
        }
      }
      return true
    },
    mainCategoryIsUnfold() {
      for (let i = 0; i < this.mainCategory.length; i++) {
        if (this.mainCategory[i].isFold === false) {
          return true
        }
      }
      return false
    },
    unfoldCategory() {
      const nothingUnfold = {
        isFold: true,
      }
      for (let i = 0; i < this.mainCategory.length; i++) {
        if (this.mainCategory[i].isFold === false) {
          return this.filterCategoryItem[this.mainCategory[i].value]
        }
      }
      return nothingUnfold
    },
    filterCategoryItem() {
      const origin = this.subCategoryItemList
      const refined = {}

      // list all
      refined.year = origin.year
      refined.semester = origin.semester
      refined.campus = origin.campus
      refined.mainCourse = origin.mainCourse
      refined.college = origin.college
      refined.subject = origin.subject

      // sort
      refined.college.sort()
      refined.subject.sort()

      return refined
    },
  },
  watch: {
    'searchClassState.search.word'() {
      const oneList = [
        'ㄱ',
        'ㄴ',
        'ㄷ',
        'ㄹ',
        'ㅁ',
        'ㅂ',
        'ㅅ',
        'ㅇ',
        'ㅈ',
        'ㅊ',
        'ㅋ',
        'ㅌ',
        'ㅍ',
        'ㅎ',
      ]
      for (let i = 0; i < oneList.length; i++) {
        if (this.searchClassState.search.word.includes(oneList[i]) === true) {
          return
        }
      }
      this.searchClassState.filter.isChange = false
      this.searchClassState.search.page = 0
      const axiosForm = {}
      axiosForm.url = this.apiURL
      axiosForm.method = 'patch'
      axiosForm.data = this.searchClassState
      axios(axiosForm).then((res) => {
        if (this.searchClassState.search.word === res.data.search.word) {
          this.searchClassList = this.refineSearchClassList(
            res.data.search.result
          )
        }
      })
    },
  },
  created() {
    this.basicDataRequest()
  },
  mounted() {
    setInterval(() => {
      this.handleScroll()
    }, 0)

    // Sentinel for banner
    this.sentinel = document.querySelector('#infinity-scroll-observer-sentinel')
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.isSameNode(this.sentinel)) {
            this.searchClassState.search.page += 1
            this.searchClassState.filter.isChange = false
            const axiosForm = {}
            axiosForm.method = 'patch'
            axiosForm.url = this.apiURL
            axiosForm.data = this.searchClassState
            axios(axiosForm).then((res) => {
              this.searchClassList.push(
                ...this.refineSearchClassList(res.data.search.result)
              )
            })
          }
        }
      })
    })

    // Start observing
    this.observer.observe(this.sentinel)
  },
  methods: {
    refineSearchClassList(newSCList) {
      const refinedSCList = []
      let refinedSC
      for (let i = 0; i < newSCList.length; i++) {
        refinedSC = {}
        refinedSC.name = newSCList[i].name
        refinedSC.instructor = newSCList[i].instructor
        refinedSC.timeTable = []
        refinedSC.subInfo = `${newSCList[i].college} ${newSCList[i].subject} ${newSCList[i].grade}학년 ${newSCList[i].type} ${newSCList[i].term}시간 ${newSCList[i].unit}학점`
        refinedSC.extInfo = `${newSCList[i].classId} ${newSCList[i].course}`
        refinedSC.note = `${newSCList[i].note}`
        for (let j = 0; j < newSCList[i].locations.length; j++) {
          if (newSCList[i].times[j].day === 0) newSCList[i].times[j].day = '일'
          if (newSCList[i].times[j].day === 1) newSCList[i].times[j].day = '월'
          if (newSCList[i].times[j].day === 2) newSCList[i].times[j].day = '화'
          if (newSCList[i].times[j].day === 3) newSCList[i].times[j].day = '수'
          if (newSCList[i].times[j].day === 4) newSCList[i].times[j].day = '목'
          if (newSCList[i].times[j].day === 5) newSCList[i].times[j].day = '금'
          if (newSCList[i].times[j].day === 6) newSCList[i].times[j].day = '토'
          newSCList[i].times[j].start = newSCList[i].times[j].start.replace(
            /^(\d\d)/,
            '$1:'
          )
          newSCList[i].times[j].end = newSCList[i].times[j].end.replace(
            /^(\d\d)/,
            '$1:'
          )
          refinedSC.timeTable.push(
            `${newSCList[i].locations[j].building}관 ${newSCList[i].locations[j].room}호 (${newSCList[i].times[j].day}) ${newSCList[i].times[j].start}~${newSCList[i].times[j].end}`
          )
        }
        refinedSCList.push(refinedSC)
      }
      return refinedSCList
    },
    basicDataRequest() {
      const params = {
        params: {
          count: 50,
        },
      }
      axios.get(this.apiURL, params).then((res) => {
        this.subCategoryItemList = res.data.filter.list
        this.searchClassState.filter = res.data.filter.value
        this.searchClassState.filter.isChange = false
        this.searchClassList = this.refineSearchClassList(
          res.data.search.result
        )
      })
    },
    handleScroll() {
      const filterCategoryContainer = document.querySelector(
        '.filter-category-container'
      )

      if (filterCategoryContainer == null) {
        return 0
      }
      const heightOfFilter = document
        .querySelector('.filter-category-container')
        .getBoundingClientRect().y
      filterCategoryContainer.style.height = `calc(100vh - ${heightOfFilter}px - 2rem)`
      // filterCategoryContainer.style.height = `calc(100vh - ${eodiroBannerHeight}px - 2rem + ${heightDifference}px)`
      // filterCategoryContainer.style.top = `calc(${eodiroBannerHeight}px - ${heightDifference}px)`
      if (window.innerWidth < 700) {
        filterCategoryContainer.style.height = `calc(100vh - ${heightOfFilter}px)`
      }
    },
    clickMainCategoryItem(item) {
      const main = JSON.parse(JSON.stringify(this.mainCategory))

      for (let i = 0; i < main.length; i++) {
        if (main[i].value === item.value) {
          main[i].isFold = !main[i].isFold
        } else if (main[i].isFold === false) {
          main[i].isFold = true
        }
      }

      this.mainCategory = main
    },
    clickSubCategoryItem(name) {
      const main = JSON.parse(JSON.stringify(this.mainCategory))
      const selectedSub = this.searchClassState.filter
      let i
      for (i = 0; i < main.length; i++) {
        if (main[i].isFold === false) {
          main[i].isFold = true

          if (
            selectedSub[main[i].value] === name &&
            this.noFilterIsPossible === true
          ) {
            // select same category
            this.searchClassState.filter.isChange = true
            this.searchClassState.filter[main[i].value] = ''
            this.searchClassState.search.page = 0
          } else {
            // select different category
            this.searchClassState.filter.isChange = true
            this.searchClassState.filter[main[i].value] = name
            this.searchClassState.search.page = 0
          }
          break
        }
      }

      const axiosForm = {}
      axiosForm.url = this.apiURL
      axiosForm.method = 'patch'
      axiosForm.data = this.searchClassState
      axios(axiosForm).then((res) => {
        this.subCategoryItemList = res.data.filter.list
        this.searchClassState.filter = res.data.filter.value
        this.searchClassState.filter.isChange = false
        this.searchClassList = res.data.search.result
      })

      this.mainCategory = main
    },
  },
  head() {
    return {
      title: this.$t('searchClass.title'),
      meta: [...autoHead(this.$t('searchClass.title'))],
    }
  },
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/main';

#eodiro-lectures {
  .form-wrapper {
    position: sticky;
    top: $nav-height;
    margin-top: calc(-#{s(3)});
    display: flex;
    padding: s(3) 0;
    @include bg;
    z-index: 5;

    .filter-button {
      margin-left: 1rem;
      padding: 0 1.3rem !important;
    }

    .search-bar-wrapper {
      position: relative;
      flex-grow: 1;

      .search-input {
        padding-left: 2.8rem;
        padding-right: 0.5rem;
      }

      .search-button {
        position: absolute;
        top: 0;
        left: 0;
        height: 3rem;
        width: 3rem;
        @include bgImg('~assets/images/magnifier-black.svg', 'center', '70%');

        @include dark-mode {
          @include bgImg('~assets/images/magnifier-white.svg', 'center', '70%');
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

  .filter-category-wrapper {
    position: absolute;
    top: calc(#{$banner-height} + #{s(3)});
    height: 100%;
    right: calc((100vw - #{$master-content-max-width}) / 2);

    @media (max-width: $master-content-max-width) {
      right: s(5);
    }

    @include smaller-than($width-step--1_) {
      right: 0;
      top: $banner-height;
    }

    .filter-category-container {
      position: sticky;
      z-index: 1592653;
      height: calc(100vh - #{$banner-height});

      top: calc(#{$nav-height} + #{s(3)});
      border-radius: $border-radius;
      padding: s(3) 0;

      font-size: b(5);
      background-color: #fff;
      box-shadow: 0 0.2rem 0.7rem rgba(#000, 0.2);
      @include dark-mode {
        background-color: #000;
        box-shadow: 0 0.2rem 0.7rem rgba(#000, 0.2);
      }

      @include smaller-than($width-step--1_) {
        top: $nav-height;
        margin: 0;
        border-radius: 0 !important;
        font-size: b(2);
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
        @include smaller-than($width-step--1_) {
          margin-left: 1rem;
        }

        &:last-child {
          margin-right: 1.5rem;
          @include smaller-than($width-step--1_) {
            margin-left: 1rem;
          }
        }
      }
      .fc-item {
        width: 35vw;
        min-height: 4rem;
        max-width: $master-content-max-width/3;
        padding: s(2) 0;
        text-align: right;
        cursor: pointer;
        border-top: solid;
        @include separator;

        &:first-child {
          border-top: none;
        }
        &:last-child {
          padding-bottom: 4rem;
        }

        display: flex;
        align-items: center;
        justify-content: flex-end;
        word-break: break-all;
        // .fc-item-details {
        // }
        .fc-item-name {
          padding: 0 s(3);
        }
      }
    }
  }

  .search-result-container {
    .search-result-item {
      margin: 1rem 0;
      .src-item-title {
        font-size: b(6);
        font-weight: fw(5);
      }
      .src-item-instructor {
        font-size: b(2);
      }
      .src-item-timeTable {
        font-size: b(1);
      }
      .src-item-subInfo {
        font-size: b(1);
        color: $base-gray;
      }
      .src-item-extInfo {
        font-size: b(1);
      }
      .src-item-note {
        font-size: b(1);
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
