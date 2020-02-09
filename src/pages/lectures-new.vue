<template>
  <div>
    <div
      v-for="lecture in lectures"
      :key="lecture.name + lecture.code + lecture.major + lecture.professor"
    >
      {{ lecture.name }}
    </div>
  </div>
</template>

<script>
import pageBase from '~/mixins/page-base'
import { LectureApi } from '~/modules/eodiro-api'
import { Accordion } from '~/components/ui'

export default {
  mixins: [pageBase],
  async asyncData() {
    const lectures = await new LectureApi().getLectures({
      year: 2020,
      semester: '1',
      campus: encodeURIComponent('서울'),
    })

    return {
      lectures,
    }
  },
}
</script>
