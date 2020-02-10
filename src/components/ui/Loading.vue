<template>
  <div class="loading">
    <div class="spinner" :class="{ start: start }" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      start: false,
    }
  },
  mounted() {
    setTimeout(() => {
      this.start = true
    }, 200)
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/scss/main.scss';

@keyframes spin {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;

  .spinner {
    opacity: 0;
    transition: opacity 300ms ease;
    margin-top: 5rem;
    width: 20px;
    height: 20px;
    border: 3px solid #fff;
    border-radius: 50px;
    border-color: $base-gray $base-gray $base-gray transparent;
    animation: spin 0.5s linear infinite;

    &.start {
      opacity: 1;
    }
  }
}
</style>
