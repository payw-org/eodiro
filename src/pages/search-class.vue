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
        <div v-if="!filterIsFold" class="filter-container">
          <div v-for="item in filterCategory" :key="item.title" class="filter-category-item" @click="item.isFold = !item.isFold">
            {{ item.title }}
          </div>
        </div>
      </transition>
      <transition name="filter-fold">
        <div v-if="!getSelectedFilterItem.isFold" class="filter-category-item-detail">
          aaa
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
      filterCategory: [
        { title: this.$t('searchClass.filterTitleYear'), isFold: true },
        { title: this.$t('searchClass.filterTitleSemester'), isFold: true },
        { title: this.$t('searchClass.filterTitleProcess'), isFold: true },
        { title: this.$t('searchClass.filterTitleCampus'), isFold: true },
        { title: this.$t('searchClass.filterTitleCollege'), isFold: true },
        { title: this.$t('searchClass.filterTitleMajor'), isFold: true }
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
    getSelectedFilterItem () {
      const nothingSelected = {
        title: '',
        isFold: true
      }

      for (let i = 0; i < this.filterCategory.length; i++) {
        if (this.filterCategory[i].isFold === false) {
          return this.filterCategory[i]
        }
      }
      return nothingSelected
    }
  },
  mounted () {},
  methods: {}
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

  .filter-container {
    position: fixed;
    top: $banner-height;
    z-index: 1592653;

    width: 33%;
    max-width: $master-content-max-width/3;
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

    .filter-category-item {
      padding: space(4) 0;
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
