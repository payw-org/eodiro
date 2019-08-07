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
  props: ['value']
}
</script>


<style lang="scss">
@import '~/assets/styles/scss/mixins/all.scss';
@import '~/assets/styles/scss/eodiro-ui.scss';

.feed {
  @include bordered;
  @include text-color;
  background-color: transparent;
  font-size: 1rem;
  padding: 1rem;
  appearance: none;
  overflow: auto;
  display: block;
  width: 100%;

  @include on-mobile {
    font-size: 16px;
  }
}
</style>
