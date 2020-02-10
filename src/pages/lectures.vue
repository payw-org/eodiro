<template>
  <div id="eodiro-lectures">
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

#eodiro-lectures {
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
