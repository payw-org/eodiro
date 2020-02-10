<template>
  <div class="club-item">
    <NuxtLink
      class="absolute-link"
      :to="
        localePath({
          name: 'clubs-topic-clubId',
          params: {
            clubId: clubData.name,
          },
        })
      "
    />
    <div class="hero-wrapper">
      <div class="image-wrapper">
        <img
          :src="`https://picsum.photos/${clubData.id}`"
          class="club--image"
        />
      </div>
    </div>
    <div class="details-container">
      <h1 class="club--name">
        {{ clubData.name }}
      </h1>
      <p class="club--explanation">
        {{ clubData.explanation }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    clubData: {
      type: Object,
      required: true,
      default: () => {
        return {}
      },
    },
  },
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
      font-size: b(2);
      font-weight: 600;
    }

    .club--explanation {
      font-size: b(2);
      margin-top: s(1);
      $line-height: lh(1);
      line-height: $line-height;
      max-height: $line-height * 3 * 9.8/10;
      overflow: hidden;
      color: $base-gray;
    }
  }
}
</style>
