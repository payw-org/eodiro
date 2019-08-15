<template>
  <div id="home">
    <div class="page-content-wrapper">
      <div class="page-content">
        <Grid class="menu-item-container">
          <!-- vacant classrooms -->
          <nuxt-link :to="localePath('vacant').replace(/\/$/, '')">
            <ArrowBlock class="menu-item-wrapper">
              <template v-slot:icon>
                <span class="icon icon--vacant" />
              </template>
              <template v-slot:content>
                <span class="content">{{ $t('home.menuVacant') }}</span>
              </template>
            </ArrowBlock>
          </nuxt-link>

          <!-- meal -->
          <ArrowBlock class="menu-item-wrapper">
            <template v-slot:icon>
              <span class="icon icon--meal" />
            </template>
            <template v-slot:content>
              <span class="content">{{ $t('home.menuMeal') }}</span>
            </template>
          </ArrowBlock>

          <!-- class -->
          <ArrowBlock class="menu-item-wrapper">
            <template v-slot:icon>
              <span class="icon icon--class" />
            </template>
            <template v-slot:content>
              <span class="content">{{ $t('home.menuClass') }}</span>
            </template>
          </ArrowBlock>

          <!-- clubs -->
          <nuxt-link :to="localePath('clubs').replace(/\/$/, '')">
            <ArrowBlock class="menu-item-wrapper">
              <template v-slot:icon>
                <span class="icon icon--clubs" />
              </template>
              <template v-slot:content>
                <span class="content">{{ $t('home.menuClubs') }}</span>
              </template>
            </ArrowBlock>
          </nuxt-link>

          <!-- inquiry -->
          <nuxt-link :to="localePath('inquiry').replace(/\/$/, '')">
            <ArrowBlock class="menu-item-wrapper">
              <template v-slot:icon>
                <span class="icon icon--inquiry" />
              </template>
              <template v-slot:content>
                <span class="content">{{ $t('home.menuInquiry') }}</span>
              </template>
            </ArrowBlock>
          </nuxt-link>

          <!-- donation -->
          <ArrowBlock class="menu-item-wrapper">
            <template v-slot:icon>
              <span class="icon icon--donation" />
            </template>
            <template v-slot:content>
              <span class="content">{{ $t('home.menuDonation') }}</span>
            </template>
          </ArrowBlock>

          <!-- preferences -->
          <nuxt-link :to="localePath('preferences').replace(/\/$/, '')">
            <ArrowBlock class="menu-item-wrapper">
              <template v-slot:icon>
                <span class="icon icon--preferences" />
              </template>
              <template v-slot:content>
                <span class="content">{{ $t('home.menuPreferences') }}</span>
              </template>
            </ArrowBlock>
          </nuxt-link>
        </Grid>
      </div>
    </div>

    <footer class="footer">
      <p class="manifesto">
        Copyright © 2019 PAYW™
      </p>
    </footer>
  </div>
</template>

<script>
import EodiroPageBase from '~/components/global/EodiroPageBase.vue'
import EodiroDialog from '~/plugins/eodiro-dialog'
import { Grid, ArrowBlock } from '~/components/ui'

export default {
  name: 'home',
  components: { Grid, ArrowBlock },
  extends: EodiroPageBase,
  meta: {
    depth: 0,
    appName: 'home'
  },
  methods: {
    preparing () {
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

  .footer {
    text-align: center;
    margin-top: 5rem;

    .manifesto {
      color: $base-gray;
      font-size: 0.9rem;
    }
  }
}
</style>
