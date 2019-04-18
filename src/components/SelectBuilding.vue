<template>
  <div class="content-item select-building">
    <div class="building-container">
      <router-link v-for="n in 10" :key="n" :to="'/buildings/' + n">
        <div  class="building">
          <img src="" alt="">
          <div class="building-name">building {{ n }}</div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
@import '../scss/global-variables.scss';
@import '../scss/global-mixins.scss';

.building-container {
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  padding-top: 20px;
  max-width: 80rem;
  margin: auto;

  .building {
    position: relative;
    background-color: transparent;
    border-radius: 1.5rem;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    transition: $smooth-transition;

    &:hover {
      transform: $hover-transform;
      box-shadow: 0 20px 40px rgba(0,0,0,0.15);
    }

    &:active {
      transform: $click-transform;
      box-shadow: 0 5px 10px rgba(0,0,0,0.1);
    }

    &::before {
      content: '';
      display: block;
      padding-top: 73%;
    }

    .building-name {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 1rem;
      border-radius: 0 0 1.5rem 1.5rem;
      text-align: center;
      background-color: #fff;
      font-weight: 500;
      font-size: 1.2rem;
    }
  }
}
</style>
