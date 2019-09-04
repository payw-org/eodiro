<template>
  <div id="new-post">
    <h1 class="header">
      {{ $t('community.new.title') }}
    </h1>
    <input
      v-model="title"
      :placeholder="$t('community.new.placeholder.title')"
      class="title-input"
    />
    <textarea
      v-model="body"
      :placeholder="$t('community.new.placeholder.body')"
      class="body-input"
    />
    <Button full class="publish-btn" @click="publishNewPost">
      {{ $t('global.upload') }}
    </Button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import pageBase from '~/mixins/page-base'
import { Button } from '~/components/ui'

export default Vue.extend({
  components: { Button },
  mixins: [pageBase],
  data() {
    return {
      title: '',
      body: ''
    }
  },
  methods: {
    publishNewPost() {
      // Create post data object
      // const newPostData = {}
      // AJAX
    }
  }
})
</script>

<style lang="scss">
@import '~/assets/styles/scss/main';

#new-post {
  .header {
    padding-left: radius(2);
  }

  .title-input,
  .body-input {
    @include input-style;
  }

  .title-input {
    margin-top: space(3);
  }

  .body-input {
    margin-top: space(3);
    min-height: 50vh;
  }

  .publish-btn {
    margin-top: space(3);
  }
}
</style>
