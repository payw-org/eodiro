<template>
  <div
    class="menu-item"
    :class="{active: clicked}"
    @mousedown="clicked = true"
    @mouseup="clicked = false"
    @mouseleave="clicked = false"
    @touchstart="clicked = true"
    @touchend="clicked = false"
    @touchmove="clicked = false"
  >
    <div class="content">
      <div class="menu-icon-area">
        <div class="menu-icon-wrapper">
          <span class="menu-icon"></span>
        </div>
      </div>
      <h1 class="title">
        <slot name="title"></slot>
      </h1>
      <div class="arrow-wrapper">
        <span class="arrow"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      clicked: false
    }
  }
}
</script>


<style lang="scss" scoped>
@import '~/assets/styles/scss/global-variables.scss';

.menu-item {
  display: flex;
  border-radius: 8px;
  transition: background-color 1000ms ease, box-shadow 1000ms ease;

  .content {
    display: flex;
    transition: transform 1000ms ease;
  }

  &.active {
    background-color: $gray;
    background-color: $light-gray;
    box-shadow: inset 0 0 0.3rem rgba(0, 0, 0, 0.2);
    transition: background-color 100ms ease, box-shadow 100ms ease;

    .content {
      transform: scale(0.95);
      transition: transform 100ms ease;
    }
  }

  &.vacant {
    .menu-icon {
      background-image: url('~assets/images/eodiro/door_white.svg');
    }
  }

  &.meal {
    .menu-icon {
      background-image: url('~assets/images/eodiro/fork_knife_white.svg');
    }
  }

  &.class {
    .menu-icon {
      background-image: url('~assets/images/eodiro/magnifier_white.svg');
    }
  }

  &.preferences {
    .menu-icon {
      background-image: url('~assets/images/eodiro/gear_white.svg');
    }
  }

  .menu-icon-area {
    width: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;

    .menu-icon-wrapper {
      display: block;
      width: 2rem;
      height: 2rem;
      background-image: linear-gradient(to bottom, $c-step--3, $c-step--4);
      border-radius: 5px;

      .menu-icon {
        display: block;
        width: 2rem;
        height: 2rem;
        background-position: center;
        background-repeat: no-repeat;
        background-size: 90%;
      }
    }
  }

  .title {
    font-size: 1.3rem;
    font-weight: 600;
    flex: 1;
    margin: 2rem 0;
    color: $c-step--4;
  }

  .arrow-wrapper {
    width: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;

    .arrow {
      display: block;
      width: 0.6rem;
      height: 2rem;
      background-image: url('~assets/images/eodiro/arrow_right_step4.svg');
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
    }
  }
}
</style>
