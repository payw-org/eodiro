<template>
  <div id="eodiro-lectures">
    <div class="search-container">
      <input
        v-model="searchQuery"
        type="text"
        spellcheck="false"
        :placeholder="$t('lectures.initInputText')"
        @input="handleSearchInput"
      />
      <div class="magnifier-icon" />
    </div>

    <div class="coverage">
      <div class="select-wrapper">
        <select id="" name="">
          <option v-for="year in coverage.year" :key="'year' + year">
            {{ year }}
          </option>
        </select>
      </div>
      <div class="select-wrapper">
        <select id="" name="">
          <option
            v-for="semester in coverage.semester"
            :key="'semester' + semester"
          >
            {{ `${semester}학기` }}
          </option>
        </select>
      </div>
      <div class="select-wrapper">
        <select id="" name="">
          <option v-for="campus in coverage.campus" :key="'campus' + campus">
            {{ campus }}
          </option>
        </select>
      </div>
    </div>

    <Grid>
      <div
        v-for="lecture in lectures"
        :key="
          lecture.name +
            lecture.code +
            lecture.major +
            lecture.professor +
            lecture.schedule
        "
        class="grid-item lecture-item-wrapper"
      >
        <Accordion class="lecture-item">
          <template v-slot:face>
            <h1 class="name">
              {{ lecture.name }}
            </h1>
            <p class="professor">
              {{ lecture.professor }}
            </p>
            <p class="schedule">
              {{ lecture.schedule }}
            </p>
          </template>
          <template v-slot:content>
            <div class="more">
              <p>{{ lecture.code }}</p>
              <div v-if="lecture.note" class="note">
                <h2 class="header">
                  Note
                </h2>
                <p>{{ lecture.note }}</p>
              </div>
            </div>
          </template>
        </Accordion>
      </div>
    </Grid>

    <Loading :visible="loadingVisible" />
  </div>
</template>

<script>
import pageBase from '~/mixins/page-base'
import { LectureApi } from '~/modules/eodiro-api'
import { Accordion, Grid } from '~/components/ui'
import Loading from '~/components/global/Loading'
import { CEM } from '~/modules/custom-event-manager'

export default {
  name: 'lectures',
  components: { Accordion, Grid, Loading },
  mixins: [pageBase],
  async asyncData() {
    const coverage = await new LectureApi().getCoverages()
    const lectures = await new LectureApi().getLectures({
      year: 2020,
      semester: '1',
      campus: encodeURIComponent('서울'),
      amount: 20,
      offset: 0,
    })

    return {
      lectures,
      coverage,
    }
  },
  data() {
    return {
      lectures: [],
      loadingVisible: false,
      searchQuery: '',
      realSearchQuery: '',
      lastCjkData: '',
      searchTimeout: null,
      scrollEndListener: null,
    }
  },
  watch: {
    searchQuery(value) {
      this.realSearchQuery = value
    },
    /**
     * @param {string} value
     */
    realSearchQuery(value) {
      // When the real search query changes,
      // search from the server
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout)
      }

      this.searchTimeout = setTimeout(async () => {
        if (value.length === 0) {
          this.fetchLectures(true)
        } else {
          CEM.removeEventListener('scrollended', this.scrollEndListener)

          await this.searchLectures(true)

          CEM.addEventListener('scrollended', this.$el, this.scrollEndListener)
        }
      }, 300)
    },
  },
  mounted() {
    this.scrollEndListener = async () => {
      this.loadingVisible = true

      if (this.realSearchQuery.length === 0) {
        await this.fetchLectures()
      } else {
        await this.searchLectures(false)
      }

      this.loadingVisible = false
    }
    CEM.addEventListener('scrollended', this.$el, this.scrollEndListener)
  },
  methods: {
    async fetchLectures(firstLoad = false) {
      const offset = firstLoad
        ? 0
        : this.$el.querySelectorAll('.lecture-item-wrapper').length
      const moreLectures = await new LectureApi().getLectures({
        year: 2020,
        semester: '1',
        campus: encodeURIComponent('서울'),
        amount: 20,
        offset,
      })

      if (firstLoad) {
        this.lectures = [...moreLectures]
      } else {
        this.lectures = [...this.lectures, ...moreLectures]
      }
    },
    async searchLectures(firstLoad = false) {
      const offset = firstLoad
        ? 0
        : this.$el.querySelectorAll('.lecture-item-wrapper').length
      const searchResults = await new LectureApi().searchLectures({
        year: 2020,
        semester: '1',
        campus: encodeURIComponent('서울'),
        amount: 20,
        offset,
        query: this.realSearchQuery,
      })

      if (firstLoad) {
        this.lectures = [...searchResults]
      } else {
        this.lectures = [...this.lectures, ...searchResults]
      }
    },
    /**
     * @param {InputEvent} e
     */
    handleSearchInput(e) {
      if (this.lastCjkData === e.data) {
        return
      }
      this.lastCjkData = e.data
      this.realSearchQuery = this.searchQuery + (e.data || '')
    },
  },
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/main';

#eodiro-lectures {
  .coverage {
    display: flex;
    margin-bottom: s(5);

    .select-wrapper {
      flex: 1;
      margin-right: s(3);

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .search-container {
    @include bg;
    z-index: 10;
    position: sticky;
    top: $nav-height;
    padding: s(3) 0;
    margin-top: -#{s(3)};
    margin-bottom: s(2);

    input {
      padding-left: $btn-height;
    }

    .magnifier-icon {
      position: absolute;
      top: 50%;
      left: 0;
      width: $btn-height;
      height: $btn-height;
      transform: translateY(-50%);
      @include bgImg('~assets/images/magnifier-black.svg', 'center', '70%');
      @include dark-mode {
        @include bgImg('~assets/images/magnifier-white.svg', 'center', '70%');
      }
    }
  }

  .lecture-item {
    .name {
      font-size: b(5);
      font-weight: fw(5);
    }

    .professor {
      margin-top: s(2);
      font-weight: fw(4);
      font-size: b(3);
    }

    .schedule {
      margin-top: s(1);
      font-size: b(2);
      line-height: lh(2);
      color: $base-gray;
    }

    .more {
      &,
      * {
        font-size: b(2);
      }

      .note {
        margin-top: s(2);
        padding: s(2);
        border-radius: r(2);
        @include overlay-inverted;

        .header {
        }
      }
    }
  }
}
</style>
