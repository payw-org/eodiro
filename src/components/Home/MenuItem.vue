<template>
  <div class="menu-item">
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
</template>

<style lang="scss" scoped>
@import '~/assets/styles/scss/global-variables.scss';

.menu-item {
  $mi: &;
  display: flex;
  border-radius: 8px;
  transition: background-color 100ms ease;

  &:active {
    background-color: $eodiro-gray;
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
      background-image: linear-gradient(to bottom, $edr-step--3, $edr-step--4);
      border-radius: 5px;

      .menu-icon {
        display: block;
        width: 2rem;
        height: 2rem;
        background-position: center;
        background-repeat: no-repeat;
        background-size: 90%;

        #{$mi}.meal & {
          background-image: url('~assets/images/eodiro/fork_knife_white.svg');
        }
      }
    }
  }

  .title {
    font-size: 1.5rem;
    font-weight: 600;
    flex: 1;
    margin: 2rem 0;
    color: $edr-step--4;
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
