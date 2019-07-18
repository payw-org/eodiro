<template>
  <div
    class="menu-item"
    :class="{active: pressed}"
    @mousedown="press"
    @mouseup="clearPress"
    @mouseleave="clearPress"
    @touchstart="press"
    @touchend="clearPress"
    @touchmove="clearPress"
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
      pressed: false
    }
  },
  methods: {
    press() {
      this.pressed = true
    },
    clearPress() {
      this.pressed = false
    }
  }
}
</script>


<style lang="scss" scoped>
@import '~/assets/styles/scss/global-variables.scss';

.menu-item {
  $cushion-time: 1000ms;
  display: flex;
  border-radius: 0.5rem;
  transition: background-color $cushion-time ease, box-shadow $cushion-time ease;

  .content {
    display: flex;
    width: 100%;
    transition: transform $cushion-time ease;
  }

  &.active {
    background-color: $gray;
    background-color: $light-gray;
    box-shadow: inset 0 0 0.3rem rgba(0, 0, 0, 0.2);
    transition: background-color 0ms ease, box-shadow 0ms ease;

    .content {
      transform: scale(0.97);
      transition: transform 0ms ease;
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

  &.review {
    .menu-icon {
      background-image: url('~assets/images/eodiro/review_white.svg');
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
      border-radius: 0.4rem;

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
    width: 2.6rem;
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
