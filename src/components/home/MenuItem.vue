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
import Cushion from '~/components/Cushion.vue'

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
@import '~/assets/styles/scss/global-mixins.scss';

.menu-item {
  width: 100%;
  height: 5.5rem;

  .content {
    display: flex;
  }

  &.vacant {
    .menu-icon-wrapper {
      background-image: linear-gradient(to bottom, $c-step--3, $c-step--4);
    }
    .menu-icon {
      background-image: url('~assets/images/eodiro/door_white.svg');
    }
  }

  &.meal {
    .menu-icon-wrapper {
      background-image: linear-gradient(to bottom, #0094ff, #0038ff);
    }
    .menu-icon {
      background-image: url('~assets/images/eodiro/fork_knife_white.svg');
    }
  }

  &.class {
    .menu-icon-wrapper {
      background-image: linear-gradient(to bottom, #22f200, #14c34f);
    }
    .menu-icon {
      background-image: url('~assets/images/eodiro/magnifier_white.svg');
    }
  }

  &.preferences {
    .menu-icon-wrapper {
      background-image: linear-gradient(to bottom, #939393, #636363);
    }
    .menu-icon {
      background-image: url('~assets/images/eodiro/gear_white.svg');
    }
  }

  &.review {
    .menu-icon-wrapper {
      background-image: linear-gradient(to bottom, #ffc700, #ff8a00);
    }
    .menu-icon {
      background-image: url('~assets/images/eodiro/review_white.svg');
    }
  }

  &.donation {
    .menu-icon-wrapper {
      background-image: linear-gradient(to bottom, #c41bff, #9300ed);
    }
    .menu-icon {
      background-image: url('~assets/images/eodiro/coffee_white.svg');
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
      border-radius: 0.4rem;

      .menu-icon {
        display: block;
        width: 2rem;
        height: 2rem;
        background-position: center;
        background-repeat: no-repeat;
        background-size: 1.8rem;
      }
    }
  }

  .title,
  .title span {
    font-size: 1.2rem;
    font-weight: 500;
    flex: 1;
    align-self: center;
    // margin: 2rem 0;
    color: $base-black;

    @include dark-mode {
      color: $base-white;
    }
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
      background-image: url('~assets/images/eodiro/arrow_right_gray.svg');
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;

      @include dark-mode {
        background-image: url('~assets/images/eodiro/arrow_right_dark.svg');
      }
    }
  }
}
</style>
