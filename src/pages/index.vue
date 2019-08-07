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
                <span class="content">{{ $t('home.menuVacant') }}</span>
              </template>
            </eodiro-block-item>
          </nuxt-link>

          <!-- meal -->
          <eodiro-block-item class="menu-item-wrapper">
            <template v-slot:icon>
              <span class="icon icon--meal"></span>
            </template>
            <template v-slot:content>
              <span class="content">{{ $t('home.menuMeal') }}</span>
            </template>
          </eodiro-block-item>

          <!-- class -->
          <eodiro-block-item class="menu-item-wrapper">
            <template v-slot:icon>
              <span class="icon icon--class"></span>
            </template>
            <template v-slot:content>
              <span class="content">{{ $t('home.menuClass') }}</span>
            </template>
          </eodiro-block-item>

          <!-- clubs -->
          <nuxt-link :to="localePath('clubs').replace(/\/$/, '')">
            <eodiro-block-item class="menu-item-wrapper">
              <template v-slot:icon>
                <span class="icon icon--clubs"></span>
              </template>
              <template v-slot:content>
                <span class="content">{{ $t('home.menuClubs') }}</span>
              </template>
            </eodiro-block-item>
          </nuxt-link>

          <!-- review -->
          <nuxt-link :to="localePath('review').replace(/\/$/, '')">
            <eodiro-block-item class="menu-item-wrapper">
              <template v-slot:icon>
                <span class="icon icon--review"></span>
              </template>
              <template v-slot:content>
                <span class="content">{{ $t('home.menuReview') }}</span>
              </template>
            </eodiro-block-item>
          </nuxt-link>

          <!-- donation -->
          <eodiro-block-item class="menu-item-wrapper">
            <template v-slot:icon>
              <span class="icon icon--donation"></span>
            </template>
            <template v-slot:content>
              <span class="content">{{ $t('home.menuDonation') }}</span>
            </template>
          </eodiro-block-item>

          <!-- inquiry -->
          <eodiro-block-item class="menu-item-wrapper">
            <template v-slot:icon>
              <span class="icon icon--inquiry"></span>
            </template>
            <template v-slot:content>
              <span class="content">{{ $t('home.menuInquiry') }}</span>
            </template>
          </eodiro-block-item>

          <!-- preferences -->
          <nuxt-link :to="localePath('preferences').replace(/\/$/, '')">
            <eodiro-block-item class="menu-item-wrapper">
              <template v-slot:icon>
                <span class="icon icon--preferences"></span>
              </template>
              <template v-slot:content>
                <span class="content">{{ $t('home.menuPreferences') }}</span>
              </template>
            </eodiro-block-item>
          </nuxt-link>
        </eodiro-block-container>
      </div>
    </div>
  </div>
</template>

<script>
import EodiroPageBase from '~/components/global/EodiroPageBase.vue'
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
@import '~/assets/styles/scss/variables/all.scss';
@import '~/assets/styles/scss/mixins/all.scss';

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

      .icon--clubs {
        background-image: url('~assets/images/eodiro/home/home_menu_icon_club.svg');

        @include dark-mode {
          background-image: url('~assets/images/eodiro/home/home_menu_icon_club_black.svg');
        }
      }
    }
  }
}
</style>