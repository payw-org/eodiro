<i18n>
{
  "ko": {
    "search_placeholder": "학교 이름으로 검색"
  },
  "en": {
     "search_placeholder": "Search by School Name"
  },
  "zh": {
     "search_placeholder": "按學校名稱搜索"
  },
  "fr": {
     "search_placeholder": "Rechercher par nom d'école"
  }
}
</i18n>

<template>
  <div class="content-item university-search">
    <div class="search-area">
      <div class="query-input-wrapper">
        <input v-model="search" @click="clickInput(false)" @keydown="clickInput(true)" class="input" type="text" :placeholder="$t('search_placeholder')" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
      </div>
      <div class="university-list">
        <div
          v-for="(u, i) in filteredList"
          :key="i"
          @click="selectUniversity(u)"
          class="university-item"
        >{{ u.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Content from 'Components/Content.vue'
import axios from 'axios';

export default {
  name: 'university',
  extends: Content,
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
    clickInput(power = false) {
      this.$emit('toggleScrollEvent', false)

      if (power || this.$el.querySelector('.query-input-wrapper').getBoundingClientRect().top < 1) {
        window.scrollTo(0, parseFloat(window.getComputedStyle(this.$el, null).getPropertyValue('padding-top')))
      } else {
        const scrollBy = function (distance, duration) {
          var initialY = document.body.scrollTop;
          var y = initialY + distance;
          var baseY = (initialY + y) * 0.5;
          var difference = initialY - baseY;
          var startTime = performance.now();
        
          function step() {
              var normalizedTime = (performance.now() - startTime) / duration;
              if (normalizedTime > 1) normalizedTime = 1;
        
              window.scrollTo(0, baseY + difference * Math.cos(normalizedTime * Math.PI));
              if (normalizedTime < 1) window.requestAnimationFrame(step);
          }
          window.requestAnimationFrame(step);
        }
        
        scrollBy(parseFloat(window.getComputedStyle(this.$el, null).getPropertyValue('padding-top')), 300)
      }

      this.$emit('toggleScrollEvent', true)
    },
    selectUniversity(university) {
      window.localStorage.setItem('defaultUniversity', JSON.stringify(university))
      window.alert(`[ ${university.name} ] 기본 학교로 설정되었습니다. 나중에 변경 가능합니다.`)
      this.$router.push('/' + university.vendor)
    }
  },
  created() {
    this.universityList.sort()
    // axios.post('', {})
  }
}
</script>

<style lang="scss">
@import 'SCSS/global-variables.scss';
@import 'SCSS/global-mixins.scss';

.university-search {
  // padding-bottom: 0 !important;

  .search-area {
    min-height: calc(100vh - #{$stagger-gap});

    .query-input-wrapper {
      width: 100%;
      margin-bottom: 2rem;
      position: sticky;
      top: 0;
      border-bottom: 1px solid #f4f4f4;
      background-color: $base-white;

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
      max-width: 25rem;
      margin: auto;
      box-shadow: $eodiro-shadow;
      border-radius: 1rem;

      @include dark-mode {
        box-shadow: $eodiro-shadow--dark, $dark-mode-border-shadow;
        background-color: #333;
      }

      .university-item {
        padding: 1.2rem 1rem;
        font-size: 1rem;
        text-align: center;
        background-color: $base-white;

        &:nth-child(2n) {
          background-color: darken($base-white, 2%);
        }

        @include dark-mode() {
          background-color: transparent;

          &:nth-child(2n) {
            background-color: rgba(#fff, 0.05);
          }
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
