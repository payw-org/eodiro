<template>
  <div id="home">
    <div class="page-content-wrapper">
      <div class="page-content">
        <Grid class="menu-item-container">
          <!-- vacant classrooms -->
          <NuxtLink :to="localePath('vacant').replace(/\/$/, '')">
            <ArrowBlock class="menu-item-wrapper">
              <template v-slot:icon>
                <span class="icon icon--vacant" />
              </template>
              <template v-slot:content>
                <span class="content">{{ $t('home.menuVacant') }}</span>
              </template>
            </ArrowBlock>
          </NuxtLink>

          <!-- meal -->
          <ArrowBlock class="menu-item-wrapper">
            <template v-slot:icon>
              <span class="icon icon--meal" />
            </template>
            <template v-slot:content>
              <span class="content">{{ $t('home.menuMeal') }}</span>
            </template>
          </ArrowBlock>

          <!-- search-class -->
          <NuxtLink :to="localePath('search-class').replace(/\/$/, '')">
            <ArrowBlock class="menu-item-wrapper">
              <template v-slot:icon>
                <span class="icon icon--search-class" />
              </template>
              <template v-slot:content>
                <span class="content">{{ $t('home.menuClass') }}</span>
              </template>
            </ArrowBlock>
          </NuxtLink>

          <!-- clubs -->
          <NuxtLink :to="localePath('clubs').replace(/\/$/, '')">
            <ArrowBlock class="menu-item-wrapper">
              <template v-slot:icon>
                <span class="icon icon--clubs" />
              </template>
              <template v-slot:content>
                <span class="content">{{ $t('home.menuClubs') }}</span>
              </template>
            </ArrowBlock>
          </NuxtLink>

          <!-- community -->
          <NuxtLink :to="localePath('community').replace(/\/$/, '')">
            <ArrowBlock class="menu-item-wrapper">
              <template v-slot:icon>
                <span class="icon icon--community" />
              </template>
              <template v-slot:content>
                <span class="content">{{ $t('home.menuCommunity') }}</span>
              </template>
            </ArrowBlock>
          </NuxtLink>

          <!-- inquiry -->
          <NuxtLink :to="localePath('inquiry').replace(/\/$/, '')">
            <ArrowBlock class="menu-item-wrapper">
              <template v-slot:icon>
                <span class="icon icon--inquiry" />
              </template>
              <template v-slot:content>
                <span class="content">{{ $t('home.menuInquiry') }}</span>
              </template>
            </ArrowBlock>
          </NuxtLink>

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
          <NuxtLink :to="localePath('preferences').replace(/\/$/, '')">
            <ArrowBlock class="menu-item-wrapper">
              <template v-slot:icon>
                <span class="icon icon--preferences" />
              </template>
              <template v-slot:content>
                <span class="content">{{ $t('home.menuPreferences') }}</span>
              </template>
            </ArrowBlock>
          </NuxtLink>
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
import pageBase from '~/mixins/page-base'
import EodiroDialog from '~/plugins/eodiro-dialog'
import { Grid, ArrowBlock } from '~/components/ui'

export default {
  name: 'home',
  components: { Grid, ArrowBlock },
  mixins: [pageBase],
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
        background-image: url('~assets/images/home/home_menu_icon_vacant.svg');

        @include dark-mode {
          background-image: url('~assets/images/home/home_menu_icon_vacant_black.svg');
        }
      }

      .icon--meal {
        background-image: url('~assets/images/home/home_menu_icon_food.svg');

        @include dark-mode {
          background-image: url('~assets/images/home/home_menu_icon_food_black.svg');
        }
      }

      .icon--search-class {
        background-image: url('~assets/images/home/home_menu_icon_search-class.svg');

        @include dark-mode {
          background-image: url('~assets/images/home/home_menu_icon_search-class_black.svg');
        }
      }

      .icon--inquiry {
        background-image: url('~assets/images/home/home_menu_icon_inquiry.svg');

        @include dark-mode {
          background-image: url('~assets/images/home/home_menu_icon_inquiry_black.svg');
        }
      }

      .icon--donation {
        background-image: url('~assets/images/home/home_menu_icon_donate.svg');

        @include dark-mode {
          background-image: url('~assets/images/home/home_menu_icon_donate_black.svg');
        }
      }

      .icon--preferences {
        background-image: url('~assets/images/home/home_menu_icon_preferences.svg');

        @include dark-mode {
          background-image: url('~assets/images/home/home_menu_icon_preferences_black.svg');
        }
      }

      .icon--clubs {
        background-image: url('~assets/images/home/home-menu-icon-club.svg');

        @include dark-mode {
          background-image: url('~assets/images/home/home-menu-icon-club-black.svg');
        }
      }

      .icon--community {
        background-image: url('~assets/images/home/home-menu-icon-community-white.svg');

        @include dark-mode {
          background-image: url('~assets/images/home/home-menu-icon-community-black.svg');
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
