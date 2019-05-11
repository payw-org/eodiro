import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import(/* webpackChunkName: "eodiro-components" */ 'Components/Home.vue')
const EodiroApp = () => import(/* webpackChunkName: "eodiro-components" */ 'Components/EodiroApp.vue')
const SelectBuilding = () => import(/* webpackChunkName: "eodiro-components" */ 'Components/SelectBuilding.vue')
const SelectFloor = () => import(/* webpackChunkName: "eodiro-components" */ 'Components/SelectFloor.vue')
const Result = () => import(/* webpackChunkName: "eodiro-components" */ 'Components/Result.vue')
const NotFound = () => import(/* webpackChunkName: "eodiro-components" */ 'Components/NotFound.vue')
const University = () => import(/* webpackChunkName: "eodiro-components" */ 'Components/University.vue')

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      name: 'home',
      meta: {
        title: {
          'ko': '어디로',
          'en': 'eodiro',
          'zh': 'eodiro',
          'fr': 'eodiro'
        }
      }
    },
    {
      path: '/404',
      component: NotFound,
      name: '404',
      meta: {
        
      }
    },
    {
      path: '/developers',
      component: NotFound,
      name: 'developers'
    },
    {
      path: '/university',
      component: EodiroApp,
      children: [
        {
          path: '',
          component: University,
          name: 'university'
        }
      ]
    },
    {
      path: '/:universityVendor',
      component: EodiroApp,
      children: [
        {
          path: '',
          component: SelectBuilding,
          name: 'building'
        },
        {
          path: ':buildingID',
          component: SelectFloor,
          name: 'floor'
        },
        {
          path: ':buildingID/:floorID',
          component: Result,
          name: 'result'
        }
      ]
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})