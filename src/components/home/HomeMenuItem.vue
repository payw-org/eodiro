<template>
  <div class="menu-item">
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


<style lang="scss">
@import '~/assets/styles/scss/global-variables.scss';
@import '~/assets/styles/scss/global-mixins.scss';
@import '~/assets/styles/scss/global-functions.scss';
@import '~/assets/styles/scss/eodiro-ui.scss';

.menu-item {
  @include bordered;
  display: flex;
  width: 100%;
  height: 5.5rem;

  .content {
    display: flex;
    width: 100%;
    height: 100%;
    padding: 0 1rem;
  }

  &.vacant {
    .menu-icon-wrapper {
      background-image: linear-gradient(to bottom, $c-step--3, $c-step--4);
    }
    .menu-icon {
      background-image: url('~assets/images/eodiro/door_white.svg');

      @include dark-mode {
        background-image: url('~assets/images/eodiro/door_black.svg');
      }
    }
  }

  &.meal {
    .menu-icon-wrapper {
      background-image: linear-gradient(to bottom, #0094ff, #0038ff);
    }
    .menu-icon {
      background-image: url('~assets/images/eodiro/fork_knife_white.svg');

      @include dark-mode {
        background-image: url('~assets/images/eodiro/fork_knife_black.svg');
      }
    }
  }

  &.class {
    .menu-icon-wrapper {
      background-image: linear-gradient(to bottom, #22f200, #14c34f);
    }
    .menu-icon {
      background-image: url('~assets/images/eodiro/magnifier_white.svg');

      @include dark-mode {
        background-image: url('~assets/images/eodiro/magnifier_black.svg');
      }
    }
  }

  &.preferences {
    .menu-icon-wrapper {
      background-image: linear-gradient(to bottom, #939393, #636363);
    }
    .menu-icon {
      background-image: url('~assets/images/eodiro/gear_white.svg');

      @include dark-mode {
        background-image: url('~assets/images/eodiro/gear_black.svg');
      }
    }
  }

  &.review {
    .menu-icon-wrapper {
      background-image: linear-gradient(to bottom, #ffc700, #ff8a00);
    }
    .menu-icon {
      background-image: url('~assets/images/eodiro/review_white.svg');

      @include dark-mode {
        background-image: url('~assets/images/eodiro/review_black.svg');
      }
    }
  }

  &.donation {
    .menu-icon-wrapper {
      background-image: linear-gradient(to bottom, #c41bff, #9300ed);
    }
    .menu-icon {
      background-image: url('~assets/images/eodiro/heart_white.svg');

      @include dark-mode {
        background-image: url('~assets/images/eodiro/heart_black.svg');
      }
    }
  }

  &.inquiry {
    .menu-icon-wrapper {
      background-image: linear-gradient(to bottom, #ff56ee, #e400db);
    }
    .menu-icon {
      background-image: url('~assets/images/eodiro/q_mark_white.svg');

      @include dark-mode {
        background-image: url('~assets/images/eodiro/q_mark_black.svg');
      }
    }
  }

  .menu-icon-area {
    // width: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;

    .menu-icon-wrapper {
      $wrapper-size: 29px;
      $icon-size: 25px;

      display: flex;
      align-items: center;
      justify-content: center;
      width: $wrapper-size;
      height: $wrapper-size;
      border-radius: 0.5rem;

      .menu-icon {
        display: block;
        width: $icon-size;
        height: $icon-size;
        background-position: center;
        background-repeat: no-repeat;
        background-size: 100%;
      }

      @include larger-than($res-step--1) {
        & {
          width: res-scale--1($wrapper-size);
          height: res-scale--1($wrapper-size);

          .menu-icon {
            width: res-scale--1($icon-size);
            height: res-scale--1($icon-size);
          }
        }
      }

      @include larger-than($res-step--2) {
        & {
          width: res-scale--2($wrapper-size);
          height: res-scale--2($wrapper-size);

          .menu-icon {
            width: res-scale--2($icon-size);
            height: res-scale--2($icon-size);
          }
        }
      }
    }
  }

  .title {
    padding: 0 1rem;
    font-size: 1.2rem;
    font-weight: 400;
    flex: 1;
    align-self: center;

    span {
      font-size: 1.2rem;
      font-weight: 400;
      counter-reset: $base-black;
    }

    @include dark-mode {
      color: $base-white;
    }
  }

  .arrow-wrapper {
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
