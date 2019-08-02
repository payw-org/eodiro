<i18n>
{
  "kr": {
    "menu_vacant": "빈 강의실 조회",
    "menu_meal": "학식 메뉴",
    "menu_class": "강의 검색",
    "menu_preferences": "설정",
    "menu_review": "리뷰 남기기",
    "menu_donation": "후원하기",
    "menu_inquiry": "자주 묻는 질문",
    "preparing": "준비중입니다."
  },
  "en": {
    "menu_vacant": "Find Vacant Classrooms",
    "menu_meal": "Restaurant Menu",
    "menu_class": "Search Classes",
    "menu_preferences": "Preferences",
    "menu_review": "Write a Review",
    "menu_donation": "Donate",
    "menu_inquiry": "Frequently Asked",
    "preparing": "We're working on this feature."
  }
}
</i18n>

<template>
  <div id="home">
    <div class="page-content-wrapper">
      <div class="page-content">
        <eodiro-block-container class="menu-item-container">
          <!-- vacant classrooms -->
          <nuxt-link :to="localePath('vacant').replace(/\/$/, '')">
            <eodiro-block-item class="menu-item-wrapper">
              <template v-slot:icon>
                <span class="icon icon--vacant"></span>
              </template>
              <template v-slot:content>
                <span class="content">{{ $t('menu_vacant') }}</span>
              </template>
            </eodiro-block-item>
          </nuxt-link>

          <!-- meal -->
          <eodiro-block-item class="menu-item-wrapper">
            <template v-slot:icon>
              <span class="icon icon--meal"></span>
            </template>
            <template v-slot:content>
              <span class="content">{{ $t('menu_meal') }}</span>
            </template>
          </eodiro-block-item>

          <!-- class -->
          <eodiro-block-item class="menu-item-wrapper">
            <template v-slot:icon>
              <span class="icon icon--class"></span>
            </template>
            <template v-slot:content>
              <span class="content">{{ $t('menu_class') }}</span>
            </template>
          </eodiro-block-item>

          <!-- review -->
          <eodiro-block-item class="menu-item-wrapper">
            <template v-slot:icon>
              <span class="icon icon--review"></span>
            </template>
            <template v-slot:content>
              <span class="content">{{ $t('menu_review') }}</span>
            </template>
          </eodiro-block-item>

          <!-- donation -->
          <eodiro-block-item class="menu-item-wrapper">
            <template v-slot:icon>
              <span class="icon icon--donation"></span>
            </template>
            <template v-slot:content>
              <span class="content">{{ $t('menu_donation') }}</span>
            </template>
          </eodiro-block-item>

          <!-- inquiry -->
          <eodiro-block-item class="menu-item-wrapper">
            <template v-slot:icon>
              <span class="icon icon--inquiry"></span>
            </template>
            <template v-slot:content>
              <span class="content">{{ $t('menu_inquiry') }}</span>
            </template>
          </eodiro-block-item>

          <!-- preferences -->
          <nuxt-link :to="localePath('preferences').replace(/\/$/, '')">
            <eodiro-block-item class="menu-item-wrapper">
              <template v-slot:icon>
                <span class="icon icon--preferences"></span>
              </template>
              <template v-slot:content>
                <span class="content">{{ $t('menu_preferences') }}</span>
              </template>
            </eodiro-block-item>
          </nuxt-link>
        </eodiro-block-container>
      </div>
    </div>
  </div>
</template>

<script>
import EodiroPageBase from '~/components/EodiroPageBase.vue'
import EodiroDialog from '~/plugins/eodiro-dialog'
import { EodiroBlockContainer, EodiroBlockItem } from '~/components/ui'

export default {
  name: 'home',
  extends: EodiroPageBase,
  components: { EodiroBlockContainer, EodiroBlockItem },
  meta: {
    depth: 0,
    appName: 'home'
  },
  methods: {
    preparing() {
      new EodiroDialog().alert(this.$t('preparing'))
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/global-variables.scss';
@import '~/assets/styles/scss/global-mixins.scss';

#home {
  .page-content-wrapper {
    width: 100%;

    .page-content {
      .menu-item-container {
        .menu-item-wrapper {
          .content {
            font-weight: 500;
            font-size: 1.2rem;
          }
        }
      }

      .icon--vacant {
        background-image: url('~assets/images/eodiro/home/home_menu_icon_vacant.svg');

        @include dark-mode {
          background-image: url('~assets/images/eodiro/home/home_menu_icon_vacant_black.svg');
        }
      }

      .icon--meal {
        background-image: url('~assets/images/eodiro/home/home_menu_icon_food.svg');

        @include dark-mode {
          background-image: url('~assets/images/eodiro/home/home_menu_icon_food_black.svg');
        }
      }

      .icon--class {
        background-image: url('~assets/images/eodiro/home/home_menu_icon_class.svg');

        @include dark-mode {
          background-image: url('~assets/images/eodiro/home/home_menu_icon_class_black.svg');
        }
      }

      .icon--review {
        background-image: url('~assets/images/eodiro/home/home_menu_icon_review.svg');

        @include dark-mode {
          background-image: url('~assets/images/eodiro/home/home_menu_icon_review_black.svg');
        }
      }

      .icon--donation {
        background-image: url('~assets/images/eodiro/home/home_menu_icon_donate.svg');

        @include dark-mode {
          background-image: url('~assets/images/eodiro/home/home_menu_icon_donate_black.svg');
        }
      }

      .icon--inquiry {
        background-image: url('~assets/images/eodiro/home/home_menu_icon_inquiry.svg');

        @include dark-mode {
          background-image: url('~assets/images/eodiro/home/home_menu_icon_inquiry_black.svg');
        }
      }

      .icon--preferences {
        background-image: url('~assets/images/eodiro/home/home_menu_icon_preferences.svg');

        @include dark-mode {
          background-image: url('~assets/images/eodiro/home/home_menu_icon_preferences_black.svg');
        }
      }
    }
  }
}
</style>