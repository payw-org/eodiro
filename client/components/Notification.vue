<template>
  <transition name="slide">
    <aside id="notification" v-if="!isCompleted">
      <div class="banner" @click="complete">
        <h1 class="content">🎉 중앙대학교 안성 캠퍼스와 고려대학교 안암 캠퍼스가 추가되었습니다!<br>친구들에게 알려주세요!</h1>
      </div>
    </aside>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      isCompleted: false,
      storageName: ['completeNoti', 'completeNoti-alt'],
      switch: 1 // 0 <-> 1
    }
  },
  methods: {
    complete() {
      this.isCompleted = true
      localStorage.setItem(this.storageName[this.switch], 'true')
    }
  },
  created() {
    // clear previous notification storage remembrance
    localStorage.removeItem(this.storageName[Math.abs(this.switch - 1)])

    // set new
    let complete = localStorage.getItem(this.storageName[this.switch])
    if (complete === null) {
      localStorage.setItem(this.storageName[this.switch], 'false')
    }
    this.isCompleted = JSON.parse(localStorage.getItem(this.storageName[this.switch]))
  }
})
</script>


<style lang="scss" scoped>
@import 'SCSS/global-variables';
@import 'SCSS/global-mixins';

.slide-enter-active, .slide-leave-active {
  transition: transform 500ms ease;
  transform: translateY(0);
}
.slide-enter, .slide-leave-to {
  transform: translateY(calc(100% + 2rem));
}

#notification {
  position: fixed;
  z-index: 9999;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;

  .banner {
    cursor: pointer;
    max-width: calc(100% - 2rem);
    position: relative;
    margin-bottom: 3rem;
    border-radius: 0.5rem;
    background-color: $base-black;
    box-shadow: $eodiro-shadow;

    @include dark-mode() {
      background-color: $base-white;
    }

    .content {
      text-align: center;
      font-size: 1rem;
      font-weight: 500;
      line-height: 1.3;
      color: $base-white;
      padding: 1rem;

      @include dark-mode() {
        color: $base-black;
      }
    }
  }
}
</style>
