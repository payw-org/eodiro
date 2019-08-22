<template>
  <div id="search-class">
    <div class="page-content" @scroll.native="handleScroll">
      <!-- form-section -->
      <div class="form-wrapper">
        <Button class="filter-button" @click="filterIsFold = !filterIsFold">
          {{ $t('searchClass.filterButtonMsg') }}
        </Button>
        <div class="search-bar-wrapper">
          <Input v-model="searchClassQuary" class="search-input" :placeholder="$t('searchClass.initInputText')" />
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
            <div v-if="mainCategoryIsUnfold" class="fc-category-sub">
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
            <div v-for="timeBlock in item.timeTable" :key="item.extInfo + timeBlock" class="src-item-timeTable">
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
      </div>
    </div>
  </div>
</template>

<script>
import pageBase from '~/mixins/page-base'
import { Input, Button, Accordion } from '~/components/ui'
import classList from '~/assets/data/class-list'
import filterCategoryItem from '~/assets/data/filter-category-item'

export default {
  name: 'search-class',
  components: { Input, Button, Accordion },
  mixins: [pageBase],
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
      filterIsFold: true,
      mainCategory: [
        {
          name: this.$t('searchClass.filterTitleYear'),
          isFold: true,
          details: '',
          subCategory: filterCategoryItem.year
        },
        {
          name: this.$t('searchClass.filterTitleSemester'),
          isFold: true,
          details: '',
          subCategory: filterCategoryItem.semester
        },
        {
          name: this.$t('searchClass.filterTitleProcess'),
          isFold: true,
          details: '',
          subCategory: filterCategoryItem.process
        },
        {
          name: this.$t('searchClass.filterTitleCampus'),
          isFold: true,
          details: '',
          subCategory: filterCategoryItem.campus
        },
        {
          name: this.$t('searchClass.filterTitleCollege'),
          isFold: true,
          details: '',
          subCategory: filterCategoryItem.college
        },
        {
          name: this.$t('searchClass.filterTitleMajor'),
          isFold: true,
          details: '',
          subCategory: filterCategoryItem.major
        }
      ],
      courseExample: classList
    }
  },
  computed: {
    mainCategoryIsUnfold () {
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
  mounted () {
    setInterval(() => {
      this.handleScroll()
    }, 0)
  },
  methods: {
    handleScroll () {
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
    @include dark-mode {
      background-color: #000;
      box-shadow: 0 0.2rem 0.7rem rgba(#000, 0.2);
    }

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
        font-weight: weight(5);
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
