<template>
  <div id="home">
    <div class="page-content-wrapper">
      <div class="page-content">
        <Grid class="menu-item-container">
          <ArrowBlock
            v-if="!$store.state.auth.isSignedIn"
            class="menu-item-wrapper"
            :link="localePath('sign-in').replace(/\/$/, '')"
          >
            <template v-slot:icon>
              <span class="icon icon--signin" />
            </template>
            <template v-slot:content>
              <span class="content">로그인</span>
            </template>
          </ArrowBlock>

          <ArrowBlock
            v-else
            class="menu-item-wrapper"
            :link="localePath('me').replace(/\/$/, '')"
          >
            <template v-slot:icon>
              <span class="icon icon--me" />
            </template>
            <template v-slot:content>
              <span class="content">마이페이지</span>
            </template>
          </ArrowBlock>

          <!-- Pepero Square -->
          <ArrowBlock
            class="menu-item-wrapper"
            :link="localePath('pepero-square').replace(/\/$/, '')"
          >
            <template v-slot:icon>
              <span class="icon icon--pepero-square" />
            </template>
            <template v-slot:content>
              <span class="content">{{ $t('home.menuSquare') }}</span>
            </template>
          </ArrowBlock>

          <!-- Vacant Classrooms -->
          <ArrowBlock
            class="menu-item-wrapper"
            :link="localePath('vacant').replace(/\/$/, '')"
            @click="showTopbar"
          >
            <template v-slot:icon>
              <span class="icon icon--vacant" />
            </template>
            <template v-slot:content>
              <span class="content">{{ $t('home.menuVacant') }}</span>
            </template>
          </ArrowBlock>

          <!-- Cafeteria Menus -->
          <ArrowBlock
            class="menu-item-wrapper"
            :link="localePath('cafeteria-date').replace(/\/$/, '')"
            @click="showTopbar"
          >
            <template v-slot:icon>
              <span class="icon icon--cafeteria" />
            </template>
            <template v-slot:content>
              <span class="content">{{ $t('home.menuMeal') }}</span>
            </template>
          </ArrowBlock>

          <!-- Lectures -->
          <ArrowBlock
            class="menu-item-wrapper"
            :link="localePath('lectures').replace(/\/$/, '')"
            @click="showTopbar"
          >
            <template v-slot:icon>
              <span class="icon icon--lectures" />
            </template>
            <template v-slot:content>
              <span class="content">{{ $t('home.menuClass') }}</span>
            </template>
          </ArrowBlock>

          <!-- donation -->
          <!-- <ArrowBlock
            class="menu-item-wrapper"
            :link="localePath('donation').replace(/\/$/, '')"
          >
            <template v-slot:icon>
              <span class="icon icon--donation" />
            </template>
            <template v-slot:content>
              <span class="content">{{ $t('home.menuDonation') }}</span>
            </template>
          </ArrowBlock> -->

          <!-- Open Source -->
          <ArrowBlock
            class="menu-item-wrapper"
            :link="localePath('opensource')"
          >
            <template v-slot:icon>
              <span class="icon icon--donation" />
            </template>
            <template v-slot:content>
              <span class="content">{{ $t('home.menuOpenSource') }}</span>
            </template>
          </ArrowBlock>

          <!-- Inquiry -->
          <ArrowBlock
            class="menu-item-wrapper"
            :link="localePath('inquiry').replace(/\/$/, '')"
          >
            <template v-slot:icon>
              <span class="icon icon--inquiry" />
            </template>
            <template v-slot:content>
              <span class="content">{{ $t('home.menuInquiry') }}</span>
            </template>
          </ArrowBlock>

          <!-- preferences -->
          <ArrowBlock
            class="menu-item-wrapper"
            :link="localePath('preferences').replace(/\/$/, '')"
          >
            <template v-slot:icon>
              <span class="icon icon--preferences" />
            </template>
            <template v-slot:content>
              <span class="content">{{ $t('home.menuPreferences') }}</span>
            </template>
          </ArrowBlock>
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
import { Grid, ArrowBlock } from '~/components/ui'

export default {
  name: 'home',
  components: { Grid, ArrowBlock },
  mixins: [pageBase],
  methods: {
    preparing() {
      window.alert(this.$t('preparing'))
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/main';

#home {
  .page-content-wrapper {
    width: 100%;

    .page-content {
      .menu-item-container {
        .menu-item-wrapper {
          &.disabled {
            opacity: 0.4;
            filter: grayscale(0.8);
          }

          .content {
            font-size: 1.2rem;
            font-weight: 500;
          }
        }
      }

      .icon--signin {
        background-image: url('~assets/images/home/home-menu-icon-key.svg');

        @include dark-mode {
          background-image: url('~assets/images/home/home-menu-icon-key-black.svg');
        }
      }

      .icon--me {
        background-image: url('~assets/images/home/home-menu-icon-me.svg');

        @include dark-mode {
          background-image: url('~assets/images/home/home-menu-icon-me-black.svg');
        }
      }

      .icon--vacant {
        background-image: url('~assets/images/home/home_menu_icon_vacant.svg');

        @include dark-mode {
          background-image: url('~assets/images/home/home_menu_icon_vacant_black.svg');
        }
      }

      .icon--cafeteria {
        background-image: url('~assets/images/home/home_menu_icon_food.svg');

        @include dark-mode {
          background-image: url('~assets/images/home/home_menu_icon_food_black.svg');
        }
      }

      .icon--lectures {
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

      .icon--pepero-square {
        background-image: url('~assets/images/home/home-menu-icon-community-white.svg');

        @include dark-mode {
          background-image: url('~assets/images/home/home-menu-icon-community-black.svg');
        }
      }
    }
  }

  .footer {
    margin-top: 5rem;
    text-align: center;

    .manifesto {
      color: $base-gray;
      font-size: 0.9rem;
    }
  }
}
</style>
