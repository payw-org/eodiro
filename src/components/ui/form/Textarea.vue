<template>
  <textarea
    class="multi-feed"
    autocomplete="off"
    spellcheck="false"
    :value="value"
    @input="$emit('input', $event.target.value)"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/main.scss';

.multi-feed {
  @include bordered;
  border-radius: radius(4);
  @include text-color;
  cursor: text;
  background-color: transparent;
  font-size: 1rem;
  line-height: 1.4;
  padding: 1rem;
  appearance: none;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  display: block;
  width: 100%;
  resize: none;
  min-height: 5rem;

  @include on-mobile {
    font-size: 16px;
  }
}
</style>
