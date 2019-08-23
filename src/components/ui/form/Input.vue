<template>
  <input
    class="feed"
    type="text"
    autocomplete="off"
    spellcheck="false"
    :value="value"
    @input="$emit('input', $event.target.value)"
    @keydown="$emit('keydown')"
    @keyup="$emit('keyup')"
    @keypress="$emit('keypress')"
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

.feed {
  @include bordered;
  @include text-color;
  background-color: transparent;
  font-size: 1rem;
  padding: 0 1rem;
  height: $btn-height !important;
  appearance: none;
  overflow: auto;
  display: block;
  width: 100%;

  @include on-mobile {
    font-size: 16px;
  }
}
</style>
