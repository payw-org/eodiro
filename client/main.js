import Vue from 'vue'
import VueI18n from 'vue-i18n'
import App from './App'
import router from './router'

Vue.use(VueI18n)

let userLang = navigator.language || navigator.userLanguage
userLang = userLang.slice(0, 2)

// for debuggin
userLang = 'fr'

const i18n = new VueI18n({
  locale: userLang,
  fallbackLocale: 'en'
})

new Vue({
  i18n,
  el: "#app",
  router: router,
  template: '<App />',
  components: { App }
})