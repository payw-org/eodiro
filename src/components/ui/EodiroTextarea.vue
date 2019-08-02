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
@import '~/assets/styles/scss/global-mixins.scss';
@import '~/assets/styles/scss/eodiro-ui.scss';

.eodiro-textarea {
  @include bordered;
  @include text-color;
  background-color: transparent;
  font-size: 1rem;
  padding: 1rem;
  appearance: none;
  // overflow: auto;
  -webkit-overflow-scrolling: touch;
  display: block;
  width: 100%;

  @include on-mobile {
    font-size: 16px;
  }
}
</style>
