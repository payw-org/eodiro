<template>
  <div class="club-item">
    <div class="hero-wrapper">
      <div class="image-wrapper">
        <img :src="clubImgSrc" class="club--image">
      </div>
    </div>
    <div class="details-container">
      <h1 class="club--name">
        {{ clubName }}
      </h1>
      <p class="club--explanation">
        {{ clubExplanation }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    clubImgSrc: {
      type: String,
      required: false,
      default: ''
    },
    clubName: {
      type: String,
      required: true
    },
    clubExplanation: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/main.scss';

.club-item {
  @include block-style;

  .hero-wrapper {
    flex: 2;
    align-self: stretch;
    margin-left: -1rem;
    position: relative;

    &::before {
      content: '';
      display: block;
      padding-top: 120%;
    }

    .image-wrapper {
      flex: 2;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      .club--image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  .details-container {
    flex: 3;
    min-width: 0;
    margin-left: $gentle-gap;
    padding: $gentle-gap 0;

    .club--name {
      font-size: 1.2rem;
      font-weight: 600;
    }

    .club--explanation {
      font-size: 0.9rem;
      margin-top: $slight-gap;
      $line-height: 1.4em;
      line-height: $line-height;
      max-height: $line-height * 2;
      overflow: hidden;
    }
  }
}
</style>
