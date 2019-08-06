<template>
  <textarea
    class="eodiro-textarea"
    autocomplete="off"
    spellcheck="false"
    :value="value"
    @input="$emit('input', $event.target.value)"
  ></textarea>
</template>

<script>
export default {
  props: ['value']
}
</script>


<style lang="scss">
@import '~/assets/styles/scss/mixins/all.scss';
@import '~/assets/styles/scss/eodiro-ui.scss';

.eodiro-textarea {
  @include bordered;
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
