<template>
  <div id="search-class">
    <div class="page-content" @scroll.native="handleScroll">
      <!-- form-section -->
      <div class="form-wrapper">
        <div class="search-bar-wrapper">
          <Input
            v-model="searchClassQuary"
            class="search-input"
            :placeholder="initInputText"
          />
          <button class="search-button" />
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
        <div v-if="!filterIsFold" class="filter-category-container">
          <transition name="filter-fold">
            <!-- sub category -->
            <div v-if="mainCategoryIsUnfold" class="fc-category-sub">
              <div class="fc-item" @click="clickSubCategoryItem('')">
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
                {{ selectedSubCategory[item.value] }}
              </span>
              <span class="fc-item-name">
                {{ item.name }}
              </span>
            </div>
          </div>
        </div>
      </transition>
      <!-- search result section -->
      <div class="search-result-container">
        <Accordion
          v-for="item in courseExample"
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
import pageBase from '~/mixins/page-base'
import { Input, Button, Accordion } from '~/components/ui'
import classListOrigin from '~/assets/data/class-list'
import filterCategoryItemOrigin from '~/assets/data/filter-category-item.json'

export default {
  name: 'search-class',
  components: { Input, Button, Accordion },
  mixins: [pageBase],
  head() {
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
  data() {
    return {
      observer: null,
      sentinel: null,
      searchClassQuary: '',
      filterIsFold: true,
      selectedSubCategory: {
        year: '',
        semester: '',
        campus: '',
        process: '',
        college: '',
        major: ''
      },
      mainCategory: [
        {
          name: this.$t('searchClass.filterTitleYear'),
          isFold: true,
          value: 'year'
        },
        {
          name: this.$t('searchClass.filterTitleSemester'),
          isFold: true,
          value: 'semester'
        },
        {
          name: this.$t('searchClass.filterTitleCampus'),
          isFold: true,
          value: 'campus'
        },
        {
          name: this.$t('searchClass.filterTitleProcess'),
          isFold: true,
          value: 'process'
        },
        {
          name: this.$t('searchClass.filterTitleCollege'),
          isFold: true,
          value: 'college'
        },
        {
          name: this.$t('searchClass.filterTitleMajor'),
          isFold: true,
          value: 'major'
        }
      ],
      searchPage: 1,
      searchClassListAll: classListOrigin
    }
  },
  computed: {
    searchClassList() {
      const numOfItemInPage = 4
      return this.searchClassListAll.slice(0, numOfItemInPage * this.searchPage)
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
        isFold: true
      }
      for (let i = 0; i < this.mainCategory.length; i++) {
        if (this.mainCategory[i].isFold === false) {
          return this.filterCategoryItem[this.mainCategory[i].value]
        }
      }
      return nothingUnfold
    },
    filterCategoryItem() {
      const origin = filterCategoryItemOrigin
      const selected = this.selectedSubCategory
      const refined = {}

      // list all
      refined.year = origin.year
      refined.semester = origin.semester
      refined.campus = []
      refined.process = []
      refined.college = []
      refined.major = []
      for (let i = 0; i < origin.campus.length; i++) {
        if (!refined.campus.includes(origin.campus[i].value)) {
          refined.campus.push(origin.campus[i].value)
        }
        for (let ii = 0; ii < origin.campus[i].process.length; ii++) {
          if (
            (selected.campus === '' ||
              (selected.campus !== '' &&
                selected.campus === origin.campus[i].value)) &&
            !refined.process.includes(origin.campus[i].process[ii].value)
          ) {
            refined.process.push(origin.campus[i].process[ii].value)
          }
          for (
            let iii = 0;
            iii < origin.campus[i].process[ii].college.length;
            iii++
          ) {
            if (
              (selected.process === '' ||
                (selected.process !== '' &&
                  selected.process === origin.campus[i].process[ii].value)) &&
              !refined.college.includes(
                origin.campus[i].process[ii].college[iii].value
              )
            ) {
              refined.college.push(
                origin.campus[i].process[ii].college[iii].value
              )
            }
            for (
              let iiii = 0;
              iiii < origin.campus[i].process[ii].college[iii].major.length;
              iiii++
            ) {
              if (
                (selected.college === '' ||
                  (selected.college !== '' &&
                    selected.college ===
                      origin.campus[i].process[ii].college[iii].value)) &&
                !refined.major.includes(
                  origin.campus[i].process[ii].college[iii].major[iiii].value
                )
              ) {
                refined.major.push(
                  origin.campus[i].process[ii].college[iii].major[iiii].value
                )
              }
            }
          }
        }
      }

      // sort
      refined.college.sort()
      refined.major.sort()

      return refined
    }
  },
  watch: {
    selectedSubCategory(newSelectedSub) {
      let list = JSON.parse(JSON.stringify(classListOrigin))
      // filter
      list = list.filter((item) => {
        if (
          item.subInfo.match(newSelectedSub.college) !== null &&
          item.subInfo.match(newSelectedSub.major) !== null
        ) {
          return true
        }
      })

      // sort
      list.sort()

      this.searchClassListAll = list
      this.searchPage = 1
    },
    searchClassQuary() {
      this.searchPage = 1
    }
  },
  mounted() {
    setInterval(() => {
      this.handleScroll()
    }, 0)

    // Sentinel for banner
    this.sentinel = document.querySelector('#infinity-scroll-observer-sentinel')
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target.isSameNode(this.sentinel)) {
          this.searchPage += 1
        }
      })
    })

    // Start observing
    this.observer.observe(this.sentinel)
  },
  methods: {
    handleScroll() {
      const eodiroBannerHeight = document.querySelector('#eodiro-banner')
        .offsetHeight
      const heightDifference = parseInt(
        window
          .getComputedStyle(document.querySelector('#eodiro-banner'))
          .transform.match(/\d+/g)[5],
        10
      )
      const filterCategoryContainer = document.querySelector(
        '.filter-category-container'
      )
      if (filterCategoryContainer == null) {
        return
      }
      filterCategoryContainer.style.height = `calc(100vh - ${eodiroBannerHeight}px - 2rem + ${heightDifference}px)`
      filterCategoryContainer.style.top = `calc(${eodiroBannerHeight}px - ${heightDifference}px)`
      if (window.innerWidth < 700) {
        filterCategoryContainer.style.height = `calc(100vh - ${eodiroBannerHeight}px - 2rem + ${heightDifference}px + 2rem)`
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
      const selectedSub = JSON.parse(JSON.stringify(this.selectedSubCategory))

      for (let i = 0; i < main.length; i++) {
        if (main[i].isFold === false) {
          main[i].isFold = true
          if (selectedSub[main[i].value] === name) {
            selectedSub[main[i].value] = ''
          } else {
            selectedSub[main[i].value] = name
          }
        }
      }
      this.selectedSubCategory = selectedSub
      this.mainCategory = main
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
      margin-left: 1rem;
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

  .filter-category-container {
    position: fixed;
    z-index: 1592653;
    top: $banner-height;
    height: calc(100vh - #{$banner-height} - 2rem);
    right: calc((100vw - #{$master-content-max-width}) / 2);
    @media (max-width: 60rem) {
      right: space(5);
    }

    border-radius: $border-radius;
    margin: space(4) 0;

    font-size: body(5);
    background-color: #fff;
    box-shadow: 0 0.2rem 0.7rem rgba(#000, 0.2);
    @include dark-mode {
      background-color: #000;
      box-shadow: 0 0.2rem 0.7rem rgba(#fff, 0.2);
    }

    @include smaller-than($width-step--1) {
      right: 0;
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
      cursor: pointer;
      border-top: solid;
      @include separator;

      &:first-child {
        border-top: none;
      }
      display: flex;
      align-items: center;
      justify-content: flex-end;
      word-break: break-all;
      // .fc-item-details {
      // }
      .fc-item-name {
        padding: 0 space(3);
      }
    }
  }

  .search-result-container {
    .search-result-item {
      margin: 1rem 0;
      .src-item-title {
        font-size: body(6);
        font-weight: fw(5);
      }
      .src-item-instructor {
        font-size: body(2);
      }
      .src-item-timeTable {
        font-size: body(1);
      }
      .src-item-subInfo {
        font-size: body(1);
        color: $base-gray;
      }
      .src-item-extInfo {
        font-size: body(1);
      }
      .src-item-note {
        font-size: body(1);
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
