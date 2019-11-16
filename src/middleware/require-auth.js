/**
 * Nuxt.js require-auth middleware
 * Copyright (c) 2019 Jang Haemin MIT
 */

/**
 * @param {import('@nuxt/types').Context}
 */
export default function({ app, store, redirect }) {
  if (!store.state.auth.isSignedIn) {
    console.error(app.i18n.t('global.requireAuth'))
    redirect(app.localePath('sign-in'))
  }
}
