<template>
  <div id="home">
    <div class="page-content-wrapper">
      <div class="page-content">
        <Grid class="menu-item-container">
          <!-- vacant classrooms -->
          <nuxt-link :to="localePath('vacant').replace(/\/$/, '')">
            <menu-block class="menu-item-wrapper">
              <template v-slot:icon>
                <span class="icon icon--vacant"></span>
              </template>
              <template v-slot:content>
                <span class="content">{{ $t('home.menuVacant') }}</span>
              </template>
            </menu-block>
          </nuxt-link>

          <!-- meal -->
          <menu-block class="menu-item-wrapper">
            <template v-slot:icon>
              <span class="icon icon--meal"></span>
            </template>
            <template v-slot:content>
              <span class="content">{{ $t('home.menuMeal') }}</span>
            </template>
          </menu-block>

          <!-- class -->
          <menu-block class="menu-item-wrapper">
            <template v-slot:icon>
              <span class="icon icon--class"></span>
            </template>
            <template v-slot:content>
              <span class="content">{{ $t('home.menuClass') }}</span>
            </template>
          </menu-block>

          <!-- clubs -->
          <nuxt-link :to="localePath('clubs').replace(/\/$/, '')">
            <menu-block class="menu-item-wrapper">
              <template v-slot:icon>
                <span class="icon icon--clubs"></span>
              </template>
              <template v-slot:content>
                <span class="content">{{ $t('home.menuClubs') }}</span>
              </template>
            </menu-block>
          </nuxt-link>

          <!-- inquiry -->
          <nuxt-link :to="localePath('inquiry').replace(/\/$/, '')">
            <menu-block class="menu-item-wrapper">
              <template v-slot:icon>
                <span class="icon icon--inquiry"></span>
              </template>
              <template v-slot:content>
                <span class="content">{{ $t('home.menuInquiry') }}</span>
              </template>
            </menu-block>
          </nuxt-link>

          <!-- donation -->
          <menu-block class="menu-item-wrapper">
            <template v-slot:icon>
              <span class="icon icon--donation"></span>
            </template>
            <template v-slot:content>
              <span class="content">{{ $t('home.menuDonation') }}</span>
            </template>
          </menu-block>

          <!-- preferences -->
          <nuxt-link :to="localePath('preferences').replace(/\/$/, '')">
            <menu-block class="menu-item-wrapper">
              <template v-slot:icon>
                <span class="icon icon--preferences"></span>
              </template>
              <template v-slot:content>
                <span class="content">{{ $t('home.menuPreferences') }}</span>
              </template>
            </menu-block>
          </nuxt-link>
        </Grid>
      </div>
    </div>
  </div>
</template>

<script>
import EodiroPageBase from '~/components/global/EodiroPageBase.vue'
import EodiroDialog from '~/plugins/eodiro-dialog'
import { Grid, MenuBlock } from '~/components/ui'

export default {
  name: 'home',
  extends: EodiroPageBase,
  components: { Grid, MenuBlock },
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
@import '~/assets/styles/scss/main.scss';

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

      .icon--inquiry {
        background-image: url('~assets/images/eodiro/home/home_menu_icon_inquiry.svg');

        @include dark-mode {
          background-image: url('~assets/images/eodiro/home/home_menu_icon_inquiry_black.svg');
        }
      }

      .icon--donation {
        background-image: url('~assets/images/eodiro/home/home_menu_icon_donate.svg');

        @include dark-mode {
          background-image: url('~assets/images/eodiro/home/home_menu_icon_donate_black.svg');
        }
      }

      .icon--preferences {
        background-image: url('~assets/images/eodiro/home/home_menu_icon_preferences.svg');

        @include dark-mode {
          background-image: url('~assets/images/eodiro/home/home_menu_icon_preferences_black.svg');
        }
      }

      .icon--clubs {
        background-image: url('~assets/images/eodiro/home/home-menu-icon-club.svg');

        @include dark-mode {
          background-image: url('~assets/images/eodiro/home/home-menu-icon-club-black.svg');
        }
      }
        }
      }
    }
  }
}
</style>