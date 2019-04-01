import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: {
        template: '<div>Say hello</div>'
      }
    }
  ]
})