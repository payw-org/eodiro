// import React from 'react'
// import ReactDOM from 'react-dom'
// import Root from './client/Root'
// import './scss/globalstyle'

// ReactDOM.render(<Root />, document.querySelector('#app'))


import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import router from './router'

new Vue({
  el: "#app",
  router: router,
  template: '<App/>',
  components: { App }
})