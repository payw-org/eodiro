<template>
  <div class="content-item university-search">
    <div class="search-area">
      <div class="query-input-wrapper">
        <input v-model="search" @click="clickInput" @keydown="clickInput" class="input" type="text" placeholder="학교 이름으로 검색" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
      </div>
      <div class="university-list">
        <div
          v-for="(u, i) in filteredList"
          :key="i"
          @click="selectUniversity(u.vendor)"
          class="university-item"
        >{{ u.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Content from 'Components/Content.vue'

export default {
  name: 'university',
  extends: Content,
  activated() {
    this.universityList.sort()
  },
  data() {
    return {
      search: '',
      universityList: [
        {
          name: '중앙대학교',
          vendor: 'cau'
        },
        {
          name: '서울대학교',
          vendor: 'snu'
        },
        {
          name: '고려대학교',
          vendor: 'korea'
        },
        {
          name: '연세대학교',
          vendor: 'yonsei'
        },
        {
          name: '서강대학교',
          vendor: 'sogang'
        },
        {
          name: '한양대학교',
          vendor: 'hanyang'
        },
        {
          name: '경희대학교',
          vendor: 'khu'
        },
        {
          name: '외국어대학교',
          vendor: 'hufs'
        },
        {
          name: '서울시립대학교',
          vendor: 'uos'
        }
      ]
    }
  },
  computed: {
    filteredList() {
      return this.universityList.filter(u => {
        return u.name.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  methods: {
    clickInput() {
      this.$emit('forceHideNav')
      window.scrollTo(0, parseFloat(window.getComputedStyle(this.$el, null).getPropertyValue('padding-top')))
    },
    selectUniversity(vendor) {
      // redirect to vendor url
      this.$router.push('/' + vendor)
    }
  }
}
</script>

<style lang="scss">
@import 'SCSS/global-variables.scss';
@import 'SCSS/global-mixins.scss';

.university-search {
  // padding-bottom: 0 !important;

  .search-area {
    min-height: calc(100vh - 10rem);

    .query-input-wrapper {
      width: 100%;
      margin-bottom: 2rem;
      background-color: $base-white;
      position: sticky;
      top: 0;
      border-bottom: 1px solid #f4f4f4;

      @include dark-mode() {
        background-color: $base-black;
        border-bottom: 1px solid #000;
      }

      .input {
        background-color: transparent;
        border: none;
        padding: 1rem;
        font-size: 1.5rem;
        font-weight: 700;
        width: 100%;
        text-align: center;

        @include dark-mode() {
          color: $base-white;
        }
      }
    }

    .university-list {
      width: calc(100% - 2rem);
      max-width: 20rem;
      margin: auto;
      box-shadow: $eodiro-shadow;
      border-radius: 1rem;

      @include dark-mode {
        box-shadow: $eodiro-shadow--dark, $dark-mode-border-shadow;
        background-color: #333;
      }

      .university-item {
        border-bottom: 1px solid #f4f4f4;
        padding: 1rem;
        font-size: 1rem;
        text-align: center;
        background-color: $base-white;

        @include dark-mode() {
          background-color: transparent;
          border-bottom: 1px solid #000;
        }

        &, & * {
          cursor: pointer;
        }

        &:first-child {
          border-radius: 1rem 1rem 0 0;
        }
        &:last-child {
          border-radius: 0 0 1rem 1rem;
          border-bottom: none;
        }
      }
    }
  }
}
</style>
