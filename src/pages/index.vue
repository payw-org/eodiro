<template>
  <div id="home">
    <div class="page-content-wrapper">
      <div class="page-content">
        <Grid class="menu-item-container">
          <!-- Sign In -->
          <ArrowBlock
            v-if="!$store.state.auth.isSignedIn"
            class="menu-item-wrapper beta"
            :link="localePath('sign-in').replace(/\/$/, '')"
            @click="showTopbar"
          >
            <template v-slot:icon>
              <span class="icon icon--signin" />
            </template>
            <template v-slot:content>
              <span class="content">{{ $t('auth.signIn') }}</span>
            </template>
          </ArrowBlock>

          <!-- My Page -->
          <ArrowBlock
            v-else
            class="menu-item-wrapper beta"
            :link="localePath('me').replace(/\/$/, '')"
            @click="showTopbar"
          >
            <template v-slot:icon>
              <span class="icon icon--me" />
            </template>
            <template v-slot:content>
              <span class="content">{{ $t('me.title') }}</span>
            </template>
          </ArrowBlock>

          <!-- Pepero Square -->
          <ArrowBlock
            class="menu-item-wrapper beta"
            :link="localePath('pepero-square').replace(/\/$/, '')"
          >
            <template v-slot:icon>
              <span class="icon icon--pepero-square" />
            </template>
            <template v-slot:content>
              <span class="content">{{ $t('home.menuSquare') }}</span>
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

          <!-- Vacant Classrooms -->
          <!-- <ArrowBlock
            class="menu-item-wrapper"
            :link="localePath('vacant').replace(/\/$/, '')"
          >
            <template v-slot:icon>
              <span class="icon icon--vacant" />
            </template>
            <template v-slot:content>
              <span class="content">{{ $t('home.menuVacant') }}</span>
            </template>
          </ArrowBlock> -->

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

          <!-- Preferences -->
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
        Copyright © 2020 PAYW |
        <NuxtLink :to="localePath('privacy')">
          {{ $t('privacy.title') }}
        </NuxtLink>
      </p>
      <a href="https://github.com/paywteam/eodiro/releases" target="_blank">
        <div class="version">
          {{ version }}
        </div>
      </a>
    </footer>
  </div>
</template>

<script>
import pageBase from '~/mixins/page-base'
import { Grid, ArrowBlock } from '~/components/ui'
import PackageJson from '~~/package.json'

export default {
  name: 'home',
  components: { Grid, ArrowBlock },
  mixins: [pageBase],
  computed: {
    version() {
      return 'v' + PackageJson.version.replace('-beta.', ' Beta ')
    },
  },
  methods: {
    preparing() {
      window.alert(this.$t('preparing'))
    },
  },
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/main';

#home {
  padding-bottom: 5rem !important;

  .page-content-wrapper {
    width: 100%;

    .page-content {
      .menu-item-container {
        .menu-item-wrapper {
          &.beta {
            .content {
              display: flex;
              align-items: center;
            }

            .content::before {
              content: '베타';
              display: inline-block;
              margin-right: s(3);
              @include bg-inverted;
              @include text-color-inverted;
              border-radius: r(2);
              padding: 0.3rem 0.4rem;
              line-height: lh(1);
              font-size: b(2);
              font-weight: fw(5);

              @include on-english {
                content: 'Beta';
              }
            }
          }

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
        background-image: url('~assets/images/home/home_menu_icon_class.svg');

        @include dark-mode {
          background-image: url('~assets/images/home/home_menu_icon_class_black.svg');
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
      font-size: b(2);
    }

    .version {
      font-size: b(1);
      display: inline-block;
      color: $c-step--4;
      @include elm-fill;
      padding: s(2);
      border-radius: r(2);
      margin-top: s(3);
      line-height: 1.1;
    }
  }
}
</style>
