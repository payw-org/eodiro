<template>
  <div id="preparing">
    <h1>
      업데이트중입니다.
      <br />잠시만 기다려주세요.
    </h1>
  </div>
</template>

<style lang="scss" scoped>
@import '~/assets/styles/scss/variables/all.scss';

#preparing {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  h1 {
    text-align: center;
    max-width: calc(100% - 2rem);
  }
}
</style>
