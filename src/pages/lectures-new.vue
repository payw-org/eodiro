<template>
  <div id="lectures">
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
            <h1 class="lecture-name">
              {{ lecture.name }}
            </h1>
            <p class="professor">
              {{ lecture.professor }}
            </p>
            <p>{{ lecture.schedule }}</p>
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
import EodiroDialog from '~/modules/eodiro-dialog'

export default {
  components: { Accordion, Grid, Loading },
  mixins: [pageBase],
  async asyncData() {
    const lectures = await new LectureApi().getLectures({
      year: 2020,
      semester: '1',
      campus: encodeURIComponent('서울'),
      amount: 20,
      offset: 0,
    })

    return {
      lectures,
    }
  },
  data() {
    return {
      lectures: [],
      loadingVisible: false,
    }
  },
  mounted() {
    CEM.addEventListener('scrollended', this.$el, async () => {
      this.loadingVisible = true

      const offset = this.$el.querySelectorAll('.lecture-item-wrapper').length
      const moreLectures = await new LectureApi().getLectures({
        year: 2020,
        semester: '1',
        campus: encodeURIComponent('서울'),
        amount: 20,
        offset,
      })

      if (moreLectures) {
        this.lectures.push(...moreLectures)
      }

      this.loadingVisible = false
    })
  },
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/main';

#lectures {
  .lecture-item {
    .lecture-name {
      font-size: b(5);
      font-weight: fw(5);
    }
  }
}
</style>
