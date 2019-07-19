<i18n>
{
  "kr": {
    "confirm": "확인",
    "cancel": "취소",
    "close": "닫기"
  },
  "en": {
    "confirm": "Confirm",
    "cancel": "Cancel",
    "close": "Close"
  }
}
</i18n>

<template>
  <div class="eodiro-modal">
    <div class="content">
      <div class="message"></div>
      <div class="actions">
        <cushion class="act okay">
          <button>{{ $t('confirm') }}</button>
        </cushion>
        <cushion class="act cancel">
          <button>{{ $t('cancel') }}</button>
        </cushion>
        <cushion class="act close">
          <button>{{ $t('close') }}</button>
        </cushion>
      </div>
    </div>
    <div class="wall"></div>
  </div>
</template>

<script>
import Cushion from '~/components/Cushion'

export default {
  components: { Cushion }
}
</script>


<style lang="scss">
@import '~/assets/styles/scss/global-variables.scss';

$build-out-time: 700ms;
$build-in-time: 700ms;

.eodiro-modal {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 100vh;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  visibility: hidden;
  transition: visibility $build-out-time ease;

  &.confirm {
    .act.close {
      display: none;
    }
  }

  &.alert {
    .act.okay,
    .act.cancel {
      display: none;
    }
  }

  .content {
    width: calc(100% - 2rem);
    max-width: 20rem;
    height: auto;
    padding: 1rem 1.5rem;
    background-color: #fff;
    border-radius: 1rem;
    text-align: center;
    font-size: 1rem;
    z-index: 1;
    opacity: 0;
    transform: scale(0.9);
    // transition: opacity 200ms ease, transform 200ms ease;
    position: relative;
    top: -1rem;
    animation: springZoomInOut $build-out-time linear;
    animation-fill-mode: both;

    .message {
      margin-top: 1rem;
    }

    .actions {
      margin-top: 1.5rem;
      text-align: center;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(0, 1fr));

      .act {
        padding: 0.7rem 0;

        button {
          color: $c-step--4;
          font-size: 1rem;
        }
      }
    }
  }

  .wall {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(30px);
    opacity: 0;
    transition: opacity 200ms ease;
  }

  &.active {
    visibility: visible;
    pointer-events: all;

    .content {
      // opacity: 1;
      // transform: scale(1);
      animation: springZoomIn $build-in-time linear;
      animation-fill-mode: both;
    }

    .wall {
      opacity: 1;
    }
  }
}
</style>

