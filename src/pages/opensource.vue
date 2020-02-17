<template>
  <div id="opensource">
    <div class="title-container">
      <div class="github-star-button">
        <a href="https://github.com/paywteam/eodiro">
          <img
            src="https://img.shields.io/github/stars/paywteam/eodiro?style=social"
          />
        </a>
      </div>
    </div>
    <p class="manifesto">
      {{ $t('opensource.manifesto') }}
    </p>

    <ClientOnly>
      <div class="contributors-section">
        <h2 class="header">
          Contributors
        </h2>
        <Grid proportion="extraSmall" class="contributors">
          <div
            v-for="person in contributors"
            :key="person.login"
            class="person"
          >
            <a class="link" :href="person.html_url" target="_blank" />
            <img :src="person.avatar_url" class="profile-photo" />
            <p class="bio">
              <span class="name">{{ person.login }}</span>
            </p>
          </div>
        </Grid>
      </div>
    </ClientOnly>
  </div>
</template>

<script>
import useAxios from '~/modules/use-axios'
import pageBase from '~/mixins/page-base'
import autoHead from '~/modules/auto-head'
import { Grid } from '~/components/ui'

export default {
  name: 'opensource',
  components: { Grid },
  mixins: [pageBase],
  data() {
    return {
      contributors: [],
    }
  },
  async mounted() {
    const [err, response] = await useAxios({
      url: 'https://api.github.com/repos/paywteam/eodiro/contributors',
      method: 'get',
    })

    if (!err) {
      this.contributors.push(...response.data)
    }
  },
  head() {
    return {
      title: this.$t('opensource.title'),
      meta: [...autoHead(this.$t('opensource.title'))],
      script: [
        {
          async: true,
          defer: true,
          src: 'https://buttons.github.io/buttons.js',
        },
      ],
    }
  },
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/main';

#opensource {
  .title-container {
    .github-star-button {
      margin: s(3) 0;
      a {
        display: flex;
      }
    }

    h1 {
      color: #b91dce;
    }
  }

  .manifesto {
    margin-top: s(2);
  }

  .contributors-section {
    .header {
      font-size: h(2);
      margin-top: s(8);
    }

    .contributors {
      margin-top: s(3);

      .person {
        position: relative;
        display: flex;
        flex-direction: column;

        .link {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .profile-photo {
          width: 100%;
          border-radius: r(3);
          box-shadow: 0 0.3rem 0.7rem rgba(#000, 0.2);
        }

        .bio {
          border-radius: r(3);
          text-align: center;
          margin-top: s(2);
          padding: s(1);
          // background: $base-white-blue;

          .name {
            font-size: b(1);
            font-weight: fw(4);
            display: block;
          }
        }
      }
    }
  }
}
</style>
