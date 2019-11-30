/**
 * Nuxt.js require-unauth middleware
 * Copyright (c) 2019 Jang Haemin MIT
 */

/**
 * @param {import('@nuxt/types').Context}
 */
export default function({ app, store, redirect }) {
  if (store.state.auth.isSignedIn) {
    redirect(app.localePath('index'))
  }
}
