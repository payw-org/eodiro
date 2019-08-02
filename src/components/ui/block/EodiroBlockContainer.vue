<template>
  <div class="eodiro-block-container">
    <slot></slot>
  </div>
</template>

<style lang="scss">
.eodiro-block-container {
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
}
</style>
