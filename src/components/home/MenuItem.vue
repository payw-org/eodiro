<template>
  <cushion class="menu-item">
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
  </cushion>
</template>

<script>
import Cushion from '~/components/Cushion'

export default {
  components: { Cushion },
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


<style lang="scss">
@import '~/assets/styles/scss/global-variables.scss';

.menu-item {
  .content {
    display: flex;
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
