import Vue from 'vue'
import VueI18n from 'vue-i18n'
import App from './App'
import Preparing from 'Components/Preparing'
import router from './router'
import 'SCSS/globalstyle'
import 'SCSS/spring.styl'
import 'SCSS/gradients-simple.scss'

Vue.use(VueI18n)

let userLang = navigator.language || navigator.userLanguage
userLang = userLang.slice(0, 2)

// for debugging
// userLang = 'ko'

const i18n = new VueI18n({
  locale: userLang,
  fallbackLocale: 'en'
})

router.beforeEach((to, from, next) => {
  let fallbackLocale = 'en'
  if (!to.meta || !to.meta.title) {
    console.warn('Router doesn\'t have a title')
  } else {
    let title = to.meta.title[userLang]
    if (!title) {
      title = to.meta.title[fallbackLocale]
    }
    document.title = title
  }
  
  next()
})

let isPreparing = false

if (isPreparing) {
  window.onload = function () {
    new Vue({
      i18n,
      el: "#app",
      router: router,
      template: '<Preparing />',
      components: { Preparing }
    })
  }
} else {
  window.onload = function () {
    new Vue({
      i18n,
      el: "#app",
      router: router,
      template: '<App />',
      components: { App }
    })
  }
}
